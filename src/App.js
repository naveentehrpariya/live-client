import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Help from './pages/Help';
import Homepage from './pages/home/Homepage';
import LogIn from './pages/auth/LogIn';
import Signup from './pages/auth/Signup';
import AuthWrapper from './pages/dashboard/AuthWrapper';
import { Toaster } from 'react-hot-toast';
import UserContextProvider from './context/AuthProvider';

function App() {
  return (
    <UserContextProvider>
        <div className="App">
              <Router>
                <div className="routes">
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<AuthWrapper />} />
                  </Routes>
                </div>
              </Router>
              <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerClassName="toaster-container"
                containerStyle={{}}
                toastOptions={{
                  className: '',
                  duration: 5000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    theme: {
                      primary: 'green',
                      secondary: 'black',
                    },
                  },
                }}
              />
        </div>
    </UserContextProvider>
  );
}

export default App;
