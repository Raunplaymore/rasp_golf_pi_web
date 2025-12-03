import { client, API_BASE } from "./client";
import { Shot, ShotAnalysis } from "../types/shots";

type UploadRes = { ok: boolean; file: string; shot?: Shot };
type FilesDetailRes = { ok: boolean; files: { filename: string; shotId?: string; analysis?: ShotAnalysis }[] };

const withVideoUrl = (shot: Shot): Shot => ({
  ...shot,
  videoUrl: shot.videoUrl || `${API_BASE}/uploads/${encodeURIComponent(shot.filename)}`,
});

export const fetchShots = async (): Promise<Shot[]> => {
  // 1) 최신 백엔드: /api/shots
  try {
    const data = await client.get<Shot[]>("/api/shots");
    return data.map(withVideoUrl);
  } catch (err) {
    console.warn("fetchShots /api/shots failed, fallback to /api/files/detail", err);
  }

  // 2) fallback: /api/files/detail
  try {
    const detail = await client.get<FilesDetailRes>("/api/files/detail");
    const now = new Date().toISOString();
    return detail.files.map((f) =>
      withVideoUrl({
        id: f.shotId || f.filename,
        filename: f.filename,
        videoUrl: `${API_BASE}/uploads/${encodeURIComponent(f.filename)}`,
        sourceType: "upload",
        createdAt: now,
        analysis: f.analysis,
      })
    );
  } catch (err) {
    console.error("fetchShots fallback failed", err);
    return [];
  }
};

export const fetchShot = async (id: string): Promise<Shot> => {
  try {
    const shot = await client.get<Shot>(`/api/shots/${encodeURIComponent(id)}`);
    return withVideoUrl(shot);
  } catch {
    // 최소 정보로 반환 (파일명으로 접근)
    return withVideoUrl({
      id,
      filename: id,
      videoUrl: `${API_BASE}/uploads/${encodeURIComponent(id)}`,
      sourceType: "upload",
      createdAt: new Date().toISOString(),
    });
  }
};

export const createShot = async (file: File, sourceType: "upload" | "camera" = "upload") => {
  const fd = new FormData();
  fd.append("video", file);
  fd.append("sourceType", sourceType);
  const res = await client.post<UploadRes>("/api/upload?analyze=true", fd);
  if (res.shot) {
    return withVideoUrl(res.shot);
  }
  return withVideoUrl({
    id: res.file,
    filename: res.file,
    videoUrl: `${API_BASE}/uploads/${encodeURIComponent(res.file)}`,
    sourceType,
    createdAt: new Date().toISOString(),
  } as Shot);
};

export const fetchAnalysis = async (shotId: string): Promise<ShotAnalysis | null> => {
  try {
    const res = await client.get<{ analysis?: ShotAnalysis }>(
      `/api/shots/${encodeURIComponent(shotId)}/analysis`
    );
    return res.analysis ?? null;
  } catch (err) {
    console.warn("fetchAnalysis failed (ignored):", err);
    return null;
  }
};
