import React, { useState, useEffect } from 'react';
import { getDataSnapshots } from '../../services/api';

interface DataSnapshot {
    id: number;
    region: string;
    metric: string;
    value: number;
    snapshotDate: string;
}

const DataSnapshots: React.FC = () => {
    const [snapshots, setSnapshots] = useState<DataSnapshot[]>([]);

    useEffect(() => {
        getDataSnapshots().then((data) => setSnapshots(data));
    }, []);

    return (
        <div className="section">
            <h2>Data Snapshots</h2>
            <ul>
                {snapshots.map((snapshot) => (
                    <li key={snapshot.id}>
                        {snapshot.region} - {snapshot.metric} - {snapshot.value} (on {snapshot.snapshotDate})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataSnapshots;