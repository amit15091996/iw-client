import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./form.css"; // Import your CSS file if you have one
import Spinner from "./Spinner";

const ForgotPassword = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const verificationValue = "abc@email.com"; // Dummy verification value

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    // Simulating a delay for loading (you can replace this with an API call)
    setTimeout(() => {
      setIsLoading(false);

      // Check if the input value matches the verification value
      if (inputValue === verificationValue) {
        // Navigate to Util component when the value is correct
        navigate("/util");
      } else {
        setError(true);
      }
    }, 2000); // Change the delay time as needed
  };

  return (
    <div className="container">
      <div className="title">Forgot Password</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Phone-Number / Email</span>
              <input
                type="text"
                placeholder="Your phone-number / email"
                required
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </div>
          <div className="button">
            <input type="submit" value="Reset" />
          </div>
          {isLoading && <p><Spinner /></p>}
          {error && <p className="error-message">Incorrect value entered!</p>}
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

export default ForgotPassword;