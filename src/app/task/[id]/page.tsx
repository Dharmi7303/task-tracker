// app/task/[id]/page.tsx
import { redirect, notFound } from 'next/navigation';
import { Navbar } from '@/components/ui/navbar';
import { EditTaskForm } from '@/components/task/edit-task-form';
import { getTask, getCurrentUser } from '@/lib/actions';

export default async function EditTaskPage({
  params,
}: {
  params: { id: string };
}) {
  // Ensure the user is logged in
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  // Fetch the task by ID
  const task = await getTask(params.id);

  // Handle task not found
  if (!task) {
    notFound();
  }

  // Render the edit task page
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <EditTaskForm task={task} />
      </main>
    </div>
  );
}
