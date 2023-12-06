import { Link } from "react-router-dom";
import "./register.css"; // Import your CSS file if you have one

const RegistrationForm = () => {
  const acc = "Already have an account?";
  return (
    <div className="container">
      <div className="title">Registration</div>
      <div className="content">
        <form action="#">
          <div className="user-details">
            <div className="input-box">
              <span className="details">Full Name</span>
              <input type="text" placeholder="Enter your name" required />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input type="text" placeholder="Enter your username" required />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input type="text" placeholder="Enter your email" required />
            </div>
            <div className="input-box">
              <span className="details">Phone Number</span>
              <input type="text" placeholder="Enter your number" required />
            </div>
            <div className="input-box">
              <span className="details">GST Number</span>
              <input
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Address</span>
              <input
                type="password"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>
          <div className="signup-link">
            {acc} <Link to="/login" style={{color:'blue'}}>Login</Link>
          </div>
          <div className="button">
            <input type="submit" value="Register" />
          </div>
          <div className="signup-link">
             <Link to="/" style={{color:'blue'}}>HOME</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
