// components/ui/navbar.tsx
import Link from 'next/link';
import { getCurrentUser, logoutUser } from '@/lib/actions';

export async function Navbar() {
  const user = await getCurrentUser();
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Task Tracker
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700">Hello, {user.name}</span>
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
                Dashboard
              </Link>
              <form action={logoutUser}>
                <button type="submit" className="text-red-600 hover:text-red-800">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-blue-600 hover:text-blue-800">
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}