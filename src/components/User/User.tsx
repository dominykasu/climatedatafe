import React, {useEffect, useState} from 'react';
import {createUser, getUsers} from "../../services/api";

interface User {
    // TODO check ids if they are necessary
    id?: number;
    username: string;
    email: string;
}
const User: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });

    useEffect(() => {

        getUsers().then((data) => {
            console.log(data)
            setUsers(data)
        });
    }, []);

    const handleSubmit = () => {
        createUser(newUser).then(() => {
            setUsers([...users, newUser]);
            setNewUser({ username: '', email: '', password: ''});
        });
    };
    return (
        <div className="section">
            <h2>User Management</h2>
            <ul>
                {users.map((user) => (
                    <div key={user.id}>
                    <li >{user.username} - {user.email}</li>
                    </div>
                ))}
            </ul>
            <div className="form">
                <input
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <button onClick={handleSubmit}>Create User</button>
            </div>
        </div>
    );
};

export default User;