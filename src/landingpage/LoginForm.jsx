import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { doLoginUser } from "../user/services/UserService";
import Swal from "sweetalert2";
import { Backdrop, CircularProgress } from "@mui/material";
import Loader from "../user/pages/Loader";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const paperStyle = {
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#f8edeb",
};

const formStyle = {
  width: "100%",
  maxWidth: "300px",
  marginTop: "1.5rem",
};

const linkStyle = {
  marginTop: "1rem",
  textDecoration: "none",
  color: "blue",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading to true when starting the login process

      // Call your login service here
      const loginDet = await doLoginUser(username, password);

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
      setLoading(false); // Set loading to false when login process completes
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

  const isMobile = window.innerWidth <= 600;

  return (
    <Container style={containerStyle} component="main" maxWidth="lg">
      <Grid container spacing={3}>
        {/* Left side (SVG) - Visible on desktop, hidden on mobile */}
        {!isMobile && (
          <Grid item xs={12} md={6}>
            <img
              src="/assets/Login.png"
              alt="SVG Icon"
              style={{ marginTop: "-3rem", maxWidth: "100%", height: "100%" }}
            />
          </Grid>
        )}

        {/* Right side (Login Form) */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={paperStyle}>
            <Typography variant="h5" gutterBottom style={{ color: '#003E70' }}>
              Welcome to Intallysh Wisdom
            </Typography>
            <form style={formStyle} onSubmit={handleLoginSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
                <Link to="/forgot" style={linkStyle}>
                  Forgot Password?
                </Link>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "1rem" }}
              >
                Sign In
              </Button>
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <span>Don't have an account? </span>
                <Link to="/register" style={linkStyle}>
                  Register
                </Link>
              </div>
            </form>
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <Link to="/" style={linkStyle}>
                HOME
              </Link>
            </div>
          </Paper>
        </Grid>
      </Grid>

      {/* Loader component */}
      <Loader open={loading} />
    </Container>
  );
};

export default LoginForm;
