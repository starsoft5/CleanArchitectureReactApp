import React, { useState } from 'react';
import axios from 'axios';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const handButonClick = async () =>
    {

        try {
            const response = await axios.get(baseUrl + '/api/protected/data', {
                withCredentials: true // Necessary to send cookie
            });
            console.log(response.data);
        } catch (err) {
            console.error('Access denied', err);
        }         
    }

    const handleLogout = async () => {

        try {
            const response = await axios.post(
                baseUrl + '/api/auth/logout',
                {},
                { withCredentials: true }
            );
            console.log(response.data);
        } catch (err) {
            console.error('Access denied', err);
        }
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                baseUrl + '/api/auth/login',
                { email, password },
                { withCredentials: true }
            );

            setMessage(response.data.message);
        } catch (error) {
            setMessage('Login failed: ' + error);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h3 className="mb-3">Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email address</label>
                    <input type="email" className="form-control"
                        value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control"
                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-primary w-100">Login</button>

                {message && <div className="alert alert-info mt-3">{message}</div>}

                <br></br>

                <button type="button" className="btn btn-primary w-100" onClick={handButonClick}>test protected</button>

                <br></br>

                <button type="button" className="btn btn-primary w-100" onClick={handleLogout}>Logout</button>

            </form>
        </div>
    );
};

export default LoginForm;
