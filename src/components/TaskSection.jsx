import React, { useState } from 'react';
import TaskCard from './TaskItem';

const TaskSection = ({ tasks, onDelete, onEdit, onTaskComplete }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortBy, setSortBy] = useState('created');

    const getFilteredTasks = () => {
        let filtered = [...tasks];

        switch (activeFilter) {
            case 'completed':
                filtered = tasks.filter(task => task.completed);
                break;
            case 'pending':
                filtered = tasks.filter(task => !task.completed);
                break;
            case 'high':
                filtered = tasks.filter(task => task.priority.toLowerCase() === 'high');
                break;
            case 'medium':
                filtered = tasks.filter(task => task.priority.toLowerCase() === 'medium');
                break;
            case 'low':
                filtered = tasks.filter(task => task.priority.toLowerCase() === 'low');
                break;
            default:
                filtered = tasks;
        }

        switch (sortBy) {
            case 'priority':
                filtered.sort((a, b) => {
                    const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
                    return priorityOrder[b.priority.toLowerCase()] - priorityOrder[a.priority.toLowerCase()];
                });
                break;
            case 'title':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'status':
                filtered.sort((a, b) => {
                    if (a.completed === b.completed) return 0;
                    return a.completed ? 1 : -1;
                });
                break;
            default:
                break;
        }

        return filtered;
    };

    const filteredTasks = getFilteredTasks();

    const getTaskCounts = () => {
        return {
            all: tasks.length,
            completed: tasks.filter(task => task.completed).length,
            pending: tasks.filter(task => !task.completed).length,
            high: tasks.filter(task => task.priority.toLowerCase() === 'high').length,
            medium: tasks.filter(task => task.priority.toLowerCase() === 'medium').length,
            low: tasks.filter(task => task.priority.toLowerCase() === 'low').length,
        };
    };

    const taskCounts = getTaskCounts();

    return (
        <div className='mt-6'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-[#540B0E]'>
                    Your Tasks ({filteredTasks.length})
                </h2>

                <div className='flex items-center gap-2'>
                    <label className='text-sm text-[#540B0E] font-medium'>Sort by:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className='text-[#540B0E] border border-[#335C67] rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#335C67]'
                    >
                        <option value="created">Created</option>
                        <option value="title">Title</option>
                        <option value="priority">Priority</option>
                        <option value="status">Status</option>
                    </select>
                </div>
            </div>

            <div className='flex flex-wrap gap-2 mb-6'>
                <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === 'all'
                            ? 'bg-[#335C67] text-white'
                            : 'bg-gray-200 text-[#540B0E] hover:bg-gray-300'
                        }`}
                >
                    All ({taskCounts.all})
                </button>

                <button
                    onClick={() => setActiveFilter('pending')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === 'pending'
                            ? 'bg-[#E09F3E] text-white'
                            : 'bg-gray-200 text-[#540B0E] hover:bg-gray-300'
                        }`}
                >
                    Pending ({taskCounts.pending})
                </button>

                <button
                    onClick={() => setActiveFilter('completed')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === 'completed'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-[#540B0E] hover:bg-gray-300'
                        }`}
                >
                    Completed ({taskCounts.completed})
                </button>

                <div className='w-px h-6 bg-gray-300 self-center mx-2'></div>

                <button
                    onClick={() => setActiveFilter('high')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === 'high'
                            ? 'bg-[#9E2A2B] text-white'
                            : 'bg-gray-200 text-[#540B0E] hover:bg-gray-300'
                        }`}
                >
                    High ({taskCounts.high})
                </button>

                <button
                    onClick={() => setActiveFilter('medium')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === 'medium'
                            ? 'bg-[#E09F3E] text-white'
                            : 'bg-gray-200 text-[#540B0E] hover:bg-gray-300'
                        }`}
                >
                    Medium ({taskCounts.medium})
                </button>

                <button
                    onClick={() => setActiveFilter('low')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === 'low'
                            ? 'bg-[#335C67] text-white'
                            : 'bg-gray-200 text-[#540B0E] hover:bg-gray-300'
                        }`}
                >
                    Low ({taskCounts.low})
                </button>
            </div>

            <div className='space-y-4'>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={() => onDelete(task.id)}
                            onEdit={() => onEdit(task.id)}
                            onTaskComplete={onTaskComplete}
                        />
                    ))
                ) : (
                    <div className='text-center py-12 bg-gray-50 rounded-lg'>
                        <div className='text-gray-400 text-6xl mb-4'>📝</div>
                        <h3 className='text-lg font-medium text-gray-600 mb-2'>
                            {activeFilter === 'all' ? 'No tasks yet' : `No ${activeFilter} tasks`}
                        </h3>
                        <p className='text-gray-500 text-sm'>
                            {activeFilter === 'all'
                                ? 'Create your first task to get started!'
                                : `Try selecting a different filter or create a new task.`
                            }
                        </p>
                    </div>
                )}
            </div>

            {tasks.length > 0 && (
                <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
                    <h3 className='text-sm font-semibold text-[#540B0E] mb-2'>Task Summary</h3>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-sm'>
                        <div className='text-center'>
                            <div className='font-bold text-[#335C67]'>{taskCounts.completed}</div>
                            <div className='text-gray-600'>Completed</div>
                        </div>
                        <div className='text-center'>
                            <div className='font-bold text-[#E09F3E]'>{taskCounts.pending}</div>
                            <div className='text-gray-600'>Pending</div>
                        </div>
                        <div className='text-center'>
                            <div className='font-bold text-[#9E2A2B]'>{taskCounts.high}</div>
                            <div className='text-gray-600'>High Priority</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskSection;