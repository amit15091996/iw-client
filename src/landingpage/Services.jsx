import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CodeIcon from "@mui/icons-material/Code";

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
};

const Services = () => {
  return (
    <div style={styles.container}>
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <Card key={index} style={styles.card}>
          <CardContent style={styles.content}>
            <IconButton style={styles.icon}>
              <CodeIcon /> {/* Replace with your icon component */}
            </IconButton>
            <Typography variant="h5" style={styles.title}>
              Development
            </Typography>
            <Typography variant="body1" style={styles.description}>
              One of our core strengths lies in our investment in software
              development. We develop and deliver high quality products in
              accordance with specifications.
            </Typography>
            <Button variant="contained" style={styles.button}>
              Learn More
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Services;
