import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./landingpage/Navbar";
import Login from "./landingpage/LoginForm";
import RegistrationForm from "./landingpage/RegistrationForm";
import ForgotPassword from "./landingpage/ForgotPassword";
import Utils from "./landingpage/Utils";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/util" element={<Utils />} />
          
          {/* Add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
