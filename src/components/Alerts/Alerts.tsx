import React, { useState, useEffect } from 'react';
import { getAlerts } from '../../services/api';

interface Alert {
    id: number;
    metric: string;
    threshold: number;
    lastAlertedAt: string;
}

const Alerts: React.FC = () => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    useEffect(() => {
        getAlerts().then((data) => setAlerts(data));
    }, []);

    return (
        <div className="section">
            <h2>Alerts</h2>
            <ul>
                {alerts.map((alert) => (
                    <li key={alert.id}>
                        {alert.metric} exceeded threshold {alert.threshold} (last alerted: {alert.lastAlertedAt})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Alerts;