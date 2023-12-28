import { useState } from "react";
import Swal from 'sweetalert2'; 
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordChange = () => {
    // Logic to handle password change - You can add your implementation here
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm New Password:", confirmNewPassword);

    Swal.fire({
        icon: 'success',
        title: 'Password Updated!',
        text: 'Your password has been updated successfully.',
      });

    // Reset fields and close modal after password change
    setOldPassword("");
    setNewPassword("");
    setOpen(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
    <Typography variant="h6" style={{ marginRight: "10px" }}>
      To Update Your password
    </Typography>
    <Button component="button" variant="contained" onClick={handleClickOpen}>
      Click here
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Your Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your old and new password below.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Old Password"
          type="password"
          fullWidth
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
        
          margin="dense"
          label="New Password"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Confirm New Password"
          type="password"
          fullWidth
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          style={{ backgroundColor: "#ef233c", color: "white" }}
        >
          Cancel
        </Button>
        <Button onClick={handlePasswordChange} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  );
};

export default ChangePassword;
