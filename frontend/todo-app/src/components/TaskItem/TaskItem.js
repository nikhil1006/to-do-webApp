import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';

const TaskItem = ({ task, fetchTasks }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(task.title);
    const [updatedDescription, setUpdatedDescription] = useState(task.description);

    const handleComplete = async () => {
        try {
            const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
            const response = await axios.patch(
                `${baseURL}/api/tasks/${task.id}/toggle`,
                {},
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                }
            );

            if (response.status === 200) {
                fetchTasks();
            }
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
            const response = await axios.delete(`${baseURL}/api/tasks/${task.id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });

            if (response.status === 200) {
                fetchTasks();
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = async () => {
        try {
            const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
            const response = await axios.put(
                `${baseURL}/api/tasks/${task.id}`,
                {
                    title: updatedTitle,
                    description: updatedDescription,
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                }
            );

            if (response.status === 200) {
                setIsEditing(false);
                fetchTasks();
            }
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                    <button onClick={handleEdit}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <input type="checkbox" checked={task.completed} onChange={handleComplete} />
                    <span>{task.title}</span>
                    <span>{task.description}</span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default TaskItem;
