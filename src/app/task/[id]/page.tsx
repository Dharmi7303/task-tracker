// app/task/[id]/page.tsx
import { redirect, notFound } from 'next/navigation';
import { Navbar } from '@/components/ui/navbar';
import { EditTaskForm } from '@/components/task/edit-task-form';
import { getTask, getCurrentUser } from '@/lib/actions';

// Updated interface to match Next.js 15+ page props requirements
interface EditTaskPageProps {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function EditTaskPage({ params, searchParams }: EditTaskPageProps) {
  try {
    // Protected route
    const user = await getCurrentUser();
    if (!user) {
      redirect('/login');
    }

    // Get task
    const task = await getTask(params.id);
    
    // Check if task exists and belongs to user
    if (!task) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="container mx-auto px-6 py-8">
          <EditTaskForm task={task} />
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error in EditTaskPage:', error);
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-6 py-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-red-600">Something went wrong</h2>
            <p className="mt-2 text-gray-600">Unable to load task information. Please try again later.</p>
          </div>
        </main>
      </div>
    );
  }
}