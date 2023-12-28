import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        marginTop: "50px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "#003E70", fontFamily: "sans-serif" }}>
          Sorry, page not found!
        </h1>
        <p style={{ color: "#003E70", marginTop: "15px" }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </p>
      </div>
      <img
        src="/assets/error-404.svg"
        alt="404 Illustration"
        style={{ maxWidth: "100%", marginTop: "20px" }}
      />
      <div style={{ marginTop: "40px", display: "flex", gap: "10px" }}>
        <Button variant="contained" color="primary" onClick={goBack}>
          Go back
        </Button>
        <Button variant="contained" color="primary" onClick={goToHomePage}>
          Home Page
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
