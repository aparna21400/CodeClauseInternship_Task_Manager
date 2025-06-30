import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import TaskItem from './components/TaskItem.jsx';
import TaskSection from './components/TaskSection.jsx';
import Form from './components/Form.jsx';
import Profile from './components/Profile.jsx';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [activeTab, setActiveTab] = useState('Task');

  const deleteTask = (idToDelete) => {
    setTasks(tasks.filter(task => task.id !== idToDelete));
  };

  const handleAddOrEditTask = (newTask) => {
    if (editTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTask.id ? { ...newTask, id: task.id } : task
        )
      );
      setEditTask(null);
    } else {
      setTasks((prevTasks) => [...prevTasks, { ...newTask, id: Date.now() }]);
    }
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    setEditTask(taskToEdit);
  };

  const handleCancel = () => {
    setEditTask(null);
  }

  const TaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }
  console.log('App page is working', App);
  return (
    <div className='flex'>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className='flex-1 p-6 bg-gray-50 min-h-screen'>
        <Header />
        <h1 className='text-2xl font-bold text-[#540B0E] mb-6'>Welcome to Task Manager</h1>

        {activeTab === 'Task' && (
          <>
            <Form
              onAddTask={handleAddOrEditTask}
              editTask={editTask}
              onCancelEdit={handleCancel}
            />
            <TaskSection
              tasks={tasks}
              onDelete={deleteTask}
              onEdit={handleEdit}
              onTaskComplete={TaskCompletion}
            />
          </>
        )}

        {activeTab === 'Dashboard' && (
          <div className='text-center py-12'>
            <h2 className='text-xl font-semibold text-[#540B0E]'>You have {tasks.length} task{tasks.length !== 1 ? 's' : ''} today..</h2>
          </div>
        )}

        {activeTab === 'Notification' && (
          <div className='text-center py-12'>
            <h2 className='text-xl font-semibold text-[#540B0E]'>Notifications</h2>
            <p className='text-gray-600 mt-2'>No new notifications</p>
          </div>
        )}

        {activeTab === 'Planning' && (
          <div className='text-center py-12'>
            <h2 className='text-xl font-semibold text-[#540B0E]'>Planning</h2>
            <p className='text-gray-600 mt-2'>Planning features coming soon...</p>
          </div>
        )}

        {activeTab === 'setting' && (
          <Profile />
        )}
      </main>
    </div>
  );
}

export default App;