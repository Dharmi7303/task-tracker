// app/page.tsx
import Link from 'next/link';
import { getCurrentUser } from '@/lib/actions';
import { Navbar } from '@/components/ui/navbar';

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Organize Your Tasks with Task Tracker
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link 
                href="/dashboard" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium text-lg transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  href="/register" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium text-lg transition-colors"
                >
                  Create an Account
                </Link>
                
                <Link 
                  href="/login" 
                  className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 px-6 py-3 rounded-md font-medium text-lg transition-colors"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}