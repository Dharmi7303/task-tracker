// app/dashboard/loading.tsx
import { Navbar } from '@/components/ui/navbar';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        <header className="mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mt-2"></div>
        </header>
        
        <div className="mb-6">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-6 w-36 bg-gray-200 rounded animate-pulse mb-6"></div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((col) => (
              <div key={col}>
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
                
                {[1, 2, 3].map((card) => (
                  <div 
                    key={card}
                    className="bg-gray-100 rounded-lg p-4 mb-4 animate-pulse"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="h-5 w-32 bg-gray-200 rounded"></div>
                      <div className="h-5 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-200 rounded mb-3"></div>
                    <div className="flex justify-end">
                      <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}