import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-2xl bg-white shadow-xl shadow-slate-200/80 p-5 md:p-6 ${className}`}>
      {children}
    </div>
  );
}
