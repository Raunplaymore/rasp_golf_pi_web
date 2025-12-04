import { ChangeEvent, useRef } from "react";
import { Button } from "../Button";
import { Card } from "../Card";

type UploadCardProps = {
  isUploading: boolean;
  message: string;
  onUpload: (
    file: File,
    options?: {
      club?: string;
      fps?: number;
      roi?: string;
      cam_distance?: number;
      cam_height?: number;
      h_fov?: number;
      v_fov?: number;
      impact_frame?: number;
      track_frames?: number;
    }
  ) => void;
};

export function UploadCard({ isUploading, message, onUpload }: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const fpsRef = useRef<HTMLInputElement | null>(null);
  const roiRef = useRef<HTMLInputElement | null>(null);
  const camDistRef = useRef<HTMLInputElement | null>(null);
  const camHeightRef = useRef<HTMLInputElement | null>(null);
  const hFovRef = useRef<HTMLInputElement | null>(null);
  const vFovRef = useRef<HTMLInputElement | null>(null);
  const impactRef = useRef<HTMLInputElement | null>(null);
  const trackRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const club = selectRef.current?.value;
    const toNum = (v?: string | null) =>
      v && v.trim() !== "" && !Number.isNaN(Number(v)) ? Number(v) : undefined;
    onUpload(file, {
      club,
      fps: toNum(fpsRef.current?.value),
      roi: roiRef.current?.value?.trim() || undefined,
      cam_distance: toNum(camDistRef.current?.value),
      cam_height: toNum(camHeightRef.current?.value),
      h_fov: toNum(hFovRef.current?.value),
      v_fov: toNum(vFovRef.current?.value),
      impact_frame: toNum(impactRef.current?.value),
      track_frames: toNum(trackRef.current?.value),
    });
  };

  return (
    <>
      <Card className="grid gap-3">
        <label className="w-full flex flex-col gap-2 p-4 border border-dashed border-slate-300 rounded-xl bg-slate-50">
          <span className="text-sm text-slate-700">영상 파일을 선택하세요</span>
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            onChange={handleChange}
            className="text-base w-full"
          />
        </label>

        <div className="grid gap-2">
          <span className="text-sm text-slate-700">클럽 선택</span>
          <select
            ref={selectRef}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            defaultValue="driver"
          >
            <option value="driver">Driver</option>
            <option value="wood">Fairway Wood</option>
            <option value="hybrid">Hybrid</option>
            <option value="iron">Iron</option>
            <option value="wedge">Wedge</option>
            <option value="putter">Putter</option>
            <option value="unknown">기타/미지정</option>
          </select>
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          <label className="grid gap-1 text-sm text-slate-700">
            FPS (선택)
            <input
              ref={fpsRef}
              type="number"
              min={1}
              placeholder="예: 60"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </label>
          <label className="grid gap-1 text-sm text-slate-700">
            ROI [x,y,w,h] (JSON)
            <input
              ref={roiRef}
              type="text"
              placeholder='예: [100,200,400,400]'
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </label>
          <label className="grid gap-1 text-sm text-slate-700">
            카메라-볼 거리(m)
            <input
              ref={camDistRef}
              type="number"
              step="0.1"
              min={0}
              placeholder="예: 3.0"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </label>
          <label className="grid gap-1 text-sm text-slate-700">
            카메라 높이(m)
            <input
              ref={camHeightRef}
              type="number"
              step="0.1"
              min={0}
              placeholder="예: 1.2"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </label>
          <label className="grid gap-1 text-sm text-slate-700">
            수평 FOV(도)
            <input
              ref={hFovRef}
              type="number"
              step="0.1"
              min={0}
              placeholder="예: 60"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </label>
          <label className="grid gap-1 text-sm text-slate-700">
            수직 FOV(도)
            <input
              ref={vFovRef}
              type="number"
              step="0.1"
              min={0}
              placeholder="예: 34"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </label>
          <label className="grid gap-1 text-sm text-slate-700">
            임팩트 프레임 번호
            <input
              ref={impactRef}
              type="number"
              min={0}
              placeholder="예: 70"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </label>
          <label className="grid gap-1 text-sm text-slate-700">
            추적 프레임 수
            <input
              ref={trackRef}
              type="number"
              min={1}
              placeholder="기본 20"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </label>
        </div>
        <Button
          type="button"
          onClick={() => inputRef.current?.click()}
          isLoading={isUploading}
          loadingText="업로드 중..."
          disabled={isUploading}
        >
          업로드
        </Button>
      </Card>
      <Card>
        <p className="text-sm text-slate-500 mb-2">업로드 상태</p>
        <div className="min-h-[40px] p-3 rounded-lg bg-slate-50 text-slate-900 text-base">
          {message || "메시지가 여기에 표시됩니다."}
        </div>
      </Card>
    </>
  );
}
