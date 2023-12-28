import { Link, useNavigate } from "react-router-dom";
import "./form.css"; // Import your CSS file if you have one
import { useState } from "react";
import { doLoginUser } from "../user/services/UserService";
import Spinner from "./Spinner";
import Swal from "sweetalert2"; // Import SweetAlert

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(
      "Inside Login Submit : -- Username :" +
        username +
        "  Password : " +
        password
    );
    try {
      const loginDet = await doLoginUser(username, password);
      console.log(loginDet);
      if (loginDet) {
        // Show success toast
        showSuccessToast();
        navigate("/user/dashboard");
      } else {
        // Show error toast
        showErrorToast();
      }
    } catch (error) {
      console.error("Login error:", error);
      // Show error toast if login fails due to an error
      showErrorToast();
    } finally {
      setLoading(false);
    }
  };

  const showSuccessToast = () => {
    Swal.fire({
      icon: "success",
      title: "Signed in successfully",
    });
  };

  const showErrorToast = () => {
    Swal.fire({
      icon: "error",
      title: "Login failed",
      text: "Please check your credentials and try again",
    });
  };

  const acc = "Don't have an account?";
  return (
    <div className="container">
      <div className="title">Login</div>
      <div className="content">
        <form onSubmit={handleLoginSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Mobile Number</span>
              <input
                type="number"
                placeholder="Enter your mobile"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="forgot-password">
            <Link to="/forgot" style={{ color: "blue" }}>
              Forgot password?
            </Link>
          </div>
          <div className="button">
            <Spinner show={loading} />
            <input
              type="submit"
              value="Login"
              disabled={loading ? true : false}
            />
          </div>
          <div className="signup-link">
            {acc}{" "}
            <Link to="/register" style={{ color: "blue" }}>
              Register
            </Link>
          </div>
          <div className="signup-link">
            <Link to="/" style={{ color: "blue" }}>
              HOME
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
