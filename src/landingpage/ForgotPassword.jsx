import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import Loader from "../user/pages/Loader";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const paperStyle = {
  marginTop: "6rem",
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

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const verificationValue = "dummy@gmail.com"; // Updated dummy verification value

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    // Simulating a delay for loading (you can replace this with an API call)
    setTimeout(() => {
      setIsLoading(false);

      // Check if the input value matches the verification value
      if (inputValue.trim() === verificationValue) {
        // Show success toast
        showSuccessToast();
        // Navigate to Login component when the value is correct
        navigate("/login");
      } else {
        // Show error toast
        showErrorToast();
      }
    }, 2000); // Change the delay time as needed
  };

  const showSuccessToast = () => {
    Swal.fire({
      icon: "success",
      title: "Verification Successful",
      text: "You will receive an email with further instructions.",
    });
  };

  const showErrorToast = () => {
    Swal.fire({
      icon: "error",
      title: "Verification Failed",
      text: "Incorrect email. Please try again.",
    });
  };

  const isMobile = window.innerWidth <= 600;

  return (
    <Container style={containerStyle} component="main" maxWidth="lg">
      <Grid container spacing={3}>
        {!isMobile && (
          <Grid item xs={12} md={6}>
            <img
              src="/assets/Login.png"
              alt="SVG Icon"
              style={{ marginTop: "-1rem", maxWidth: "100%", height: "80%" }}
            />
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          {/* Right side (Forgot Password Form) */}
          <Paper elevation={3} style={paperStyle}>
            <Typography variant="h5" gutterBottom style={{ color: "#003E70" }}>
              Forgot Password
            </Typography>
            <form style={formStyle} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="inputValue"
                label="Phone-Number / Email"
                name="inputValue"
                autoComplete="off"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "1rem" }}
              >
                Reset
              </Button>
              <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
                <Link to="/" style={linkStyle}>
                  HOME
                </Link>
              </div>
              {isLoading && <Loader open={isLoading} />}
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
