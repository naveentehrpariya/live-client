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
import Profile from './pages/dashboard/profile/Profile';
import YoutubeAuthVerify from './pages/auth/YoutubeAuthVerify';
import Admin from './admin/Subscriptions';
import Users from './admin/Users';
import AdminPlans from './admin/AdminPlans';
import AdminStreams from './admin/Streams';
import AdminDashboard from './admin/Dashboard';
import AddPricingPlan from './admin/pricing/AddpricingPlan';
import Subscriptions from './admin/Subscriptions';
import AdminMedia from './admin/AdminMedia';
import Mysubscription from './pages/dashboard/Mysubscription';
import ReadLogs from './admin/ReadLogs';
import AdminLogin from './admin/AdminLogin';
import Error404 from './404';
import Contact from './pages/Contact';
import VerifyEmail from './pages/auth/VerifyEmail';
import Verifying from './pages/auth/Verifying';
import EditStream from './pages/dashboard/stream/EditStream';

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
                    <Route path="/contact" element={<Contact /> } />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/upgrade/subscription" element={<UpgradePlan />} />
                    <Route path="/my-subscription" element={<Mysubscription />} />
                    <Route path="/subscription/success/:id" element={<SubscriptionConfirmation />} />
                    <Route path="/subscription/cancel/:id" element={<SubscriptionConfirmation />} />
                    <Route path="/media" element={<Media />} />
                    <Route path="/privacy-policy" element={<Privacy />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/terms-of-service" element={<Terms />} />
                    <Route path="/cancellation-and-refund-policy" element={<Refund />} />
                    <Route path="/oauth2callback" element={<YoutubeAuthVerify />} />
                    <Route path="/create-stream" element={<CreateStreamForm />} />
                    <Route path="/stream" element={<CreateStreamForm />} />
                    <Route path="/send-verification-email" element={<VerifyEmail />} />
                    <Route path="/verify-email/:token" element={<Verifying />} />
                    <Route path="/edit-stream/:streamId" element={<EditStream /> } />

                    {/* Stream Routes */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/admin/users/:type" element={<Users />} />
                    <Route path="/admin/streams/:type" element={<AdminStreams />} />
                    <Route path="/admin/pricing" element={<AdminPlans />} />
                    <Route path="/admin/pricing/add" element={<AddPricingPlan /> } />
                    <Route path="/admin/edit-plan/:id" element={<AddPricingPlan /> } />
                    <Route path="/admin/subscriptions/:type" element={<Subscriptions /> } />
                    <Route path="/admin/media/:type" element={<AdminMedia /> } />
                    <Route path="/admin/logs" element={<ReadLogs /> } />
                    <Route path="*" element={<Error404 />} />
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
