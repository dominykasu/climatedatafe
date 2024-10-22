import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './LogIn.css';
import {logIn} from "../../services/api";

const LogIn: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await logIn({username, password});
            alert('Login successful!');
            navigate('/');
        } catch (error: any) {
            setErrorMessage(`${error.response.data.message}`);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
};

export default LogIn;