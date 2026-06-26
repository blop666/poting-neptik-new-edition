import axios from "axios";
import { apiAuth } from "./api";

export const generateTokenAPI = async (amount: number) => {
  const response = await apiAuth.post("/admin/tokens/generate", { amount });
  return response.data;
};

export const getTokenListAPI = async () => {
  const response = await apiAuth.get("/admin/tokens");

  return response.data;
};

export const deleteTokenAPI = async (id: number) => {
  const response = await apiAuth.delete(`/admin/tokens/${id}`);

  return response.data;
};
