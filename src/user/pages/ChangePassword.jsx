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
import { updatePassword } from "../services/UserService";

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

  const handlePasswordChange = async () => {
    try {
      // Call changePassword to initiate the password change process
      const changePasswordResponse = await updatePassword({
        oldPassword,
        newPassword,
        confirmPassword: confirmNewPassword,
      });

      // Assuming the password change request was successful
      Swal.fire({
        icon: "success",
        title: "Password Changed",
        text: changePasswordResponse.message,
      });

      // Close the dialog
      handleClose();
    } catch (error) {
      // Handle error response
      console.error("Error in handlePasswordChange:", error);

      Swal.fire({
        icon: "error",
        title: "Password Change Failed",
        text:
          error.message ||
          "There was an error changing your password. Please try again.",
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
