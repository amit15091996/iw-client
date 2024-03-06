import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../user/services/UserService";
import Swal from "sweetalert2";
import Loader from "../user/pages/Loader";

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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const registeredUser = await registerUser(formData);

      console.log("User registered:", registeredUser);

      if (registeredUser) {
        showSuccessToast();
        navigate("/login");
        setFormData({
          name: "",
          password: "",
          email: "",
          phone: "",
          gstNo: "",
          address: "",
        });
      } else {
        showErrorToast("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      showErrorToast("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const showSuccessToast = () => {
    Swal.fire({
      icon: "success",
      title: "Registered successfully",
      text: "Please login to continue",
    });
  };

  const showErrorToast = (errorMessage) => {
    Swal.fire({
      icon: "error",
      title: "Registration failed",
      text: errorMessage,
    });
  };
  const svgStyle = {
    marginTop: "-3rem",
    maxWidth: "100%",
    height: "100%",
  };
  const acc = "Already have an account?";
  const isMobile = window.innerWidth <= 600;
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
      component="main"
      maxWidth="lg"
    >
      <Grid container spacing={3}>
        {/* Left side (SVG) - Visible on desktop, hidden on mobile */}
        {!isMobile && (
          <Grid item xs={12} md={6}>
            <img src="/assets/Register.png" alt="SVG Icon" style={svgStyle} />
          </Grid>
        )}

        {/* Right side (Registration Form) */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            style={{
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#f8edeb",
              maxWidth: "600px",
            }}
          >
            <Typography variant="h5" gutterBottom style={{ color: "#003E70" }}>
              Register with Intallysh Wisdom
            </Typography>
            <form
              style={{
                width: "100%",
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
              onSubmit={handleSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                value={phone}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="gstNo"
                label="GST Number"
                name="gstNo"
                autoComplete="gstNo"
                value={gstNo}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                value={address}
                onChange={handleInputChange}
              />
              <div
                style={{
                  gridColumn: isMobile ? "1 / -1" : "auto",
                  textAlign: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: "1rem",
                    width: isMobile ? "60%" : "207%", // Adjusted width for mobile and desktop
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </form>
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <span>{acc}</span>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "blue" }}
              >
                Login
              </Link>
            </div>
            <div style={{ textAlign: "right", marginTop: "1rem" }}>
              <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
                HOME
              </Link>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Loader open={loading} />
    </Container>
  );
};

export default RegistrationForm;
