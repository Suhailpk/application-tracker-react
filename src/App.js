import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import ForgotPasswordOtp from "./components/pages/ForgotPasswordOtp";
import ForgotPasswordOtpVerify from "./components/pages/ForgotPasswordOtpVerify";
import PasswordReset from "./components/pages/PasswordReset";
import Layout from "./components/pages/Layout";
import Home from "./components/pages/Home";
import CompanyIntro from "./components/pages/CompanyIntro";
import ProtectedRouter from "./components/pages/ProtectedRouter";
import ApplicationDetail from "./components/pages/ApplicationDetail";
import AddApplication from "./components/pages/AddApplication";
import EditApplication from "./components/pages/EditApplication";
import DeleteApplication from "./components/pages/DeleteApplication";
import Graph from "./components/pages/BasicPie";

function App() {
  const Logout = ()=>{
    localStorage.clear()
    return <Navigate to={'/login'}/>
  }
  return (
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp-request" element={<ForgotPasswordOtp />} />
        <Route path="/otp-verify" element={<ForgotPasswordOtpVerify />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/company_intro" element={<CompanyIntro />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRouter>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRouter>
          }
        />
        <Route
          path="/application_detail"
          element={
            <ProtectedRouter>
              <Layout>
                <ApplicationDetail />
              </Layout>
            </ProtectedRouter>
          }
        />
        <Route
          path="/add_application"
          element={
            <ProtectedRouter>
              <Layout>
                <AddApplication />
              </Layout>
            </ProtectedRouter>
          }
        />
        <Route
          path="/application_detail/edit/:id" 
          element={
            <ProtectedRouter>
              <Layout>
                <EditApplication />
              </Layout>
            </ProtectedRouter>
          }
        />
        <Route
          path="/application_detail/delete/:id"
          element={
            <ProtectedRouter>
              <Layout>
                <DeleteApplication />
              </Layout>
            </ProtectedRouter>
          }
        />
        <Route
          path="/graph"
          element={
            <ProtectedRouter>
              <Layout>
                <Graph />
              </Layout>
            </ProtectedRouter>
          }
        />
      </Routes>
  );
}

export default App;
