import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./Components/MainPage/MainPage";
import Profile from "./Components/Profile/ProfilePage";
import TradingPage from "./Components/TradingPage/TradingPage";
import AboutPage from "./Components/AboutPage/AboutPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/*" element={<MainPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/trade" element={<TradingPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;