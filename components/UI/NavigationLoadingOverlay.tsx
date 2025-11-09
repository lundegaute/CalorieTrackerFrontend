"use client";
import { useNavigationStore } from '@/components/Zustand/NavigationStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function NavigationLoadingOverlay() {
  const { isNavigating, navigationTarget, stopNavigation } = useNavigationStore();
  const pathname = usePathname();

  // Stop loading when route changes
  useEffect(() => {
    if (isNavigating) {
      stopNavigation();
    }
  }, [pathname, isNavigating, stopNavigation]);

  if (!isNavigating) return null;

  const getLoadingMessage = (target: string | null) => {
    switch (target) {
      case '/Meals':
        return 'Loading meals...';
      case '/':
        return 'Loading home...';
      case '/Aboutme':
        return 'Loading about page...';
      default:
        return 'Loading page...';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-4 border-emerald-400/30 border-t-emerald-400 animate-spin" />
        <p className="text-sm text-white">{getLoadingMessage(navigationTarget)}</p>
        <p className="text-xs text-slate-400">Please wait...</p>
      </div>
    </div>
  );
}