"use client";

import { useEffect, useState, startTransition } from "react";
import { useRouter } from "next/navigation";

type LayputProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: LayputProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    startTransition(() => {
      setLoading(false);
    });
  }, [router]);
  return <>{loading ? <div>Loading...</div> : children}</>;
}
