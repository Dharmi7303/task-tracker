// app/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h1>
        
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>
            Try Again
          </Button>
          
          <Link href="/" passHref>
            <Button variant="secondary">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}