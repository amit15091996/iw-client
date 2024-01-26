import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";

const cardStyle = {
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  borderRadius: "8px",
  padding: "10px",
  margin: "10px",
  textAlign: "center",
  minHeight: "150px", // Set a minimum height for the cards
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const imageStyle = {
  width: "25%",
  height: "25%",
  objectFit: "cover", // Control how the image is resized within its container
};

const contentContainerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

const items = [
  {
    content: `Intallysh Wisdom extends a warm welcome to you on our Dashboard
    page! Dive into a realm of collaborative knowledge-sharing and stay
    updated with the latest happenings. Your journey starts here, where
    documents come to life and news unfolds. As you explore, empower
    yourself with valuable insights and seamless document exchange. Our
    administrators are here to keep you informed with timely news
    updates. Let us build a community where knowledge thrives, and
    information flows effortlessly. Ready to share, connect, and stay in
    the know? Welcome aboard!`,
    imgSrc: "/assets/Welcome.png",
  },
  {
    content: `At Intallysh Wisdom, we take pride in not just sharing knowledge but
    actively shaping it. Our dedicated team crafts robust business
    software, meticulously tests its capabilities, and deploys it with
    precision. This commitment to excellence ensures that every user
    experiences the intellectual richness of our solutions. Join us in
    this exciting venture where knowledge, technology, and innovation
    converge seamlessly.`,
    imgSrc: "/assets/Working.png",
  },
  {
    content: `Empower Your Journey with Intallysh Wisdom!!
    At Intallysh Wisdom, we're not just sharing knowledge, we're shaping it. Our dedicated team meticulously crafts robust business software, ensuring precision in testing and deployment. This commitment to excellence guarantees users an experience enriched with intellectual depth. Join us in this thrilling venture, where knowledge, technology, and innovation seamlessly converge, propelling you towards a future of limitless possibilities.`,
    imgSrc: "/assets/News.png",
  },
  // Add more items as needed
];

const Welcome = () => {
  return (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={12}>
          <Card style={cardStyle}>
            <div style={contentContainerStyle}>
              {/* Check if the index is even or odd to alternate the placement */}
              {index % 2 === 0 ? (
                <>
                  {/* Content */}
                  <div
                    style={{
                      textAlign: "justify",
                      color: "#003E70",
                      fontSize: "20px",
                      // fontStyle: "italic",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {item.content}
                  </div>
                  {/* Image */}
                  <img
                    src={item.imgSrc}
                    alt={`Illustration ${index + 1}`}
                    style={imageStyle}
                  />
                </>
              ) : (
                <>
                  {/* Image */}
                  <img
                    src={item.imgSrc}
                    alt={`Illustration ${index + 1}`}
                    style={imageStyle}
                  />
                  {/* Content */}
                  <div
                    style={{
                      textAlign: "justify",
                      color: "#003E70",
                      fontSize: "20px",
                      // fontStyle: "italic",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {item.content}
                  </div>
                </>
              )}
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Welcome;
