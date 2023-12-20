import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/AdminService";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";

const AllUsers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [usersList, setUsersList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const getUserListData = async () => {
    try {
      const res = await getAllUsers("NOT_DELETED");
      if (res.status === "Success") {
        setUsersList(res.usersList || []);
      } else {
        setUsersList([]);
      }
    } catch (error) {
      alert("Error while loading profiles");
    }
  };

  useEffect(() => {
    getUserListData();
  }, []);

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
    setConfirmationDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    const updatedUsers = usersList.filter(
      (user) => user.userId !== userToDelete
    );
    setUsersList(updatedUsers);
    setConfirmationDialogOpen(false);
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
    setUserToDelete(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleDelete = () => {
    
  };
  const filteredUsers = usersList.filter((user) => {
    const userIdString = String(user.userId); // Convert userId to string
    return (
      userIdString.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Box>
      <Typography variant="h6" className="component-header" color="primary">
        All Users
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        onChange={handleSearch}
        value={searchTerm}
        margin="normal"
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead color="success">
            <TableRow>
              <TableCell>Sr.No</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">GST Number</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.userId}>
                <TableCell component="th" scope="row">
                  {user.userId}
                </TableCell>
                <TableCell align="right">{user.name}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.phone}</TableCell>
                <TableCell align="right">{user.address}</TableCell>
                <TableCell align="right">{user.gstNo}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteUser(user.userId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={confirmationDialogOpen}
        onClose={closeConfirmationDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this user?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteUser} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllUsers;
