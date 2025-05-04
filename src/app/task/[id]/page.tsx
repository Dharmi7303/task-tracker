// app/task/[id]/page.tsx
import { redirect, notFound } from 'next/navigation';
import { Navbar } from '@/components/ui/navbar';
import { EditTaskForm } from '@/components/task/edit-task-form';
import { getTask, getCurrentUser } from '@/lib/actions';

interface EditTaskPageProps {
  params: {
    id: string;
  };
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
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
}
