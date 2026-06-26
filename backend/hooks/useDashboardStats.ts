import {getCandidate} from "../services/candidateService";
import { useState, useEffect } from "react";

export interface CandidateType {
  id: number;
  name: string;
  photoUrl: string | null;
  voteCount: number;
}

const useDashboardStats = () => {
  const [candidates, setCandidates] = useState<CandidateType[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const Total_Votes = 250;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCandidate();
        if (result) {
          setCandidates(result.data?.candidates);
        }
      } catch (error) {
        console.error("Gagal memuat data Statistik:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  const totalVotesCast = candidates.reduce(
    (sum, candidate) => sum + (candidate.voteCount || 0),
    0,
  );

  const remainingVotes = Total_Votes - totalVotesCast;

  return {
    candidates,
    totalvoters: Total_Votes,
    totalVotesCast,
    remainingVotes,
    isFetching,
  };
};

export {useDashboardStats};