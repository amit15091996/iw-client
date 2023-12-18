import { Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import CardComponents from "./CardComponents";

const Container = styled(Grid)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "1rem",
});

const ImageContainer = styled(Grid)({
  position: "relative",
  minHeight: "250px", // Adjust height as needed
  overflow: "hidden",
  width: "100%",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
});

const ContentOverlay = styled(Grid)({
  position: "relative",
  zIndex: 1,
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.6)", // Adjust overlay color
  textAlign: "center",
});

const CenteredButton = styled(Button)({
  margin: "10px auto", // Added margin for button spacing
});

const Services = () => {
  const handleButtonClick = () => {
    let scrollAmount = 3450; // Default scroll amount for larger screens

    // Adjust scroll amount for smaller screens (e.g., mobile devices)
    if (window.innerWidth < 768) {
      scrollAmount = 6800; // Adjust this value as needed for mobile
    }

    const currentPosition = window.scrollY || window.pageYOffset;

    window.scroll({
      top: currentPosition + scrollAmount,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container
      container
      style={{ marginTop: "4rem", backgroundColor: "#eff7f6" }}
    >
      <ImageContainer
        item
        xs={12}
        position="relative"
        style={{ backgroundColor: "#eff7f6" }}
      >
        {/* Image content */}

        <ContentOverlay item xs={12}>
          {/* Your content */}
          <Typography
            variant="h5"
            sx={{
              marginBottom: "10px",
              fontSize: { xs: "20px", sm: "20px" },
              fontStyle: "serif",
              color: "#03045e",
            }}
          >
            <b>We are Intallysh Wisdom !</b>
            <br />
          </Typography>
          <Typography
            // variant="body1"

            sx={{
              maxWidth: "800px",
              margin: "auto",
              marginBottom: "10px",
              fontSize: { xs: "15px", sm: "15px" },
              color: "#0466c8",
            }}
          >
            <b>
              The creative minds behind the digital solutions that power the
              world's most inventive brands. We are your dependable technology
              partner, offering best-in-class consulting, development, and
              strategy services.
            </b>
          </Typography>
          <Typography
            style={{ fontFamily: "system-ui" }}
            sx={{
              maxWidth: "600px",
              margin: "auto",
              marginBottom: "10px",
              fontSize: { xs: "14px", sm: "14px" },
              color: "#000",
            }}
          >
            Let's connect and discuss how our technology specialists and
            industry-leading digital solutions may help your organization
            achieve meaningful success.
          </Typography>
          <CenteredButton
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
          >
            Contact Us
          </CenteredButton>
        </ContentOverlay>
      </ImageContainer>
      <CardComponents />
    </Container>
  );
};

export default Services;
