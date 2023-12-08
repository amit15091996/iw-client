import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CodeIcon from "@mui/icons-material/Code";
import RecyclingIcon from "@mui/icons-material/Recycling";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PieChartIcon from "@mui/icons-material/PieChart";
import {
  DEVELOPER_INFO,
  TESTING_INFO,
  EXPERTGUIDENCE_INFO,
  HIGHENDDESIGN_INFO,
  TALLY_INFO,
  ENTERPRISEMANAGEMENT_INFO,
} from "./Constant";
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
    icon: <CodeIcon />,
    btn: "Know More",
    modalTitle: "Development",
    modalDescription: DEVELOPER_INFO,
  },
  {
    title: "Testing",
    description:
      "Our proficiency in software testing is a cornerstone of our success. We consistently deliver top-tier products that precisely align with specified requirements.",
    icon: <RecyclingIcon />,
    btn: "Know More",
    modalTitle: "Testing",
    modalDescription: TESTING_INFO,
  },
  {
    title: "Expert Guidence",
    description:
      "We are a team of certified experts with tremendous experience in web design and development who will walk you through the process with their expertise.",
    icon: <Diversity3Icon />,
    btn: "Know More",
    modalTitle: "Expert-Guidence",
    modalDescription: EXPERTGUIDENCE_INFO,
  },
  {
    title: "High End Design",
    description:
      "Our high-end design solutions for software development encompass innovation and customization. We're committed to creating software products that will function flawlessly.",
    icon: <BarChartIcon />,
    btn: "Know More",
    modalTitle: "High-End-Design",
    modalDescription: HIGHENDDESIGN_INFO,
  },
  {
    title: "Tally",
    description:
      "We provide Tally computing service which can help you to make a continuous record of data, it will automate and integrate all business operations, such as finance and sale.",
    icon: <PersonalVideoIcon />,
    btn: "Know More",
    modalTitle: "Tally",
    modalDescription: TALLY_INFO,
  },
  {
    title: "Enterprise Management",
    description:
      "We provide effective enterprise management for software development which ensures projects align with business goals, risk is minimized, and quality is maintained.",
    icon: <PieChartIcon />,
    btn: "Know More",
    modalTitle: "Enterprise-Management",
    modalDescription: ENTERPRISEMANAGEMENT_INFO,
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
              <IconButton style={styles.icon}>
                <span
                  style={{
                    backgroundColor: "#003E70",
                    color: "#fff",
                    borderRadius: "50%", // Making it round
                    padding: "8px", // Adjust padding as needed
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px", // Adjust width and height for the container
                    height: "40px", // Adjust width and height for the container
                    fontSize: "24px",
                  }}
                >
                  {data.icon}
                </span>
              </IconButton>
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
            <DialogTitle
              align="center"
              variant="h5"
              style={{ backgroundColor: "#003E70", color: "#fff" }}
            >
              {data.modalTitle}
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1">{data.modalDescription}</Typography>
            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
              <Button
                onClick={handleCloseModal}
                style={{ backgroundColor: "#003E70", color: "#fff" }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ))}
    </div>
  );
};

export default Services;
