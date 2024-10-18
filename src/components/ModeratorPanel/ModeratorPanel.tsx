import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, updateUser } from '../../services/api';

const ModeratorPanel: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [editableUserId, setEditableUserId] = useState<number | null>(null);
    const [userInput, setUserInput] = useState({ username: '', email: '', password: '', role: [{name:''}]  });



    // @ts-ignore
    const role = JSON.parse(localStorage.getItem('user')).roles[0];



    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id: number) => {
        await deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
    };

    const handleEdit = (user: any) => {
        setEditableUserId(user.id);
        setUserInput({ username: user.username, email: user.email, password: '', role: [{name:user.role}] });
    };

    const handleSave = async () => {
        if (editableUserId !== null) {
            await updateUser(editableUserId, userInput);  // Send updated user data to the backend
            setUsers(users.map(user => (user.id === editableUserId ? { ...user, ...userInput } : user)));
            setEditableUserId(null);
        }
    };

    const handleCancel = () => {
        setEditableUserId(null);
    };

    return (
        <div>
            <h2>Moderator Panel</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                            {editableUserId === user.id ? (
                                <input
                                    type="text"
                                    value={userInput.username}
                                    onChange={(e) => setUserInput({ ...userInput, username: e.target.value })}
                                />
                            ) : (
                                user.username
                            )}
                        </td>
                        <td>
                            {editableUserId === user.id ? (
                                <input
                                    type="email"
                                    value={userInput.email}
                                    onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                                />
                            ) : (
                                user.email
                            )}
                        </td>
                        <td>
                            {editableUserId === user.id ? (
                                <input
                                    type="password"
                                    value={userInput.password}
                                    onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
                                />
                            ) : (
                                '********'
                            )}
                        </td>
                        <td>
                            {editableUserId === user.id ? (
                                <select
                                    value={userInput.role[0].name}
                                    onChange={(e) => setUserInput({ ...userInput, role: [{name: e.target.value}] })}
                                >
                                    <option value="ROLE_USER">User</option>
                                    <option value="ROLE_ADMIN">Admin</option>
                                    <option value="ROLE_MODERATOR">Moderator</option>
                                </select>
                            ) : (
                                user.role[0].name
                            )}
                        </td>
                        <td>
                            {editableUserId === user.id ? (
                                <>
                                    <button onClick={handleSave}>Save</button>
                                    <button onClick={handleCancel}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    {/* Conditionally render buttons based on userRole */}
                                    {role === 'ROLE_ADMIN' && (
                                        <>
                                            <button onClick={() => handleEdit(user)}>Edit</button>
                                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                                        </>
                                    )}
                                    {role === 'ROLE_MODERATOR' && (
                                        <>
                                            <span>No actions allowed</span>
                                        </>
                                    )}
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ModeratorPanel;