import { useState } from 'react';
import { Grid, TextField, Button, Typography, Paper, Box } from '@mui/material';
import styled from 'styled-components';

const Profile = () => {
  const initialData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '1234567890',
    address: '123 Main St, City, Country',
    gstNumber: 'ABCD1234XYZ',
  };

  const [formData, setFormData] = useState(initialData);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    // You can add logic here to save the updated data (formData) to your backend or perform other actions.
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const StyledBox = styled(Box)`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  /* Add any other desired styles */
`;

// Styled component for the strong tags within Typography
const Strong = styled.strong`
  font-weight: bold;
`;
  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <StyledBox p={2}>
      <Typography variant="body1">
        <Strong>Name:</Strong> {formData.name}
      </Typography>
      <Typography variant="body1">
        <Strong>Email:</Strong> {formData.email}
      </Typography>
      <Typography variant="body1">
        <Strong>Phone:</Strong> {formData.phone}
      </Typography>
      <Typography variant="body1">
        <Strong>Address:</Strong> {formData.address}
      </Typography>
      <Typography variant="body1">
        <Strong>GST Number:</Strong> {formData.gstNumber}
      </Typography>
    </StyledBox>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Name"
            name="name"
            value={formData.name}
            disabled={!editMode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Email"
            name="email"
            value={formData.email}
            disabled={!editMode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Phone"
            name="phone"
            value={formData.phone}
            disabled={!editMode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Address"
            name="address"
            value={formData.address}
            disabled={!editMode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="GST Number"
            name="gstNumber"
            value={formData.gstNumber}
            disabled={!editMode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          {!editMode ? (
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Profile;
