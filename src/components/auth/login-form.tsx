// components/auth/login-form.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/actions';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    try {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      
      const result = await loginUser({ email, password });
      
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else if (result?.success) {
        // Handle successful login on client-side
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form action={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          required
          placeholder="Enter your email"
        />
        
        <FormInput
          label="Password"
          name="password"
          type="password"
          required
          placeholder="Enter your password"
        />
        
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </Button>
      </form>
      
      <p className="mt-4 text-center text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}