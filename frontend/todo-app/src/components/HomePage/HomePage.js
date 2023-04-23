import React from 'react';
import { useHistory } from 'react-router-dom';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './HomePage.css';

const HomePage = () => {
    const history = useHistory();

    const handleLogout = () => {
        // Clear the access token from local storage
        localStorage.removeItem('accessToken');

        // Redirect the user to the login page
        history.push('/login');
    };

    return (
        <div className="home-page">
            <header>
                <h1>Task Manager</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>
            <main>
                <TaskList />
                <TaskForm />
            </main>
        </div>
    );
};

export default HomePage;
