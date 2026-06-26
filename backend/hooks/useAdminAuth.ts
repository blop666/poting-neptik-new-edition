
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdminAPI } from "@/backend/services/authService";

export const useAdminAuth = () => {
  const router = useRouter();

  const [loading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (formData: FormData) => {
    setIsLoading(true);
    setErrorMsg("");

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const result = await loginAdminAPI(username, password);

      if (result.success) {
        localStorage.setItem("admin_token", result.data.token);
        router.push("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const backendMessage = error.response.data?.message;

        switch (error.response.status) {
          case 400:
            setErrorMsg(backendMessage || "Username / password Wajib diisi");
            break;
          case 401:
            setErrorMsg(backendMessage || "Username / Password salah");
            break;
          case 429:
            setErrorMsg(
              backendMessage ||
                "Terlalu banyak request Login, coba lagi 15 menit",
            );
            break;
        }
      } else {
        setErrorMsg("Tidak dapat terhubung ke server, Periksa jaringan anda");
      }
    } finally {
        setIsLoading(false)
    }
  };

  return {
    loading,
    setIsLoading,
    errorMsg,
    setErrorMsg,
    handleLogin
  }
};


