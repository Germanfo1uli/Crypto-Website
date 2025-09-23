import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./Components/MainPage/MainPage";
import Profile from "./Components/Profile/ProfilePage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/*" element={<MainPage />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;