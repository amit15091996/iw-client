import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./landingpage/Navbar";
import Login from "./landingpage/LoginForm";
import RegistrationForm from "./landingpage/RegistrationForm";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
