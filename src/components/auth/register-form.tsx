// components/auth/register-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '@/lib/actions';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await registerUser(formData);
      
      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        setSuccess(result.success);
        setTimeout(() => {
          router.push('/login');
        }, 200);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}
      
      <form action={handleSubmit}>
        <FormInput
          label="Name"
          name="name"
          type="text"
          required
          placeholder="Enter your full name"
        />
        
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
          placeholder="Create a strong password"
          minLength={6}
        />
        
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </form>
      
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}