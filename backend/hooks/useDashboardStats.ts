
import {getCandidate} from "../services/candidateService";
import { useState, useEffect } from "react";
import { getTokenListAPI } from "../services/tokenService";

export interface CandidateType {
  id: number;
  name: string;
  photoUrl: string | null;
  voteCount: number;
}

const useDashboardStats = () => {
  const [candidates, setCandidates] = useState<CandidateType[]>([]);
  const [unusedTokensCount, setUnusedTokensCount] = useState<number>(0); 
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        
        const [candidateResult, tokenResult] = await Promise.all([
          getCandidate(),
          getTokenListAPI(), 
        ]);

        if (candidateResult) {
          setCandidates(candidateResult.data?.candidates || []);
        }

        if (tokenResult && tokenResult.success) {
          // Karena API cuma mengembalikan yang belum terpakai, dapatkan jumlahnya di sini
          const unusedCount = tokenResult.data?.tokens?.length || 0; 
          setUnusedTokensCount(unusedCount);
        }
      } catch (error) {
        console.error("Gagal memuat data Statistik:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  // 1. Hitung total suara yang sudah dicoblos dari data kandidat
  const totalVotesCast = candidates.reduce(
    (sum, candidate) => sum + (candidate.voteCount || 0),
    0,
  );

  // 2. Sisa suara = mutlak dari jumlah token yang belum terpakai dari API
  const remainingVotes = unusedTokensCount;

  // 3. Total kuota pemilih dinamis = Suara masuk + Sisa token
  const totalVoters = totalVotesCast + unusedTokensCount;

  return {
    candidates,
    totalvoters: totalVoters, // 👈 Hasilnya tetep dinamis dan akurat
    totalVotesCast,
    remainingVotes,
    isFetching,
  };
};

export {useDashboardStats};