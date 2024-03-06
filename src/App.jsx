import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import Navbar from "./landingpage/Navbar";
import Login from "./landingpage/LoginForm";
import RegistrationForm from "./landingpage/RegistrationForm";
import ForgotPassword from "./landingpage/ForgotPassword";
import Utils from "./landingpage/Utils";
import UserDashboard from "./user/pages/UserDashboard";
import UserRoute from "./user/UserRoute";
import AllUsers from "./user/pages/AllUsers";
import { theme } from "./Theme";
import UserDocument from "./user/pages/UserDocument";
import Profile from "./user/pages/Profile";
import MainBlog from "./user/pages/MainBlog";
import MyDocuments from "./user/pages/MyDocuments";
import AllDocuments from "./user/pages/AllDocuments";
import ErrorPage from "./landingpage/ErrorPage";
import LoginTest from "./test/LoginTest";
 
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/util" element={<Utils />} />
          <Route path="/test" element={<LoginTest />} />

          {/* Add more routes here */}
          <Route path="/user" element={<UserRoute />}>
            <Route index path="blog" element={<MainBlog />} />
            <Route index path="login" element={<Login />} />
            <Route index path="all-users" element={<AllUsers />} />
            <Route index path="dashboard" element={<UserDashboard />} />
            <Route index path="my-documents" element={<MyDocuments />} />
            <Route index path="documents" element={<UserDocument />} />
            <Route index path="all-users-documents" element={<AllDocuments />}/>
            <Route index path="profile" element={<Profile />} />
          </Route>
          {/* Error Page Route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
