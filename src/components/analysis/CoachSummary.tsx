import { Card } from "../Card";

type CoachSummaryProps = {
  comments?: string[];
};

export function CoachSummary({ comments }: CoachSummaryProps) {
  const list = comments ?? [];
  return (
    <Card>
      <p className="text-sm text-slate-500 mb-2">코치 코멘트</p>
      {list.length === 0 ? (
        <p className="text-slate-500 text-sm">코멘트가 없습니다.</p>
      ) : (
        <ul className="list-disc list-inside space-y-1 text-sm text-slate-800">
          {list.map((c, idx) => (
            <li key={idx}>{c}</li>
          ))}
        </ul>
      )}
    </Card>
  );
}
