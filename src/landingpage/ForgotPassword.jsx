import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../user/pages/Loader";
import { forgotPassword } from "../user/services/UserService";

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
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Basic input validation
      if (!inputValue) {
        setError("Please enter your phone number or email.");
        setIsLoading(false);
        return;
      }

      const response = await forgotPassword(inputValue);

      if (response.success) {
        showSuccessToast(response.message);
        navigate("/login");
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      setError("Failed to reset password. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const showSuccessToast = (message) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
    });
  };

  const showErrorToast = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
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
          <Paper elevation={3} style={paperStyle}>
            <Typography variant="h5" gutterBottom style={{ color: "#003E70" }}>
              Forgot Password
            </Typography>
            <form style={formStyle} onSubmit={handleSubmit}>
              <TextField
                error={!!error}
                helperText={error}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="inputValue"
                label="Phone Number or Email"
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
                style={{ marginTop: "1rem", height: "3rem" }} // Set a fixed height for the button
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{ visibility: isLoading ? "hidden" : "visible" }}
                  >
                    Reset
                  </span>
                  {isLoading && (
                    <Loader
                      style={{
                        width: "2rem",
                        height: "2rem",
                        marginLeft: "1rem",
                      }}
                    />
                  )}{" "}
                  {/* Use appropriate dimensions for the loader */}
                </div>
              </Button>

              <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
                <Link to="/" style={linkStyle}>
                  HOME
                </Link>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
      {/* Loader component */}
      <Loader open={isLoading} />
    </Container>
  );
};

export default ForgotPassword;
