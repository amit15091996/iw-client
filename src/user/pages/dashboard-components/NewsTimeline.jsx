import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, Card, Grid } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { useNavigate } from "react-router-dom";

const cardStyle = {
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  borderRadius: "8px",
  padding: "20px",
  margin: "10px",
  minHeight: "150px", // Set a minimum height for the cards
  display: "flex",
  flexDirection: "column",
};

const timelineData = [
  { title: "Eat", time: "29 Apr 2023 2:48 AM", color: "secondary" },
  { title: "Code", time: "30 Jan 2023 6:10 PM", color: "success" },
  { title: "Eat", time: "05 Oct 2023 2:50 AM", color: "secondary" },
  { title: "Code", time: "22 Sep 2023 6:55 PM", color: "success" },
  { title: "Eat", time: "06 Jul 2023 5:59 PM", color: "secondary" },
  // Add more items as needed
];

const listData = [
  {
    avatarSrc: "/static/images/avatar/1.jpg",
    primaryText: "Brunch this weekend?",
    secondaryText:
      "Ali Connors — I'll be in your neighborhood doing errands this…",
  },
  {
    avatarSrc: "/static/images/avatar/2.jpg",
    primaryText: "Summer BBQ",
    secondaryText: "Jennifer — Wish I could come, but I'm out of town this…",
  },
  {
    avatarSrc: "/static/images/avatar/3.jpg",
    primaryText: "Oui Oui",
    secondaryText:
      "Sandra Adams — Do you have Paris recommendations? Have you ever…",
  },
  {
    avatarSrc: "/static/images/avatar/4.jpg",
    primaryText: "Oui Oui",
    secondaryText:
      "Sandra Adams — Do you have Paris recommendations? Have you ever…",
  },
  {
    avatarSrc: "/static/images/avatar/4.jpg",
    primaryText: "Oui Oui",
    secondaryText:
      "Sandra Adams — Do you have Paris recommendations? Have you ever…",
  },
];

const NewsTimeline = () => {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate("/user/blog");
  };
  return (
    <>
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={12} sm={6} md={8}>
          <Card style={cardStyle}>
            <h3>News Update</h3>
            <List
              sx={{ width: "100%", maxWidth: 660, bgcolor: "background.paper" }}
            >
              {listData.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={`Avatar ${index}`} src={item.avatarSrc} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        fontSize: "30px",
                        fontWeight: 400,
                      }}
                      primary={item.primaryText}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="#6c757d"
                          >
                            {item.secondaryText}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {index !== listData.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
              {/* <hr /> */}
            </List>
            <Grid container justifyContent="flex-end">
              <Button
                variant="text"
                style={{
                  width: "120px",
                }}
                endIcon={<NavigateNextIcon />}
                onClick={handleRoute}
              >
                View all
              </Button>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card style={cardStyle}>
            <h3>Recent Activity</h3>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              {timelineData.map((item, index) => (
                <TimelineItem key={index} style={{ margin: "5.5px" }}>
                  <TimelineSeparator>
                    <TimelineDot color={item.color} />
                    {index < timelineData.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <label style={{ fontSize: "18px", fontWeight: 400 }}>
                      {item.title}
                    </label>
                    <br />
                    <label style={{ fontSize: "14px", color: "gray" }}>
                      {" "}
                      {item.time}
                    </label>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default NewsTimeline;
