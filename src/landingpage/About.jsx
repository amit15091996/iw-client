import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
} from "@mui/material";
import "./about.css";

const About = () => {
  const clientList = [
    "Expertise and Experience",
    "Customization and Flexibility",
    "Innovative Solutions",
    "Timely Delivery",
    "Tailored Approach",
    "Affordable Solutions",
    "Quality Assurance",
    "User-Centric Design",
  ];

  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div
      className="client-list-container"
      style={{
        padding: "30px",
        boxSizing: "border-box",
      }}
    >
      <div className="centered-text">About Us</div>

      <div className="about-section">
        <p style={{color:'#3d5a80'}}>
          "Intallysh Wisdom welcomes you! We're like architects for software. Our
          objective is to create websites that help you do things more
          efficiently and quickly. From modest to huge initiatives, we've
          collaborated with a wide range of people. Our fulfilment stems from
          making your work and life easier. Let's simplify technology together!"
        </p>
      </div>
      <div className="centered-fea">Why Choose Us</div>

      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        style={{ margin: "10px" }} // Add negative margin to Grid container
      >
        {clientList.map((client, index) => (
          <Grid
            key={index}
            item
            xs={8}
            sm={4}
            textAlign="center"
            style={{ margin: "8px", marginRight:'50px' }}
          >
            {/* Add margin to Grid item */}
            <div
              className="client-item"
              style={{
                marginTop: "-1rem",
                textAlign: "center",
                backgroundColor: "#f4f1de",
                padding: "10px",
                borderRadius: "5px",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                lineHeight: "0",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111d4a",
                transition: "background-color 0.3s ease", // Adding transition for smooth effect
                cursor: "default", // Change cursor on hover
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f9dcc4"; // Change background color on hover f9dcc4
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#f4f1de"; // Revert back to original color on mouse leave
              }}
            >
              ✓ {client}
            </div>
          </Grid>
        ))}
      </Grid>

      {/* Modal Button */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#003E70" }}
          onClick={handleModalOpen}
        >
          More About Us
        </Button>
        
        <Dialog open={openModal} onClose={handleModalClose}>
          <DialogTitle>About Us</DialogTitle>
          <DialogContent dividers>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              <b style={{ color: "#003E70" }}>Intallysh Wisdom</b> was founded
              by <b>Mr. Chandrahas Dewangan</b> with the main goal of helping
              clients prosper. Established a business with just two employees
              under the name Tally Accounting Solutions in 2016. After
              successfully finishing two years of work, he began his journey
              with several clients and a few workers. After achieving success
              with Tally, he sought to expand his firm into other areas. In
              January 2020, he began working on new technologies and
              collaborating with new partners named <b>Sonam Dewangan</b> and{" "}
              <b>Sanjay Dewanagan.</b> He subsequently started conducting
              business as Intallysh Wisdom.
            </Typography>
            <Typography variant="body1">
              A Chhattisgarh-based offshore development center belongs to the
              custom software development company Intallysh Wisdom. Our company
              provides software products, mobile applications, and business
              process automation technology to e-power organizations throughout
              the globe.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleModalClose}
              style={{ color: "white", backgroundColor: "#003E70" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </div>
      {/* End of Modal Button */}
    </div>
  );
};

export default About;
