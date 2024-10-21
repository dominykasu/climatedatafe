import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const getLocalStorageItem = localStorage.getItem('user');
    const localStorageUser = getLocalStorageItem !== null && JSON.parse(getLocalStorageItem);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">Climate Data</Link>
                {localStorageUser && (localStorageUser.roles.includes('ROLE_ADMIN') || localStorageUser.roles.includes('ROLE_MODERATOR')) && (
                    <Link to="/moderator">Moderator Panel</Link>
                )}
                {localStorageUser && <Link to="/saved-data">Saved Data</Link>}
            </div>
            <div className="navbar-right">
                {localStorageUser ? (
                    <>
                        <span>{localStorageUser.username}</span>
                        <button onClick={handleLogout}>Log Out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Log In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;