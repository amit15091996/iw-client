import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import './team.css';

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: "2rem",
  },
  card: {
    width: "320px",
    height: "300px",
    margin: "1rem",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    transition: "transform 0.3s, box-shadow 0.3s",
    position: "relative",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "1.5rem",
    position: "relative",
    zIndex: 1,
  },
  title: {
    marginBottom: "0.5rem",
    fontWeight: "bold",
    color: "#003E70",
  },
  description: {
    marginBottom: "1rem",
    color: "#0077b6",
  },
  gradientOverlay: {
    position: "absolute",
    top: "-20%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    opacity: 0,
    transition: "opacity 0.3s",
    zIndex: 0,
    transform: "rotate(45deg)",
  },
  cardHover: {
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 12px 20px 0 rgba(0,0,0,0.3)",
      "& $gradientOverlay": {
        opacity: 0.7,
      },
    },
  },
};

const cardData = [
  {
    description:
      "I aim to push boundaries and innovate. Our company thrives on pioneering technology to disrupt industries. My expertise involves challenging norms to craft inventive solutions and redefine conventional practices.",
    name: "Chandrahas Dewangan",
    position: "Founder",
  },
  {
    description:
      "I aim to build a company that goes beyond local success and leaves a lasting impression on the global stage. Our focused efforts are directed towards achieving a specific goal of making a long-lasting impact on a global scale.",
    name: "Sonam Dewangan",
    position: "Co-Founder",
  },
  {
    description:
      "Passionate about crafting seamless, user-centric experiences. Our mission: simplify processes for valued customers. Using innovative tech and a customer approach, we empower individuals and businesses to focus on what matters most.",
    name: "Sanjay Dewangan",
    position: "Technical Co-Founder",
  },
];

const Team = () => {
  return (
    <div style={styles.container}>
      {cardData.map((data, index) => (
        <div key={index}>
          <Card className="card-box" style={{ ...styles.card, ...styles.cardHover }}>
            <div style={styles.gradientOverlay}></div>
            <CardContent style={styles.content}>
              <Typography variant="body1" component="p" style={styles.description}>
                {data.description}
              </Typography>
              <Typography variant="h5" style={styles.title}>
                {data.name}
              </Typography>
              <Typography variant="h6" style={styles.description}>
                {data.position}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Team;
