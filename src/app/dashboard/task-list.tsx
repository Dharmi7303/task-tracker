// app/dashboard/task-list.tsx
import { getUserTasks } from '@/lib/actions';
import { TaskCard } from '@/components/task/task-card';

// Define a TaskType interface
interface TaskType {
  id: string;
  title: string;
  description: string | null;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

export async function TaskList() {
  const tasks = await getUserTasks();
  
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        You don't have any tasks yet. Click "Add New Task" to get started.
      </div>
    );
  }
  
  // Group tasks by status
  const tasksByStatus = {
    TODO: tasks.filter((task: TaskType) => task.status === 'TODO'),
    IN_PROGRESS: tasks.filter((task: TaskType) => task.status === 'IN_PROGRESS'),
    DONE: tasks.filter((task: TaskType) => task.status === 'DONE'),
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div>
        <h3 className="font-medium text-gray-700 mb-3 pb-2 border-b">To Do</h3>
        <div className="space-y-4">
          {tasksByStatus.TODO.map((task: TaskType) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
            />
          ))}
          {tasksByStatus.TODO.length === 0 && (
            <p className="text-gray-500 text-sm">No tasks in this category</p>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-gray-700 mb-3 pb-2 border-b">In Progress</h3>
        <div className="space-y-4">
          {tasksByStatus.IN_PROGRESS.map((task: TaskType) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
            />
          ))}
          {tasksByStatus.IN_PROGRESS.length === 0 && (
            <p className="text-gray-500 text-sm">No tasks in this category</p>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-gray-700 mb-3 pb-2 border-b">Done</h3>
        <div className="space-y-4">
          {tasksByStatus.DONE.map((task: TaskType) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
            />
          ))}
          {tasksByStatus.DONE.length === 0 && (
            <p className="text-gray-500 text-sm">No tasks in this category</p>
          )}
        </div>
      </div>
    </div>
  );
}