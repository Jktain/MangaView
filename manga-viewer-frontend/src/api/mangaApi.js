import axiosInstance from "./axiosInstance";

export const fetchAllManga = async () => {
  const res = await axiosInstance.get("/manga");
  return res.data;
};

export const addManga = async (data) => {
  const res = await axiosInstance.post("/manga", data);
  return res.data;
};
