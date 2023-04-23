import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (taskName.trim() === '') {
      return;
    }

    try {
      const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
      const response = await axios.post(
        `${baseURL}/api/tasks`,
        { name: taskName },
        { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
      );

      // Invoke the callback function passed down from the parent component
      onAddTask(response.data.task);

      // Clear the input field
      setTaskName('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Add new task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="task-input"
      />
      <button type="submit" className="task-submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
