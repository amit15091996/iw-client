import { useState } from "react";
import Swal from "sweetalert2";
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
import { forgotPassword } from "../services/UserService";

const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(""); // Add state for the username
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordChange = async () => {
    try {
      // Call forgotPassword to initiate the password change process
      const forgotPasswordResponse = await forgotPassword(username);

      if (!forgotPasswordResponse.success) {
        // Handle the case where the forgot password request fails
        Swal.fire({
          icon: "error",
          title: "Forgot Password Failed",
          text: forgotPasswordResponse.message,
        });
        return;
      }

      // Assuming the forgot password request was successful,
      // proceed with the password change using your existing logic

      // Validate if new password matches the confirmation
      if (newPassword !== confirmNewPassword) {
        Swal.fire({
          icon: "error",
          title: "Passwords do not match",
          text: "Please make sure the new passwords match.",
        });
        return;
      }
    } catch (error) {
      // Handle error response
      console.error("Error in handlePasswordChange:", error);

      Swal.fire({
        icon: "error",
        title: "Password Change Failed",
        text: "There was an error changing your password. Please try again.",
      });
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h6" style={{ marginRight: "10px" }}>
        To Update Your password
      </Typography>
      <Button
        component="button"
        style={{ backgroundColor: "#003E70", color: "white" }}
        onClick={handleClickOpen}
      >
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
            label="Username" // Add a field for the username
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
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
          <Button
            onClick={handlePasswordChange}
            style={{ backgroundColor: "#003E70", color: "white" }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangePassword;
