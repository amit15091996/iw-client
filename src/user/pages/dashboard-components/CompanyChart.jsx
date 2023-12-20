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
export const data = [
  ["Year", "Users", "Visits"],
  ["2021", 400, 400],
  ["2022", 500, 600],
  ["2023", 660, 700],
  ["2024", 700, 800],
];

export const options = {
  title: "Website Visits",
  curveType: "function",
  legend: { position: "bottom" },
  titleTextStyle: {
    fontSize: 18, // Set the font size for the title
    fontName: "Arial", // Set the font family
    bold: true, // Set to true for bold text, false for normal weight
    italic: true,
    color: "#6096ba",
  },
};

export const data2 = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options2 = {
  title: "My Daily Activities",
  pieHole: 0.4,
  is3D: false,
  chartArea: { width: "120%", height: "70%" },
  titleTextStyle: {
    fontSize: 18, // Set the font size for the title
    fontName: "Arial", // Set the font family
    bold: true, // Set to true for bold text, false for normal weight
    italic: true,
    color: "#6096ba",
  },
  titlePosition: "center",
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
            chartType="PieChart"
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
