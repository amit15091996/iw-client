import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const cardStyle = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const cardContentStyle = {
  flexGrow: 1,
};

const scrollableContentStyle = {
  maxHeight: 200,
  overflowY: "auto",
  padding: "10px", // Adjust padding as needed
};

const NewsPage = () => {
  const [open, setOpen] = useState(false);
  const [newsList, setNewsList] = useState([
    {
      title: "Cricket, Sports",
      content:
        "India have had two-Test series in South Africa before: in November 2001 and December 2013. But their attack in those rubbers did not shimmer with the bowlers Jasprit Bumrah and Mohammed Siraj have become. Mohammed Shami took six wickets at 43.83 in the 2013 series. Considering Shami's development since then, it's a shame an ankle injury has precluded him from measuring that progress in this rubber.",
      image:
        "https://www.cricbuzz.com/a/img/v1/595x396/i1/c367219/of-the-23-tests-india-have-pla.jpg",
    },
    {
      title: "Intallysh Wisdom, IT News",
      content:
        "Expanding beyond borders, Intallysh Wisdom is poised to scale your network internationally, amplifying your global footprint. Our adept team specializes in crafting scalable software solutions that transcend geographical boundaries, ensuring seamless connectivity and performance across diverse locations.",
      image:
        "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Cricket, Sports",
      content:
        "South Africa then struck immediately at the other end to end Mohammad Siraj's resolve as Coetzee managed to find a faint edge. Rahul's hopes of fetching a century faded pretty quick with that dismissal as debutant Prasidh Krishna took strike against Coetzee with five balls left in the over. Luck was on the wicketkeeper-batter's side as he managed to sneak in a bye to get to the striker's end and smash the bowler for his fourth six to get to his century. Nandre Burger then ensured there was no further damage done as he sneaked past Rahul's defence to bring an end to India's innings.",
      image:
        "https://www.cricbuzz.com/a/img/v1/595x396/i1/c367807/rahul-hit-his-8th-test-hundred.jpg",
    },
    // Add more sample data as needed...
  ]);

  const [cardTitle, setCardTitle] = useState("");
  const [cardContent, setCardContent] = useState("");
  const [cardImage, setCardImage] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostNews = () => {
    if (cardTitle && cardContent && cardImage) {
      const newPost = {
        title: cardTitle,
        content: cardContent,
        image: cardImage,
      };
      setNewsList([...newsList, newPost]);
      setCardTitle("");
      setCardContent("");
      setCardImage("");
      setOpen(false);
    }
  };

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{ marginRight: 10, float: "right" }}
      >
        Add Post
      </Button>
      <Grid container spacing={3}>
        {newsList.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={cardStyle}>
              <CardMedia
                component="img"
                height="250"
                image={item.image}
                alt={item.title}
              />
              <CardContent style={cardContentStyle}>
                <Typography
                  variant="h5"
                  component="div"
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",
                    zIndex: 1,
                  }}
                >
                  {item.title}
                </Typography>
                <div style={scrollableContentStyle}>
                  <Typography
                    variant="body2"
                    style={{
                      textTransform: "capitalize",
                      backgroundColor: "#faf9f9",
                    }}
                  >
                    {item.content}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Post</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter post details:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Card Image URL"
            fullWidth
            value={cardImage}
            onChange={(e) => setCardImage(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Card Title"
            fullWidth
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Card Content"
            fullWidth
            multiline
            rows={4}
            value={cardContent}
            onChange={(e) => setCardContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePostNews} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default NewsPage;
