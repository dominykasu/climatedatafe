import React, { useState, useEffect } from 'react';
import { getUserPreferences, createUserPreference } from '../../services/api';

interface UserPreference {
    // TODO check ids if they are necessary
    id?: number;
    preferred_region: string;
    preferred_metrics: string;
    time_range: string;
}

const UserPreferences: React.FC = () => {
    const [preferences, setPreferences] = useState<UserPreference[]>([]);
    const [newPreference, setNewPreference] = useState({
        preferred_region: '',
        preferred_metrics: '',
        time_range: '',
    });

    useEffect(() => {
        getUserPreferences().then((data) => setPreferences(data));
    }, []);

    const handleSubmit = () => {
        createUserPreference(newPreference).then(() => {
            setPreferences([...preferences, newPreference]);
            setNewPreference({ preferred_region: '', preferred_metrics: '', time_range: '' });
        });
    };

    return (
        <div className="section">
            <h2>User Preferences</h2>
            <ul>
                {preferences.map((pref) => (
                    <li key={pref.id}>{pref.preferred_region} - {pref.preferred_metrics} - {pref.time_range}</li>
                ))}
            </ul>
            <div className="form">
                <input
                    type="text"
                    placeholder="Preferred Region"
                    value={newPreference.preferred_region}
                    onChange={(e) => setNewPreference({ ...newPreference, preferred_region: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Preferred Metrics"
                    value={newPreference.preferred_metrics}
                    onChange={(e) => setNewPreference({ ...newPreference, preferred_metrics: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Time Range"
                    value={newPreference.time_range}
                    onChange={(e) => setNewPreference({ ...newPreference, time_range: e.target.value })}
                />
                <button onClick={handleSubmit}>Save Preferences</button>
            </div>
        </div>
    );
};

export default UserPreferences;