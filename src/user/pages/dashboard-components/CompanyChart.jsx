import { Card, Grid } from "@mui/material";
import { Chart } from "react-google-charts";

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
const data = [
  ["Year", "Users", "Visits"],
  ["2022", 400, 400],
  ["2023", 500, 600],
  ["2024", 660, 700],
];

const options = {
  title: "Website Visits",
  curveType: "function",
  legend: { position: "bottom" },
  titleTextStyle: {
    fontSize: 18, // Set the font size for the title
    fontName: "Arial", // Set the font family
    bold: true, // Set to true for bold text, false for normal weight
    italic: true,
    color: "#003E70",
  },
};

const data2 = [
  ["Years", "Users", "Items", "News"],
  ["2021", 1000, 400, 200],
  ["2022", 1170, 460, 250],
  ["2023", 660, 1120, 300],
  ["2024", 1030, 540, 350],
];

const options2 = {
  chart: {
    title: "Website Performance",
    subtitle: "In-Details : 2024",
  },
};

export const CompanyChart = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={8}>
        <Card style={cardStyle}>
          <Chart
            chartType="LineChart"
            width="100%"
            height="350px"
            data={data}
            options={options}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card style={cardStyle}>
          <Chart
            chartType="Bar"
            data={data2}
            options={options2}
            width="100%"
            height="350px"
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default CompanyChart;
