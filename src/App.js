import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Help from './pages/Help';
import Homepage from './pages/home/Homepage';
import LogIn from './pages/auth/LogIn';
import Signup from './pages/auth/Signup';
import { Toaster } from 'react-hot-toast';
import UserContextProvider from './context/AuthProvider';
import Home from './pages/dashboard/Home';
import CreateStreamForm from './pages/dashboard/stream/CreateStreamForm';
import SubscriptionConfirmation from './pages/common/SubscriptionConfirmation';
import UpgradePlan from './pages/dashboard/UpgradePlan';
import Refund from './static/Refund';
import Privacy from './static/Privacy';
import Support from './static/Support';
import Terms from './static/Terms';
import Media from './pages/dashboard/media/Media';

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
                    <Route path="/home" element={<Home />} />
                    <Route path="/upgrade/subscription" element={<UpgradePlan />} />
                    <Route path="/subscription/success/:id" element={<SubscriptionConfirmation />} />
                    <Route path="/subscription/cancel/:id" element={<SubscriptionConfirmation />} />
                    <Route path="/media" element={<Media />} />
                    <Route path="/privacy-policy" element={<Privacy />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/terms-of-service" element={<Terms />} />
                    <Route path="/cancellation-and-refund-policy" element={<Refund />} />

                    {/* Stream Routes */}
                    <Route path="/create-stream" element={<CreateStreamForm />} />
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
