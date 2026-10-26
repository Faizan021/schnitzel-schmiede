'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KonfiguratorPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/speisekarte');
  }, [router]);

  return null;
}
