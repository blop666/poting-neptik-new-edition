import { candidateType, getCandidate } from "../services/candidateService";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createCandidate } from "../services/candidateService";
import { candidateTypePost } from "../services/candidateService";
import { uploadToCloudinary } from "../services/cloudinaryImage";
import { deleteCandidate, updateCandidate } from "../services/candidateService";
import { apiAuth } from "../services/api";
import { toast } from "sonner";
import axios from "axios";

export interface CandidateType {
  id: number;
  name: string;
  photoUrl: string | null;
  program: string[];
  vision: string;
  mission: string;
  voteCount: number;
}

const useGetCandidate = () => {
  const router = useRouter;
  const [candidates, setCandidates] = useState<CandidateType[]>([]);
  const [loading, isLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const result = await getCandidate();
        if (result && result.success && result.data?.candidates) {
          setCandidates(result.data.candidates);
        }
      } catch (error) {
        console.error("Gagal memuat data kandidat:", error);
        alert("Waduh, gagal mengambil daftar calon ketua dari server.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchCandidates();
  }, [router]);

  return {
    candidates,
    setCandidates,
    loading,
    isLoading,
    isFetching,
    setIsFetching,
  };
};

const useCreateCandidate = (onSuccess?: () => void) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (formData: FormData) => {
  setIsLoading(true);
  setIsError(false);
  setFieldErrors({});

  const toastId = toast.loading("Taking data from Form Input...");

  try {
    const name = formData.get("username") as string;
    const program = formData.get("program") as string;
    const vision = formData.get("vision") as string;
    const mission = formData.get("mission") as string;
    const imageFile = formData.get("photoUrl") as File;

    let uploadImageUrl: string | null | undefined = null;

    if (imageFile && imageFile.size > 0) {
      // Ubah teks toast secara dinamis saat proses Cloudinary dimulai
      toast.loading("Uploading Foto to Cloudinary...", { id: toastId });
      
      uploadImageUrl = await uploadToCloudinary(imageFile);

      if (!uploadImageUrl) {
        setFieldErrors({ global: "Gagal mengupload foto ke cloud storage." });
        
        // 2. JIKA CLOUDINARY GAGAL: Paksa toast berubah jadi error
        toast.error("Gagal mengupload foto kandidat.", { id: toastId });
        setIsLoading(false);
        return;
      }
    }

    const programArray = program
      ? program.split("\n").map((p) => p.trim()).filter((p) => p !== "")
      : [];

    const payload: candidateTypePost = {
      name,
      photoUrl: uploadImageUrl || null,
      program: programArray,
      vision,
      mission,
    };

    // Ubah teks toast lagi saat mulai menembak ke database backend
    toast.loading("Saving to Databases...", { id: toastId });

    const response = await createCandidate(payload);
    
    if (response.success) {
      toast.success("Candidate Succesfully Added!", { id: toastId });
      
      setTimeout(() => {
        if (onSuccess) onSuccess();
          router.push("/dashboard/data-page");
          router.refresh

      }, 800);
      
    } else {
      toast.error("UnSuccessfull Added Candidate to Database", { id: toastId });
    }
  } catch (error) {
    setIsError(true);
    console.error("❌ Eror fatal terdeteksi di dalam handleSubmit:", error);
    
    // 4. JIKA CRASH / SERVER MATI: Ubah toast jadi error global
    toast.error("❌ Terjadi kesalahan sistem. Sila hubungi tim teknis.", { id: toastId });
  } finally {
    setIsLoading(false);
  }
};

  return { handleSubmit, isLoading, isError, fieldErrors };
};

const useUpdateCandidate = (
  id: number,
  currentPhotoUrl: string | null,
  onSuccess?: () => void,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "your-cloud-name";
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "your-upload-preset";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      
      if (response.data && response.data.secure_url) {
        return response.data.secure_url;
      }
      return null;
    } catch (error) {
      console.error("Gagal upload ke Cloudinary:", error);
      return null;
    }
  };

  const handleUpdate = async (formData: FormData) => {
    setIsLoading(true);
    setFieldErrors({});

    const toastId = toast.loading("Processing candidate data...");

    try {
      const name = formData.get("name") as string;
      const vision = formData.get("vision") as string;
      const mission = formData.get("mission") as string;
      const programRaw = formData.get("program") as string;
      const imageFile = formData.get("photoUrl") as File;

      let finalPhotoUrl = currentPhotoUrl;

      if (imageFile && imageFile.size > 0) {
        toast.loading("Uploading new image to cloud storage...", { id: toastId });
        const uploadedUrl = await uploadToCloudinary(imageFile);
        
        if (uploadedUrl) {
          finalPhotoUrl = uploadedUrl;
        } else {
          setFieldErrors({
            global: "Failed to upload image to cloud storage.",
          });
          toast.error("Failed to upload image.", { id: toastId });
          setIsLoading(false);
          return;
        }
      }

      const program = programRaw
        ? programRaw
            .split("\n")
            .map((p) => p.trim())
            .filter((p) => p !== "")
        : [];

      const jsonPayload = {
        name,
        vision,
        mission,
        program,
        photoUrl: finalPhotoUrl,
      };

      toast.loading("Saving changes to database...", { id: toastId });

      const response = await updateCandidate(id, jsonPayload);

      if (response.success) {
        toast.success("Candidate updated successfully!", { id: toastId });
        setTimeout(() => {
          if (onSuccess) onSuccess();
          router.push("/dashboard/data-page");
          router.refresh
        }, 800);
      } else {
        toast.error("Failed to update candidate data.", { id: toastId });
      }
    } catch (error) {
      console.error("Error updating candidate:", error);
      setFieldErrors({ global: "Connection error to server." });
      toast.error("System error occurred.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleUpdate, isLoading, fieldErrors };
};

const useDeleteCandidate = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State untuk menyimpan data kandidat mana yang sedang diincar untuk dihapus
  const [targetCandidate, setTargetCandidate] = useState<{ id: number; name: string } | null>(null);
  
  const router = useRouter();

  // 1. TAHAP PERTAMA: Cuma buat mancing Modal keluar
  const triggerDelete = (id: number, candidateName: string) => {
    setTargetCandidate({ id, name: candidateName });
    setIsModalOpen(true);
  };

  // 2. TAHAP KEDUA: Eksekusi hapus asli (Dipanggil pas tombol 'Ya' di modal diklik)
  const executeDelete = async () => {
    if (!targetCandidate) return;

    setIsDeleting(true);
    // Pasang Sonner loading menggunakan nama kandidat yang dinamis
    const toastId = toast.loading(`⏳ Sedang menghapus kandidat "${targetCandidate.name}"...`);

    try {
      const response = await deleteCandidate(targetCandidate.id);

      if (!response.ok) {
        toast.error(response.message || "Gagal menghapus kandidat", { id: toastId });
        return;
      }

      // Jika sukses, ubah toast jadi sukses dan refresh list data
      toast.success(`🎉 Kandidat "${targetCandidate.name}" berhasil dilenyapkan!`, { id: toastId });
      router.refresh();
    } catch (error) {
      console.error("Error deleting candidate:", error);
      toast.error("❌ Terjadi kesalahan jaringan saat mencoba menghapus.", { id: toastId });
    } finally {
      setIsDeleting(false);
      setTargetCandidate(null); // Reset target kembali kosong
    }
  };

  return { 
    triggerDelete, 
    executeDelete, 
    isDeleting, 
    isModalOpen, 
    setIsModalOpen, 
    targetCandidate 
  };
};

export {
  useGetCandidate,
  useCreateCandidate,
  useUpdateCandidate,
  useDeleteCandidate,
};
