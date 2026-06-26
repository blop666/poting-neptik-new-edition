"use client";

import { useState, useEffect, useMemo } from "react";
import {
  generateTokenAPI,
  getTokenListAPI,
  deleteTokenAPI,
} from "../services/tokenService";
import { log } from "console";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export interface TokenItem {
  id: number;
  email: string;
  token: string;
  status: string;
}

export const useTokenManagement = () => {
  const [emailsFromCSV, setEmailsFromCSV] = useState<string[]>([]);
  const [tokensData, setTokensData] = useState<TokenItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    preview: string;
  } | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 👈 TAMBAHAN STATE UNTUK MODAL (Biar sinkron sama UI Parent)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmActionType, setConfirmActionType] = useState<"send" | "reset" | null>(null);

  const fetchExistToken = async () => {
    try {
      const res = await getTokenListAPI();
      if (res.success) {
        const mapped = res.data.tokens.map((item: any) => ({
          id: item.id,
          email: item.email || "",
          token: item.token,
          status: item.isUsed ? "Used" : "Not Sent",
        }));
        setTokensData(mapped);
      }
    } catch (error) {
      console.error("Gagal mengambil daftar token dari server", error);
      toast.error("Gagal mengambil daftar token dari server");
    }
  };

  useEffect(() => {
    fetchExistToken();
  }, []);

  const review = useMemo(
    () => ({
      totalEmail: emailsFromCSV.length,
      tokenGenerate: tokensData.length,
      emailSent: tokensData.filter((t) => t.status === "Sent").length,
      failed: tokensData.filter((t) => t.status === "FAILED").length,
    }),
    [emailsFromCSV, tokensData],
  );

  const filteredTokens = useMemo(() => {
    const query = search.toLowerCase();
    return tokensData.filter(
      (t) =>
        t.email.toLowerCase().includes(query) ||
        t.token.toLowerCase().includes(query),
    );
  }, [tokensData, search]);

  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(filteredTokens.length / ITEMS_PER_PAGE);
  const indexOfFirstItem = (currentPage - 1) * ITEMS_PER_PAGE;
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const currentItems = useMemo(
    () => filteredTokens.slice(indexOfFirstItem, indexOfLastItem),
    [filteredTokens, indexOfFirstItem, indexOfLastItem],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileInfo({ name: file.name, preview: "/logo-excel.png" });
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = text
        .split("\n")
        .map((line) => line.trim())
        .filter(
          (line) => line.includes("@") && !line.toLowerCase().includes("email"),
        );
      setEmailsFromCSV(parsed);
      toast.success(`Berhasil memuat ${parsed.length} email dari CSV`);
    };
    reader.readAsText(file);
  };

  const handleGenerateTokens = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailsFromCSV.length) return toast.warning("Upload CSV terlebih dahulu!");

    setIsLoading(true);
    try {
      const res = await generateTokenAPI(emailsFromCSV);
      if (res.success) {
        const backendTokens = res.data.tokens;
        setTokensData(
          emailsFromCSV.map((email, index) => ({
            id: backendTokens[index]?.id || index + 1,
            email,
            token: backendTokens[index]?.token || "FAILED",
            status: "Not Sent",
          })),
        );
        toast.success("Token Success Generate");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal.");
    } finally {
      setIsLoading(false);
    }
  };

  // 👈 SEKARANG CUMA UNTUK PEMANTAU & MEMBUKA MODAL (Nama Tetap Sama)
  const handleSendTokensToEmail = async () => {
    if (tokensData.length === 0) {
      toast.error("Belum ada data token yang di generate!");
      return;
    }
    setConfirmActionType("send");
    setIsConfirmModalOpen(true); // Buka modal
  };

  // 👈 SEKARANG CUMA UNTUK PEMANTAU & MEMBUKA MODAL (Nama Tetap Sama)
  const handleResetAll = async () => {
    if (tokensData.length === 0) return;
    setConfirmActionType("reset");
    setIsConfirmModalOpen(true); // Buka modal
  };

  // 👈 FUNGSI BARU: Ini yang mengeksekusi setelah tombol "Ya" di modal diklik
  const handleConfirmAction = async () => {
    setIsConfirmModalOpen(false); // Tutup modal dulu biar smooth

    // Jika tipenya 'send' (Kirim Email)
    if (confirmActionType === "send") {
      setIsLoading(true);
      const toastId = toast.loading("Sedang mengirim token ke email...");
      let successCount = 0;
      let failedCount = 0;

      for (const item of tokensData) {
        setTokensData((prev) =>
          prev.map((t) => (t.id === item.id ? { ...t, status: "Sending..." } : t))
        );

        const templateParams = {
          to_email: item.email,
          voting_token: item.token,
        };

        try {
          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            templateParams,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
          );
          successCount++;
          setTokensData((prev) =>
            prev.map((t) => (t.id === item.id ? { ...t, status: "Sent" } : t))
          );
        } catch (error) {
          failedCount++;
          setTokensData((prev) =>
            prev.map((t) => (t.id === item.id ? { ...t, status: "Failed" } : t))
          );
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      setIsLoading(false);
      toast.dismiss(toastId);
      toast.success(`Proses selesai! ${successCount} berhasil dikirim, ${failedCount} gagal.`);
    }

    // Jika tipenya 'reset' (Hapus Semua)
    if (confirmActionType === "reset") {
      setIsLoading(true);
      const toastId = toast.loading("Menghapus data token dari database...");
      try {
        const deletePromises = tokensData.map((item) => deleteTokenAPI(item.id));

        await Promise.all(deletePromises);

        setEmailsFromCSV([]);
        setTokensData([]);
        setFileInfo(null);
        setSearch("");
        setCurrentPage(1);

        toast.success("Berhasil reset! Semua token di database sudah dihapus.");
      } catch (error) {
        toast.error("Waduh, ada error pas ngehapus data di database.");
      } finally {
        setIsLoading(false);
        toast.dismiss(toastId);
      }
    }
  };

  return {
    isLoading,
    review,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    filteredTokens,
    currentItems,
    emailsFromCSV,
    tokensData,
    fileName: fileInfo?.name || null,
    imagePreview: fileInfo?.preview || null,
    handleFileChange,
    handleGenerateTokens,
    handleSendTokensToEmail,
    handleResetAll,
    // 👈 EXPORT STATE BARU INI KE PARENT UI
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    confirmActionType,
    handleConfirmAction,
  };
};