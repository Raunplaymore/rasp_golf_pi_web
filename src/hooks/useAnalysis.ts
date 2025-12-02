import { useEffect, useState } from "react";
import { Shot, ShotAnalysis } from "../types/shots";
import { fetchAnalysis, triggerAnalysis } from "../api/shots";

type UseAnalysisResult = {
  analysis: ShotAnalysis | null;
  isLoading: boolean;
  error: string | null;
};

export function useAnalysis(selected: Shot | null): UseAnalysisResult {
  const [analysis, setAnalysis] = useState<ShotAnalysis | null>(selected?.analysis ?? null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const load = async () => {
      if (!selected) {
        setAnalysis(null);
        return;
      }
      // 이미 분석 데이터가 있으면 사용
      if (selected.analysis) {
        setAnalysis(selected.analysis);
        return;
      }

      setIsLoading(true);
      setError(null);

      // 백그라운드 분석 트리거 (없어도 무시)
      await triggerAnalysis(selected.id);

      const poll = async (attempt = 0) => {
        try {
          const result = await fetchAnalysis(selected.id);
          if (cancelled) return;
          if (result) {
            setAnalysis(result);
            setIsLoading(false);
            return;
          }
          if (attempt < 10) {
            timer = window.setTimeout(() => poll(attempt + 1), 3000);
          } else {
            setIsLoading(false);
            setError("분석 결과를 가져오지 못했습니다.");
          }
        } catch (err) {
          if (cancelled) return;
          setIsLoading(false);
          setError("분석 결과를 가져오지 못했습니다.");
        }
      };

      poll();
    };

    load();

    return () => {
      cancelled = true;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [selected]);

  return { analysis, isLoading, error };
}
