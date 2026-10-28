"use client";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export default function LoadingOverlay({ isLoading, message = "Loading..." }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className=" flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-4 border-emerald-400/30 border-t-emerald-400 animate-spin" aria-label="Loading" />
        <p className="text-sm text-slate-400">{message}</p>
      </div>
    </div>
  );
}