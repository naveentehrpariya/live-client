import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/common/Header';
import Footer from './pages/common/Footer';
import Help from './pages/Help';
import Homepage from './pages/home/Homepage';
function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={"dfjhsfjs"} />
            <Route path="/help" element={<Help />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
