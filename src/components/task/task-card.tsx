// components/task/task-card.tsx
import Link from 'next/link';

interface TaskCardProps {
  id: string;
  title: string;
  description: string | null;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

export function TaskCard({ id, title, description, status }: TaskCardProps) {
  // Status badge styles
  const statusStyles = {
    TODO: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-200',
    DONE: 'bg-green-100 text-green-800 border-green-200',
  };

  // Status display text
  const statusText = {
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <span className={`px-2 py-1 text-xs rounded-full border ${statusStyles[status]}`}>
          {statusText[status]}
        </span>
      </div>
      
      {description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>
      )}
      
      <div className="mt-3 flex justify-end">
        <Link 
          href={`/task/${id}`}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          Edit Task
        </Link>
      </div>
    </div>
  );
}