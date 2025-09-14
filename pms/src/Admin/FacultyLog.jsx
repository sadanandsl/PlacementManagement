import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function FacultyLog() {
    const [adminCredentials, setAdminCredentials] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminCredentials({ ...adminCredentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/admin/login', adminCredentials);
            alert('Login successful!');
        } catch (error) {
            console.error(error);
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" onChange={handleInputChange} required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" onChange={handleInputChange} required />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default FacultyLog