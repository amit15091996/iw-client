import { useEffect, useState } from "react";
import { Card, Grid, IconButton } from "@mui/material";
import { FaUser } from "react-icons/fa";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { getDashboardCounts } from "../../services/AdminService";

const cardStyle = {
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  borderRadius: "8px",
  padding: "20px",
  margin: "10px",
  textAlign: "center",
  minHeight: "150px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const ThreeCards = () => {
  const [apiData, setApiData] = useState(null);
  const fetchData = async () => {
    try {
      const data = await getDashboardCounts();
      setApiData(data);
    } catch (error) {
      console.error("Error fetching count details:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const cardData = [
    {
      icon: <FaUser style={{ fontSize: "45px", color: "#003E70" }} />,
      value: apiData ? apiData.usersCount : "Loading...",
      label: "Users Registered",
    },
    {
      icon: <FolderCopyIcon style={{ fontSize: "50px", color: "#003E70" }} />,
      value: apiData ? apiData.filesCount : "Loading...",
      label: "Items Received",
    },
    {
      icon: (
        <QuestionAnswerIcon style={{ fontSize: "45px", color: "#003E70" }} />
      ),
      value: apiData ? apiData.blogsCount : "Loading...",
      label: "News Posted",
    },
  ];

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
              <IconButton>{card.icon}</IconButton>
              <div style={{ marginLeft: "10px" }}>
                <h2>{card.value}</h2>
                <p
                  style={{
                    color: "#6c757d",
                    fontSize: "15px",
                    fontWeight: 500,
                    fontStyle: "Arial",
                    marginTop: "-25px",
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
