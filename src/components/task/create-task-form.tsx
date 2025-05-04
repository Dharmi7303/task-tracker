// components/task/create-task-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTask } from '@/lib/actions';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';

export function CreateTaskForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await createTask(formData);
      
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else if (result.success) {
        setMessage({ type: 'success', text: result.success });
        
        // Clear the form
        const form = document.getElementById('create-task-form') as HTMLFormElement;
        form.reset();
        
        // Show success message before refreshing
        setTimeout(() => {
          // Close the form
          setIsOpen(false);
          setMessage(null);
          
          // Refresh the task list to show the new task
          router.refresh();
        }, 1500); // Longer delay to show success message
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to create task' });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mb-6">
      {!isOpen ? (
        <Button onClick={() => setIsOpen(true)}>
          Add New Task
        </Button>
      ) : (
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Add New Task</h3>
            <Button 
              variant="secondary" 
              size="small" 
              onClick={() => {
                setIsOpen(false);
                setMessage(null);
              }}
            >
              Cancel
            </Button>
          </div>

          {message && (
            <div className={`mb-4 p-3 rounded ${
              message.type === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700' 
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {message.text}
              {message.type === 'success' && (
                <div className="text-sm mt-1">
                  Refreshing task list...
                </div>
              )}
            </div>
          )}

          <form id="create-task-form" action={handleSubmit}>
            <FormInput
              label="Title"
              name="title"
              type="text"
              required
              placeholder="Enter task title"
              disabled={isLoading}
            />
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter task description (optional)"
                disabled={isLoading}
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
                disabled={isLoading}
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Task...
                </span>
              ) : (
                'Create Task'
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}