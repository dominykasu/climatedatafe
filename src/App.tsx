import React from 'react';
import User from './components/User/User';
import UserPreferences from './components/UserPreferences/UserPreferences';
import DataSnapshots from './components/DataSnapshots/DataSnapshots';
import Alerts from './components/Alerts/Alerts';
import './styles.css';
import LogIn from "./pages/LoginPage/LogIn";

const App: React.FC = () => {
    return (
        <div className="container">
            <h1>Global Climate Data Dashboard1</h1>
            <LogIn />
            <User />
            <UserPreferences />
            <DataSnapshots />
            <Alerts />
        </div>
    );
};

export default App;