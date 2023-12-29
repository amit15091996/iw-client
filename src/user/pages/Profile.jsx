import { useState, useEffect } from "react";
import { Avatar, Card, Divider, Grid, List, ListItem } from "@mui/material";
import ChangePassword from "./ChangePassword";
import {
  getLoggedInUserName,
  getUserByUsername,
  updateProfile,
} from "../services/UserService";
import UpdateProfile from "./UpdateProfile";
import Swal from "sweetalert2";

const Profile = () => {
  const [formData, setFormData] = useState({});

  const fetchUserData = async () => {
    const loggedInUserName = getLoggedInUserName();
    if (loggedInUserName) {
      try {
        const userData = await getUserByUsername(loggedInUserName);
        setFormData(userData.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const cardContainerStyle = {
    display: "flex",
  };
  const handleProfileUpdate = async (updatedData) => {
    try {
      // Call the updateProfile function from the imported API module
      const response = await updateProfile(updatedData);

      console.log("Profile updated:", response);
      setFormData(updatedData);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
      });
    } catch (error) {
      // Handle errors (e.g., display error message)
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "There was an error while updating your profile. Please try again.",
      });
    }
  };
  return (
    <Grid container spacing={2} sx={cardContainerStyle}>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            borderRadius: "8px",
            padding: "20px",
            margin: "10px",
            textAlign: "center",
            minHeight: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginRight: 2,
          }}
        >
          <Avatar
            sx={{
              width: "64px",
              height: "64px",
              margin: "auto",
              backgroundColor: "none",
            }}
          >
            H
          </Avatar>
          <List
            sx={{ width: "100%" }}
            component="nav"
            aria-label="mailbox folders"
          >
            <ListItem sx={{ margin: "10px 0" }}>
              <h4 style={{ fontWeight: "bold", margin: 0, color: "#2c3e50" }}>
                Name :
              </h4>
              <span style={{ marginLeft: "5px", color: "#34495e" }}>
                {formData.name}
              </span>
            </ListItem>
            <Divider />
            <ListItem sx={{ margin: "10px 0" }}>
              <h4 style={{ fontWeight: "bold", margin: 0, color: "#2c3e50" }}>
                Email :
              </h4>
              <span style={{ marginLeft: "5px", color: "#34495e" }}>
                {formData.email}
              </span>
            </ListItem>
            <Divider />
            <ListItem sx={{ margin: "10px 0" }}>
              <h4 style={{ fontWeight: "bold", margin: 0, color: "#2c3e50" }}>
                Phone :
              </h4>
              <span style={{ marginLeft: "5px", color: "#34495e" }}>
                {formData.phone}
              </span>
            </ListItem>
            <Divider />
            <ListItem sx={{ margin: "10px 0" }}>
              <h4 style={{ fontWeight: "bold", margin: 0, color: "#2c3e50" }}>
                GST Number :
              </h4>
              <span style={{ marginLeft: "5px", color: "#34495e" }}>
                {formData.gstNo}
              </span>
            </ListItem>
            <Divider />
            <ListItem sx={{ margin: "10px 0" }}>
              <h4 style={{ fontWeight: "bold", margin: 0, color: "#2c3e50" }}>
                Address:
              </h4>
              <span style={{ marginLeft: "5px", color: "#34495e" }}>
                {formData.address}
              </span>
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <UpdateProfile userData={formData} onUpdate={handleProfileUpdate} />
      </Grid>
      <Grid item xs={12}>
        <ChangePassword />
      </Grid>
    </Grid>
  );
};
export default Profile;
