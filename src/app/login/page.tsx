// app/login/page.tsx
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/ui/navbar';
import { LoginForm } from '@/components/auth/login-form';
import { getCurrentUser } from '@/lib/actions';

export default async function LoginPage() {
  // Redirect to dashboard if already logged in
  const user = await getCurrentUser();
  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        <LoginForm />
      </main>
    </div>
  );
}