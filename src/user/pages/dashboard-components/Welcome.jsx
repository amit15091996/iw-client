import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import { TypeAnimation } from "react-type-animation";

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

const Welcome = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={8}>
        <Card style={cardStyle}>
          <p style={{ fontSize: "35px", color: "#003E70" }}>Welcome</p>
          
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed once, initially
              "We produce food for Mice",
              1000,
              "We produce food for Hamsters",
              1000,
              "We produce food for Guinea Pigs",
              1000,
              "We produce food for Chinchillas",
              1000,
            ]}
            speed={10}
            style={{ fontSize: "25px", color: "#003E70" }}
            repeat={Infinity}
          />
          <p style={{ fontSize: "25px", color: "#003E70", textAlign:'left' }}>
            Use callback functions at any place inside of your animation
            sequence to perform any (global) actions you want. An exemplary
            use-case for this is calling functions or state updates that
            manipulate the styles of your animation component, or let your
            application know at which state of typing the animation currently
            is, and adjusting some other visual elements accordingly.
          </p>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card style={cardStyle}></Card>
      </Grid>
    </Grid>
  );
};

export default Welcome;
