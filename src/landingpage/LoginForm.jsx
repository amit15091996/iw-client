import { Link } from "react-router-dom";
import "./form.css"; // Import your CSS file if you have one

const LoginForm = () => {
  const acc = "Don't have an account?";
  return (
    <div className="container">
      <div className="title">Login</div>
      <div className="content">
        <form action="#">
          <div className="user-details">
            <div className="input-box">
              <span className="details">Mobile Number</span>
              <input type="text" placeholder="Enter your mobile" required />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <div className="forgot-password">
            <Link to="/login" style={{color:'blue'}}>Forgot password?</Link>
          </div>
          <div className="button">
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">
            {acc} <Link to="/register" style={{color:'blue'}}>Register</Link>
          </div>
          <div className="signup-link">
             <Link to="/" style={{color:'blue'}}>HOME</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
