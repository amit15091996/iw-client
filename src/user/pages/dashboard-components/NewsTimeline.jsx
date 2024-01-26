import React, { useEffect, useState } from "react";
import {
  Backdrop,
  CircularProgress,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Button,
  Card,
  Grid,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { useNavigate } from "react-router-dom";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { getUserActivity } from "../../services/AdminService";

const cardStyle = {
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  borderRadius: "8px",
  padding: "20px",
  margin: "10px",
  height: "520px",
  display: "flex",
  flexDirection: "column",
};

const Loader = ({ open }) => {
  return (
    <Backdrop open={open} style={{ zIndex: 9999, color: "cyan" }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const NewsTimeline = ({ newsList, cardImage, cardTitle, cardContent }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userActivityData, setUserActivityData] = useState([]);

  const fetchUserActivity = async () => {
    setIsLoading(true);

    try {
      const response = await getUserActivity();
      const activityData = response.activityDetails;
      setUserActivityData(activityData);
    } catch (error) {
      console.error("Error fetching user activity:", error);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    fetchUserActivity();
  }, []);

  const handleRoute = () => {
    setIsLoading(true); // Show loader

    // Simulate an asynchronous action (e.g., fetching data)
    setTimeout(() => {
      setIsLoading(false); // Hide loader after the action is completed
      navigate("/user/blog");
    }, 1000); // Simulating a 1-second delay
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={12} sm={6} md={8}>
          <Card style={cardStyle}>
            <h3 style={{ color: "#003E70", fontFamily: "sans-serif" }}>
              News Update
              {/* <IconButton> */}
              <RssFeedIcon
                style={{ verticalAlign: "top", marginLeft: "5px" }}
              />
              {/* </IconButton> */}
            </h3>

            <List
              sx={{ width: "100%", maxWidth: 660, bgcolor: "background.paper" }}
            >
              {newsList &&
                newsList.length > 0 &&
                newsList.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar ${index}`}
                          src={`data:image/${item?.fileDetails?.fileType};base64,${item?.fileDetails?.fileData}`}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        sx={{
                          fontSize: "30px",
                          fontWeight: 400,
                        }}
                        primary={item.blogTitle}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="#6c757d"
                            >
                              {item.blogDesc1.length > 80
                                ? `${item.blogDesc1.slice(0, 80)}...`
                                : item.blogDesc1}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    {index !== newsList.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                ))}
                
            </List>
            <Grid container justifyContent="flex-end">
              <Button
                style={{
                  width: "130px",
                  color: "white",
                  backgroundColor: "#003E70",
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
            <h3 style={{ color: "#003E70" }}>
              Recent Activity{" "}
              <SyncAltIcon
                style={{ verticalAlign: "top", marginLeft: "5px" }}
              />
            </h3>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              {userActivityData.map((item, index) => (
                <TimelineItem key={index} style={{ margin: "2.2px" }}>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    {index < userActivityData.length - 1 && (
                      <TimelineConnector />
                    )}
                  </TimelineSeparator>
                  <TimelineContent>
                    <label style={{ fontSize: "18px", fontWeight: 400 }}>
                      {item.activityDone}
                    </label>
                    <br />
                    <label style={{ fontSize: "14px", color: "gray" }}>
                      {" "}
                      {formatTimestamp(item.modifiedOn)}
                    </label>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Card>
        </Grid>
      </Grid>
      <Loader open={isLoading} />
    </>
  );
};

export default NewsTimeline;
