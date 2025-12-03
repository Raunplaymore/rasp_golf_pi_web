import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "danger";
  loadingText?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
};

export function Button({
  variant = "primary",
  isLoading = false,
  loadingText = "Loading...",
  fullWidth = true,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base = `${
    fullWidth ? "w-full" : "w-auto"
  } rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2`;

  const styles = {
    primary:
      "py-3 text-lg text-white shadow-lg shadow-blue-500/20 " +
      (rest.disabled || isLoading
        ? "bg-slate-400 cursor-not-allowed opacity-80"
        : "bg-blue-600 hover:bg-blue-700"),
    outline:
      "py-3 text-base border border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200",
    danger:
      "px-3 py-1 text-sm font-bold min-w-[64px] border border-red-500 rounded-full " +
      (rest.disabled || isLoading
        ? "bg-red-200 text-red-700 cursor-not-allowed"
        : "bg-red-50 text-red-700 hover:bg-red-100"),
  } as const;

  return (
    <button
      className={`${base} ${styles[variant]} ${className}`}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}
