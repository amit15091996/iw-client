import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import ChangePassword from "./ChangePassword";
import Swal from "sweetalert2";

const dummyData = {
  name: "John Doe",
  email: "johndoe@example.com",
  phoneNumber: "1234567890",
  gstNumber: "GST123456",
  address: "123, Sample Street, City",
};

const Profile = () => {
  const [formData, setFormData] = useState(dummyData);
  const [updatedData, setUpdatedData] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  const buttonStyle = {
    width: "auto",
    marginTop: "12px",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Profile Updated!',
      text: 'Your profile has been updated successfully.',
    });
    setFormData({ ...formData, ...updatedData });
    setIsEditable(false);
    setUpdatedData({});
  };

  useEffect(() => {
    if (!isEditable) {
      setUpdatedData({});
    }
  }, [isEditable]);

  const cardContainerStyle = {
    display: "flex",
  };

  return (
    <Grid container spacing={2} sx={cardContainerStyle}>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", borderRadius: "8px", padding: "20px", margin: "10px", textAlign: "center", minHeight: "150px", display: "flex", flexDirection: "column", justifyContent: "center", marginRight: 2 }}>
          <Avatar sx={{ width: "64px", height: "64px", margin: "auto", backgroundColor: "none" }}>H</Avatar>
          <List sx={{ width: "100%" }} component="nav" aria-label="mailbox folders">
            <ListItem sx={{ fontWeight: "bold", margin: "10px 0" }}>
              <h4>Name: {formData.name}</h4>
            </ListItem>
            <Divider />
            <ListItem divider sx={{ fontWeight: "bold", margin: "10px 0" }}>
              <h4>Email: {formData.email}</h4>
            </ListItem>
            <ListItem sx={{ fontWeight: "bold", margin: "10px 0" }}>
              <h4>Phone Number: {formData.phoneNumber}</h4>
            </ListItem>
            <Divider />
            <ListItem sx={{ fontWeight: "bold", margin: "10px 0" }}>
              <h4>GST Number: {formData.gstNumber}</h4>
            </ListItem>
            <Divider />
            <ListItem sx={{ fontWeight: "bold", margin: "10px 0" }}>
              <h4>Address: {formData.address}</h4>
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Card sx={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", borderRadius: "8px", padding: "20px", margin: "10px", textAlign: "center", minHeight: "150px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h3 style={{ color: "#003E70", fontFamily: "revert" }}>Update Your Profile</h3>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  name="name"
                  value={updatedData.name || formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={updatedData.email || formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={updatedData.phoneNumber || formData.phoneNumber}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="GST Number"
                  name="gstNumber"
                  value={updatedData.gstNumber || formData.gstNumber}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Address"
                  name="address"
                  value={updatedData.address || formData.address}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={buttonStyle}
              onClick={() => setIsEditable(true)}
            >
              Update
            </Button>
          </form>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <ChangePassword />
      </Grid>
    </Grid>
  );
};

export default Profile;
