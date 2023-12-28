import { useEffect, useState } from "react";
import {
  getAllUsers,
  isNotActiveUser,
  isActiveUser,
  deleteUser,
} from "../services/AdminService";
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
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import CustomPagination from "./user-components/CustomPagination";
import Swal from "sweetalert2";

const AllUsers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [usersList, setUsersList] = useState([]);
  const [userStatus, setUserStatus] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [isPrevPage, setIsPrevPage] = useState(true);
  const [isNextPage, setIsNextPage] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  // Function to toggle the active/inactive status of a user
  const toggleUserStatus = async (userId) => {
    try {
      if (userId == null) {
        console.error("User ID is not available");
        return;
      }
      const isActive = userStatus[userId] || false;

      if (isActive) {
        await isNotActiveUser(userId);
        Swal.fire({
          icon: "info",
          title: "User Deactivated",
          text: "The user is now inactive.",
        });
      } else {
        await isActiveUser(userId);
        Swal.fire({
          icon: "success",
          title: "User Activated",
          text: "The user is now active.",
        });
      }

      setUserStatus({
        ...userStatus,
        [userId]: !isActive,
      });
    } catch (error) {
      console.error("Error toggling user status: ", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error toggling the user status.",
      });
    }
  };

  // pagination-------------------------------

  const [currentPage, setCurrentPage] = useState(0); // State to manage current page
  const pageSize = 5; // Number of users to display per page

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchUsersByPage = async (page) => {
    try {
      const res = await getAllUsers("NOT_DELETED", page, pageSize);
      console.log(res);
      if (res.status === "Success") {
        setUsersList(res.usersList || []);

        // Update userStatus based on fetched data to show initial switch state
        const statusObj = {};
        res.usersList.forEach((user) => {
          statusObj[user.userId] = user.enabled; // Assuming 'enabled' is a boolean
        });

        setUserStatus(statusObj);

        // Update pagination state
        setTotalPages(res.totalPages || 0);
        setTotalResults(res.totalResults || 0);

        // Enable/Disable pagination buttons based on available data
        setIsPrevPage(!res.isFirstPage);
        setIsNextPage(!res.isLastPage);
      } else {
        setUsersList([]);
      }
    } catch (error) {
      alert("Error while loading profiles");
    }
  };

  useEffect(() => {
    fetchUsersByPage(currentPage);
  }, [currentPage]); // Re-fetch users when the currentPage changes

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
    setConfirmationDialogOpen(true);
  };

  const confirmDeleteUser = async () => {
    try {
      if (userToDelete) {
        await deleteUser(userToDelete); // Call the deleteUser function here
        const updatedUsers = usersList.filter(
          (user) => user.userId !== userToDelete
        );
        setUsersList(updatedUsers);
        setConfirmationDialogOpen(false);
        setUserToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting user: ", error);
      // Handle error state or display an error message
    }
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
    setUserToDelete(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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
          <TableHead style={{ backgroundColor: "#003E70" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>Sr.No</TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                Name
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                Email
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                Phone
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                Address
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                GST Number
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                Status
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.userId}>
                <TableCell component="th" scope="row">
                  {user.userId}
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center">{user.address}</TableCell>
                <TableCell align="center">{user.gstNo}</TableCell>
                {/* <TableCell align="center">{user.enabled?'ACTIVE':"NOT_ACTIVE"}</TableCell> */}
                <TableCell align="center">
                  {/* Switch button to toggle user status */}
                  <Switch
                    checked={userStatus[user.userId] || false}
                    onChange={() => toggleUserStatus(user.userId)}
                    color="primary"
                  />
                </TableCell>
                <TableCell align="center">
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
          <Button
            onClick={closeConfirmationDialog}
            variant="contained"
            style={{ backgroundColor: "" }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDeleteUser}
            autoFocus
            style={{ backgroundColor: "#ef233c", color: "white" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default AllUsers;
