import { api, apiAuth } from "./api";

export interface candidateType {
  id: number;
  name: string;
  photoUrl: string | null;
  program: string[];
  vision: string;
  mission: string;
  voteCount: number;
}

export interface candidateTypePost {
  name: string;
  photoUrl: string | null;
  program: string[];
  vision: string;
  mission: string;
}

const getCandidate = async () => {
  const result = await api.get("/candidates");
  return result.data;
};

const getCandidateById = async (id: number) => {
  const result = await api.get(`/candidates/${id}`);

  return result.data;
};

const createCandidate = async (data: candidateTypePost) => {
  const result = await apiAuth.post("/candidates", data);

  return result.data;
};

const updateCandidate = async (id: number, data: candidateTypePost) => {
  const result = await apiAuth.put(`/candidates/${id}`, data);

  return result.data;
};

const deleteCandidate = async (id: number) => {
  const result = await apiAuth.delete(`/candidates/${id}`);

  return result.data
};

export {
  getCandidate,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
};
