import { Card, Grid, IconButton } from "@mui/material";
import { FaUser, FaBug } from "react-icons/fa";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const cardData = [
  {
    icon: <FaUser style={{ fontSize: "45px", color: "#003E70" }} />,
    value: "10K",
    label: "Users Registered",
  },
  {
    icon: <ShoppingCartIcon style={{ fontSize: "50px", color: "#003E70" }} />,
    value: "100",
    label: "Items Received",
  },
  {
    icon: <FaBug style={{ fontSize: "45px", color: "#003E70" }} />,
    value: "200",
    label: "Bug Reports",
  },
];

const cardStyle = {
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  borderRadius: "8px",
  padding: "20px",
  margin: "10px",
  textAlign: "center",
  minHeight: "150px", // Set a minimum height for the cards
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const ThreeCards = () => {
  return (
    <Grid container spacing={3}>
      {cardData.map((card, index) => (
        <Grid key={index} item xs={12} sm={6} md={4}>
          <Card style={cardStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Icon on the left */}
              <IconButton>{card.icon}</IconButton>

              {/* Content on the right */}
              <div style={{ marginLeft: "10px" }}>
                <h2>{card.value}</h2>
                <p
                  style={{
                    color: "#6c757d",
                    fontSize: "15px",
                    fontWeight: 600,
                    fontStyle: "Arial",
                  }}
                >
                  {card.label}
                </p>
              </div>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ThreeCards;
