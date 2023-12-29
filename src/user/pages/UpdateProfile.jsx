import { Button, Card, Grid, TextField } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useEffect, useState } from "react";
const UpdateProfile = ({ userData, onUpdate }) => {
    const [editableData, setEditableData] = useState({});
    const [editMode, setEditMode] = useState(false); // State to track edit mode
  
    useEffect(() => {
      if (userData) {
        setEditableData(userData);
      }
    }, [userData]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditableData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleEditClick = () => {
      setEditMode(true); // Enable edit mode
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await onUpdate(editableData);
        setEditMode(false); // Set editMode to false after successful update
      } catch (error) {
        console.error('Error updating profile:', error);
        // Handle error if necessary
      }
    };
  
  return (
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
      }}
    >
      <h3 style={{ color: "#003E70", fontFamily: "revert" }}>
        Update Your Profile
      </h3>
      <br />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Name"
              name="name"
              value={editableData.name || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="UserId"
              name="userId"
              value={editableData.userId || ""}
              fullWidth
              margin="normal"
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              name="email"
              value={editableData.email || ""}
              fullWidth
              margin="normal"
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone Number"
              name="phone"
              value={editableData.phone || ""}
              fullWidth
              margin="normal"
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="GST Number"
              name="gstNo"
              value={editableData.gstNo || ""}
              fullWidth
              margin="normal"
              disabled={!editMode} // Enable/disable based on editMode state
              onChange={handleInputChange} // Allow input change when not disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Address"
              name="address"
              value={editableData.address || ""}
              fullWidth
              margin="normal"
              disabled={!editMode} // Enable/disable based on editMode state
              onChange={handleInputChange} // Allow input change when not disabled
            />
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {!editMode && (
            <Button
              variant="contained"
              
              style={{ marginRight: "10px", height: "35px" }}
              onClick={handleEditClick}
            >
              <CreateIcon />
              Edit
            </Button>
          )}
          {editMode && (
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default UpdateProfile;
