import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {getCandidate} from "../services/candidateService";
import { VotingSubmit } from "../services/votingService";
import {toast, Toaster} from "sonner"

export interface CandidateType {
  id: number;
  name: string;
  photoUrl: string | null;
  vision: string;
  mission: string;
  program: string[];
  voteCount: number;
}

export const useVoting = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] =
    useState<CandidateType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [candidates, setCandidates] = useState<CandidateType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("voter_token");
    if (!savedToken) {
      router.push("/login");
      return;
    }
    setToken(savedToken);

    const fetchCandidates = async () => {
      try {
        const result = await getCandidate();
        if (result && result.success && result.data?.candidates) {
          setCandidates(result.data.candidates);
        }
      } catch (error) {
        console.error("Gagal memuat data kandidat:", error);
        toast.error("Error, cant get candidate data from server")

      } finally {
        setIsFetching(false);
      }
    };

    fetchCandidates();
  }, [router]);

  const handleVoteSubmit = async () => {
    if (!selectedCandidate || !token) return;
    setIsLoading(true);

    try {
      const result = await VotingSubmit(token, selectedCandidate?.id);

      if (result.success) {
        // alert(result.message);
        toast.success(result.message)
        sessionStorage.removeItem("voter_token");
        setSelectedCandidate(null);
        router.push("/voting/submit");
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Terjadi kesalahan sistem.";
      toast.error(`Cant send Vote: ${msg}`)
    } finally {
      setIsLoading(false);
    }
  };

  // Return semua variable dan fungsi yang dibutuhin sama UI komponen nanti
  return {
    candidates,
    isFetching,
    selectedCandidate,
    setSelectedCandidate,
    isLoading,
    handleVoteSubmit,
  };
};
