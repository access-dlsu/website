'use client';

import { useSearchParams } from 'next/navigation';
import { useNotification } from '@/components/notification';
import { useEffect } from 'react';

export function ErrorHandler() {
  const searchParams = useSearchParams();
  const { showNotification } = useNotification();

  useEffect(() => {
    const error = searchParams?.get('error');
    if (error) {
      showNotification(error, 'error');
    }
  }, [searchParams, showNotification]);

  return null;
}
