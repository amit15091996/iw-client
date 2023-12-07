import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CodeIcon from "@mui/icons-material/Code";
import "./services.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: "2rem",
  },
  card: {
    width: "320px",
    margin: "1rem",
    backgroundColor: "#00509d",
    color: "white",
    borderRadius: "12px",
    transition: "0.3s",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "1rem",
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#3f51b5",
    color: "white",
    "&:hover": {
      backgroundColor: "#2c387e",
    },
  },
  // Media query for smaller screens
  "@media (max-width: 600px)": {
    card: {
      width: "90%", // Adjust card width for smaller screens
      margin: "1rem auto", // Center the card
    },
  },
};

const cardData = [
  {
    title: "Development",
    description:
      "One of our core strengths lies in our investment in software development. We develop and deliver high quality products in accordance with specifications.",
    icon: <CodeIcon style={{ color: "white" }} />,
    btn: "Know More",
    modalTitle: "Development Modal",
    modalDescription: "This is the development modal content.",
  },
  {
    title: "Testing",
    description:
      "Our proficiency in software testing is a cornerstone of our success. We consistently deliver top-tier products that precisely align with specified requirements.",
    icon: <CodeIcon style={{ color: "white" }} />,
    btn: "Know More",
    modalTitle: "Testing Modal",
    modalDescription: "This is the Testing modal content.",
  },
  {
    title: "Expert Guidence",
    description:
      "We are a team of certified experts with tremendous experience in web design and development who will walk you through the process with their expertise.",
    icon: <CodeIcon style={{ color: "white" }} />,
    btn: "Know More",
    modalTitle: "EG Modal",
    modalDescription: "This is the EG modal content.",
  },
  // Add more objects for each card with their own modal content
];

const Services = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleButtonClick = (index) => {
    setSelectedCard(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCard(null);
  };

  return (
    <div style={styles.container}>
      {cardData.map((data, index) => (
        <div key={index}>
          <Card className="card-box" style={styles.card}>
            <CardContent style={styles.content}>
              <IconButton style={styles.icon}>{data.icon}</IconButton>
              <Typography variant="h5" style={styles.title}>
                {data.title}
              </Typography>
              <Typography variant="body1" style={styles.description}>
                {data.description}
              </Typography>
              <Button
                onClick={() => handleButtonClick(index)}
                variant="contained"
                style={styles.button}
              >
                {data.btn}
              </Button>
            </CardContent>
          </Card>
          <Dialog
            open={openModal && selectedCard === index}
            onClose={handleCloseModal}
          >
            <DialogTitle>{data.modalTitle}</DialogTitle>
            <DialogContent>
              <Typography variant="body1">{data.modalDescription}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      ))}
    </div>
  );
};

export default Services;
