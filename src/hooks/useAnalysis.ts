import { useEffect, useState } from "react";
import { Shot, ShotAnalysis } from "../types/shots";
import { fetchAnalysis } from "../api/shots";

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

      const result = await fetchAnalysis(selected.id);
      if (cancelled) return;
      setAnalysis(result ?? null);
      setIsLoading(false);
      if (!result) {
        setError("분석 결과가 없습니다.");
      }
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
