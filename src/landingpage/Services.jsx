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
    backgroundColor: "#f6fff8",
    color: "#003E70",
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
    icon: <CodeIcon style={{ color: "#003E70" }} />,
    btn: "Know More",
    modalTitle: "Development Modal",
    modalDescription: "This is the development modal content.",
  },
  {
    title: "Testing",
    description:
      "Our proficiency in software testing is a cornerstone of our success. We consistently deliver top-tier products that precisely align with specified requirements.",
    icon: <CodeIcon style={{ color: "#003E70" }} />,
    btn: "Know More",
    modalTitle: "Testing Modal",
    modalDescription: "This is the Testing modal content.",
  },
  {
    title: "Expert Guidence",
    description:
      "We are a team of certified experts with tremendous experience in web design and development who will walk you through the process with their expertise.",
    icon: <CodeIcon style={{ color: "#003E70" }} />,
    btn: "Know More",
    modalTitle: "EG Modal",
    modalDescription: "This is the EG modal content.",
  },
  {
    title: "High End Design",
    description:
      "Our high-end design solutions for software development encompass innovation and customization. We're committed to creating software products that will function flawlessly.",
    icon: <CodeIcon style={{ color: "#003E70" }} />,
    btn: "Know More",
    modalTitle: "Design Modal",
    modalDescription: "This is the Design modal content.",
  },
  {
    title: "Tally",
    description:
      "We provide Tally computing service which can help you to make a continuous record of data, it will automate and integrate all business operations, such as finance and sale.",
    icon: <CodeIcon style={{ color: "#003E70" }} />,
    btn: "Know More",
    modalTitle: "Tally Modal",
    modalDescription: "This is the Tally modal content.",
  },
  {
    title: "Enterprise Management",
    description:
      "We provide effective enterprise management for software development which ensures projects align with business goals, risk is minimized, and quality is maintained.",
    icon: <CodeIcon style={{ color: "#003E70" }} />,
    btn: "Know More",
    modalTitle: "Enterprise Modal",
    modalDescription: "This is the Enterprise modal content.",
  },
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
                style={{ backgroundColor: "#003E70" }}
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
