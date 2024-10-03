// frontend/src/pages/Dashboard.jsx
import React from 'react';
import TaskForm from '../components/Tasks/TaskForm';
import TaskList from '../components/Tasks/TaskList';

const Dashboard = () => {
    return (
        <div className="max-w-2xl mx-auto mt-10">
            <TaskForm />
            <TaskList />
        </div>
    );
};

export default Dashboard;
