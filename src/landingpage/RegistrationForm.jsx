// RegistrationForm.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { registerUser } from "../user/services/UserService";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    gstNo: "",
    address: "",
  });

  const { name, password, email, phone, gstNo, address } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registeredUser = await registerUser(formData);

      console.log("User registered:", registeredUser);

      if (registeredUser) {
        navigate("/login");
      } else {
        alert("Registration failed");
      }

      // Reset the form fields after successful registration
      setFormData({
        name: "",
        password: "",
        email: "",
        phone: "",
        gstNo: "",
        address: "",
      });

      // Redirect or perform other actions upon successful registration if needed
    } catch (error) {
      console.error("Registration error:", error.message);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  const acc = "Already have an account?";

  return (
    <div className="container">
      <div className="title">Registration</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Full Name</span>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Phone Number</span>
              <input
                type="text"
                placeholder="Enter your phone number"
                name="phone"
                value={phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">GST Number</span>
              <input
                type="text"
                placeholder="Enter your GST number"
                name="gstNo"
                value={gstNo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Address</span>
              <input
                type="text"
                placeholder="Enter your address"
                name="address"
                value={address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="button">
            <input type="submit" value="Register" />
          </div>
        </form>
        <div className="signup-link">
          {acc}{" "}
          <Link to="/login" style={{ color: "blue" }}>
            Login
          </Link>
        </div>
        <div className="signup-link">
          <Link to="/" style={{ color: "blue" }}>
            HOME
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
