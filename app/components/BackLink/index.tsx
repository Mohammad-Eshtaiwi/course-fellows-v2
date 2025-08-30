"use client";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter, usePathname } from "next/navigation";
import styles from "./styles.module.scss";

interface BackLinkProps {
  className?: string;
}

export default function BackLink({ className = "" }: BackLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    // Split the path into segments and remove the last one
    const segments = pathname.split('/').filter(Boolean);
    segments.pop();
    
    // Construct the parent path
    const parentPath = segments.length ? `/${segments.join('/')}` : '/';
    
    router.push(parentPath);
  };

  return (
    <button
      onClick={handleBack}
      className={`${styles.backLink} ${className}`}
      aria-label="Go back"
    >
      <IoIosArrowBack size={32} />
    </button>
  );
}
