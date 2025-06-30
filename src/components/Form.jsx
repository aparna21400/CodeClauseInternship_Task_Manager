import React, { useState, useEffect } from 'react'

const Form = ({ onAddTask, editTask, onCancelEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [priority, setPriority] = useState('Low');

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setStatus('Pending');
        setPriority('Low');
    };

    useEffect(() => {
        if (editTask) {
            setTitle(editTask.title);
            setDescription(editTask.description);
            setPriority(editTask.priority);
            setStatus(editTask.status);
        } else {
            clearForm();
        }
    }, [editTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Edge Case
        if (!title.trim() || !description.trim()) {
            alert("Please fill in necessary section !");
            return;
        }
        const newTask = {
            id: editTask ? editTask.id : Date.now(),
            title,
            description,
            status,
            priority,
            completed: editTask ? editTask.completed : false
        }
        onAddTask(newTask);
        clearForm();
    };

    const handleCancel = () => {

        if (onCancelEdit) {
            onCancelEdit();
        }
        clearForm();
    };


    return (
        <form onSubmit={handleSubmit} className='bg-white p-4 rounded shadow mb-6 flex flex-col gap-4'>
            <h3 className='text-lg font-semibold text-[#540B0E]'>
                {editTask ? 'Update Task' : 'Create New Task'}
            </h3>

            <input
                type="text"
                placeholder='Task Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='text-[#540B0E] placeholder-[#335C67] border p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#335C67]'
            />

            <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='text-[#540B0E] placeholder-[#335C67] border p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#335C67]'
            />

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className='text-[#540B0E] placeholder-[#335C67] border p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#335C67]'
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <div className='flex gap-2'>
                <button
                    type='submit'
                    className='bg-[#335C67] text-white px-4 py-2 rounded hover:bg-[#264950] transition-all flex-1'
                >
                    {editTask ? 'Update Task' : 'Add Task'}
                </button>

                {editTask && (
                    <button
                        type='button'
                        onClick={handleCancel}
                        className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all'
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default Form;