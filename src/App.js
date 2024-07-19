
import './styles/tailwind.style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-big-calendar/lib/css/react-big-calendar.css"
import 'react-datepicker/dist/react-datepicker.css';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import Verify from './pages/Verify';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout-components/Layout';
import Home from './pages/Home';
import Compose from './pages/Compose';
import SocialLinks from './pages/SocialLinks';
import PrivateRoute from './utills/PrivateRoutes';
import Accounts from './pages/Accounts';
import Role from './pages/Role';
import MediaLibrary from './pages/mediaLibrary';
import ScheduleCalender from './pages/ScheduleCalender';

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/cal" element={<MyCalender />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route path="/socialLinks" element={<SocialLinks />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path='/role' element={<Role />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <PrivateRoute>
              <Layout>
                <ScheduleCalender />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/compose"
          element={
            <PrivateRoute>
              <Layout>
                <Compose />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path='/mediaLibrary'
          element={
            <PrivateRoute>
              <Layout>
                <MediaLibrary />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
