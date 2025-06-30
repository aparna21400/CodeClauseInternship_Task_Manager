import React from 'react';

const TaskCard = ({ task, onDelete, onEdit, onTaskComplete }) => {
  const { id, title, description, status, priority, completed } = task;

  const getPriorityColor = () => {
    if (priority.toLowerCase() === 'high') return 'text-[#9E2A2B]';
    if (priority.toLowerCase() === 'medium') return 'text-[#E09F3E]';
    return 'text-[#335C67]';
  };

  const getStatusBadge = () => {
    if (completed) {
      return 'bg-green-100 text-green-700';
    }
    return status.toLowerCase() === 'completed'
      ? 'bg-green-100 text-green-700'
      : 'bg-yellow-400 text-yellow-800';
  };

  const getStatusText = () => {
    if (completed) return 'Completed';
    return status;
  };

  return (
    <div className='bg-white p-4 rounded shadow mb-4 flex flex-col gap-2'>

      {/* TITLE & STATUS */}
      <div className='flex justify-between items-center'>
        <h3
          className={`text-lg font-semibold ${completed ? 'line-through text-gray-500' : 'text-[#540B0E]'}`}
        >
          {title}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge()}`}>{getStatusText()}
        </span>
      </div>

      {/* DESCRIPTION */}
      <p
        className={`text-sm ${completed ? 'text-gray-400 italic' : 'text-[#540B0E]'
          }`}
      >
        {description}
      </p>

      {/* PRIORITY */}
      <div className='flex justify-between items-center'>
        <span className={`text-xs font-medium ${getPriorityColor()}`}>
          {priority} priority
        </span>

        {/* EDIT BUTTON */}
        <div className='space-x-2'>
          <button
            onClick={onEdit}
            className='text-sm px-3 py-1 bg-[#E09F3E] text-white rounded hover:bg-[#C8873A]'
          >
            Edit
          </button>

          {/* DONE BUTTON */}
          <button onClick={() => onTaskComplete(id)} className='text-sm px-3 py-1 bg-[#335C67] text-white rounded hover:bg-[#264950]'
          >
            {completed ? 'Undo' : 'Done'}
          </button>
          
          {/* DELETE BUTTON */}
          <button
            onClick={onDelete}
            className='text-sm px-3 py-1 bg-[#9E2A2B] text-white rounded hover:bg-[#791D1F]'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
