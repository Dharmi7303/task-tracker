// components/task/edit-task-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateTask, deleteTask } from '@/lib/actions';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

interface EditTaskFormProps {
  task: Task;
}

export function EditTaskForm({ task }: EditTaskFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setMessage(null);
  
    try {
      const result = await updateTask(task.id, formData);
      
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else if (result.success) {
        // Add a brief success message before redirecting
        setMessage({ type: 'success', text: result.success });
        
        // Short delay before redirect to show the success message
        setTimeout(() => {
          router.push('/dashboard');
        }, 100);
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update task' });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteTask(task.id);
      
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else if (result.success) {
        router.push('/dashboard');
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete task' });
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${
          message.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form action={handleSubmit}>
        <FormInput
          label="Title"
          name="title"
          type="text"
          required
          defaultValue={task.title}
          placeholder="Enter task title"
        />
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter task description (optional)"
            defaultValue={task.description || ''}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue={task.status}
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button
            type="submit"
            className="sm:flex-1"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
          
          <Button
            type="button"
            variant="secondary"
            className="sm:flex-1"
            onClick={() => router.push('/dashboard')}
          >
            Cancel
          </Button>
          
          <Button
            type="button"
            variant="danger"
            className="sm:flex-1"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Task'}
          </Button>
        </div>
      </form>
    </div>
  );
}