import { client } from "./client";
import { Shot } from "../types/shots";

export const fetchShots = () => client.get<Shot[]>("/api/shots");

export const fetchShot = (id: string) => client.get<Shot>(`/api/shots/${id}`);

export const createShot = (file: File, sourceType: "upload" | "camera" = "upload") => {
  const fd = new FormData();
  fd.append("video", file);
  fd.append("sourceType", sourceType);
  return client.post<Shot>("/api/shots", fd);
};
