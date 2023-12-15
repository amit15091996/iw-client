import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";

const cardStyle = {
  minWidth: 100,
  margin: "10px",
  textAlign: "center",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  transition: "0.3s",
  "&:hover": {
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
  },
};
const imageStyle = {
  transform: "scale(1.1)", // Initial zoom level
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.2)", // Zoom on hover
  },
};
const textStyle = {
  color: "#003E70",
  backgroundColor: "#eef4ed",
};
const CardComponents = () => {
  return (
    <div style={{ padding: "50px" }}>
      <Grid container spacing={3}>
        {/* First row */}
        <Grid item xs={12} sm={4}>
          <Card sx={cardStyle}>
            <CardMedia
              component="img"
              height="140"
              image="https://images.unsplash.com/photo-1581091877018-dac6a371d50f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Card 1"
              sx={imageStyle}
            />
            <CardContent>
              <Typography variant="h4" component="h2" style={textStyle}>
                Development
              </Typography>
              <Typography color="textSecondary" style={{ margin: "1rem"}}>
                One of our core strengths lies in our investment in software
                development. We develop and deliver high quality products in
                accordance with specifications.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={cardStyle}>
            <CardMedia
              component="img"
              height="141" // Adjust the height of the image here
              image="https://www.shutterstock.com/image-photo/internet-business-technology-network-concept-260nw-2293331539.jpg"
              alt="Card 2"
              sx={{
                ...imageStyle,
                "& img": {
                  objectFit: "cover", // Maintain aspect ratio
                  height: "100%", // Ensure image takes the full height
                },
              }}
            />
            <CardContent>
              <Typography variant="h4" component="h2" style={textStyle}>
                Testing
              </Typography>
              <Typography color="textSecondary" style={{ margin: "1rem" }}>
                Our proficiency in software testing is a cornerstone of our
                success. We consistently deliver top-tier products that
                precisely align with specified requirements.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={cardStyle}>
            {/* <CardMedia
              component="img"
              height="140"
              image="https://st.depositphotos.com/1152339/4334/i/950/depositphotos_43348081-stock-photo-law-concept-business-man-and.jpg"
              alt="Card 3"
            /> */}
            <CardMedia
              component="img"
              height="141" // Adjust the height of the image here
              image="https://st.depositphotos.com/1152339/4334/i/950/depositphotos_43348081-stock-photo-law-concept-business-man-and.jpg"
              alt="Card 3"
              sx={{
                ...imageStyle,
                "& img": {
                  objectFit: "cover", // Maintain aspect ratio
                  height: "100%", // Ensure image takes the full height
                },
              }}
            />
            <CardContent>
              <Typography variant="h4" component="h2" style={textStyle}>
                Expert Guidence
              </Typography>
              <Typography color="textSecondary" style={{ margin: "1rem" }}>
                We are a team of certified experts with tremendous experience in
                web design and development who will walk you through the process
                with their expertise.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Second row */}
        <Grid item xs={12} sm={4}>
          <Card sx={cardStyle}>
            <CardMedia
              component="img"
              height="141" // Adjust the height of the image here
              image="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Card 4"
              sx={{
                ...imageStyle,
                "& img": {
                  objectFit: "fill", // Maintain aspect ratio
                  height: "100%", // Ensure image takes the full height
                },
              }}
            />
            <CardContent>
              <Typography variant="h4" component="h2" style={textStyle}>
                High End Design
              </Typography>
              <Typography color="textSecondary" style={{ margin: "1rem" }}>
                Our high-end design solutions for software development encompass
                innovation and customization. We're committed to creating
                software products that will function flawlessly.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={cardStyle}>
            <CardMedia
              component="img"
              height="141" // Adjust the height of the image here
              image="https://plus.unsplash.com/premium_photo-1682430969514-c3136343092d?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Card 5"
              sx={{
                ...imageStyle,
                "& img": {
                  objectFit: "fill", // Maintain aspect ratio
                  height: "100%", // Ensure image takes the full height
                },
              }}
            />
            <CardContent>
              <Typography variant="h4" component="h2" style={textStyle}>
                Tally
              </Typography>
              <Typography color="textSecondary" style={{ margin: "1rem" }}>
                We provide Tally computing service which can help you to make a
                continuous record of data, it will automate and integrate all
                business operations, such as finance and sale.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={cardStyle}>
            <CardMedia
              component="img"
              height="141" // Adjust the height of the image here
              image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Card 6"
              sx={{
                ...imageStyle,
                "& img": {
                  objectFit: "fill", // Maintain aspect ratio
                  height: "100%", // Ensure image takes the full height
                },
              }}
            />
            <CardContent>
              <Typography variant="h4" component="h2" style={textStyle}>
                Management
              </Typography>
              <Typography color="textSecondary" style={{ margin: "1rem" }}>
                We provide effective enterprise management for software
                development which ensures projects align with business goals,
                risk is minimized, and quality is maintained.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CardComponents;
