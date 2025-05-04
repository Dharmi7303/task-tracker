// app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/ui/navbar';
import { CreateTaskForm } from '@/components/task/create-task-form';
import { getCurrentUser, getUserTasks } from '@/lib/actions';
import { Suspense } from 'react';
import { TaskList } from './task-list';

export default async function DashboardPage() {
    // Protected route
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user.name || 'User'}
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and organize your tasks
          </p>
        </header>
        
        <CreateTaskForm />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          
          <Suspense fallback={<div className="text-center py-8">Loading tasks...</div>}>
            <TaskList />
          </Suspense>
        </div>
      </main>
    </div>
  );
}