import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { deleteSavedData, fetchSavedData } from "../../services/api";

interface SnapshotValue {
    date: string;
    temperature: number;
}

interface User {
    id: number;
    username: string;
    email: string;
}

interface Snapshot {
    id: number;
    user: User;
    region: string;
    metric: string;
    snapshotDate: string;
    values: SnapshotValue[] | null;
}

const SavedData = () => {
    const [savedData, setSavedData] = useState<Snapshot[]>([]); // Use the Snapshot type

    useEffect(() => {
        const fetchData = async () => {
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            const username = storedUser.username;

            const data = await fetchSavedData(username);
            setSavedData(data);
        };
        fetchData();
    }, []);

    const handleDelete = (id: number) => {
        deleteSavedData(id);
        setSavedData(savedData.filter((item) => item.id !== id));
    };

    return (
        <div>
            <h1>Saved Weather Data</h1>
            {savedData.length === 0 ? (
                <p>No saved data yet.</p>
            ) : (
                savedData.map((snapshot) => (
                    <div key={snapshot.id} style={{ marginBottom: '50px' }}>
                        <h2>{snapshot.region} - {snapshot.snapshotDate}</h2>
                        <ResponsiveContainer width="90%" height={250}>
                            <LineChart data={snapshot.values || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                        <button onClick={() => handleDelete(snapshot.id)}>Delete Data for {snapshot.region}</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default SavedData;
