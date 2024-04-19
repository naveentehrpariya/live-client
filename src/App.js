import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/common/Header';
import Footer from './pages/common/Footer';
import Help from './pages/Help';
import Homepage from './pages/home/Homepage';
import LogIn from './pages/login/LogIn';
import Signup from './pages/signup/Signup';
function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
