import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home/Home";
import LogIn from "./pages/LoginPage/LogIn";
import SignUp from "./components/SignUp/SignUp";
import Navbar from "./components/NavBar/Navbar";
import ModeratorPanel from "./components/ModeratorPanel/ModeratorPanel";
import SavedData from "./components/SavedData/SavedData";
const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/moderator" element={<ModeratorPanel />} />
                    <Route path="/saved-data" element={<SavedData />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

