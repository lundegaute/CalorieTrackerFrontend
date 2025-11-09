"use client";
import Link from 'next/link';
import { useNavigationStore } from '@/components/Zustand/NavigationStore';
import { usePathname } from 'next/navigation';

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function LoadingLink({ href, children, className, onClick }: LoadingLinkProps) {
  const { startNavigation } = useNavigationStore();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    // Don't show loading if already on the target page
    if (pathname === href) {
      return;
    }

    // Trigger loading state immediately
    startNavigation(href);
    
    // Call any additional onClick handler
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}