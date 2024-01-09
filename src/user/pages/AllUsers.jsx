import { useEffect, useState } from "react";
import {
  getAllUsers,
  isNotActiveUser,
  isActiveUser,
  deleteUser,
  updateUserProfile,
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
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useTheme } from "@emotion/react";
import CustomPagination from "./user-components/CustomPagination";
import Swal from "sweetalert2";
import {
  getLoggedInUserName,
  getUserByUsername,
} from "../services/UserService";

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

  const [editUserId, setEditUserId] = useState(null);
  const [formData, setFormData] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleEditUser = (userData) => {
    setFormData(userData); // Set the user data into formData state
    setShowEditModal(true); // Open the edit modal
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditUserId(null);
  };
  const handleProfileUpdate = async (updatedData) => {
    try {
      // Call the updateProfile function from the imported API module
      const response = await updateUserProfile(updatedData);

      console.log("Profile updated:", response);

      // Update the user's address in the usersList state
      const updatedUsersList = usersList.map((user) =>
        user.userId === updatedData.userId ? { ...user, ...updatedData } : user
      );

      setUsersList(updatedUsersList);

      setFormData(updatedData);
      setShowEditModal(false); // Close the edit modal after successful update
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
      <Grid item xs={12} sm={12}>
        <Paper
          sx={{ width: { xs: "400px", sm: "600px", md: "800px", lg: "100%" } , height :{xs:'700px'} }}
        >
          <Box sx={{ padding: "0px 10px", overflowX: "auto" }}>
            <TableContainer sx={{ maxHeight: "auto" }}>
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
                  {filteredUsers.map((user, index) => (
                    <TableRow key={user.userId}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="center">{user.name}</TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center">{user.phone}</TableCell>
                      <TableCell align="center">{user.address}</TableCell>
                      <TableCell align="center">{user.gstNo}</TableCell>
                      <TableCell align="center">
                        <Switch
                          checked={userStatus[user.userId] || false}
                          onChange={() => toggleUserStatus(user.userId)}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEditUser(user)}
                        >
                          <EditNoteIcon style={{ color: "#003E70" }} />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteUser(user.userId)}
                        >
                          <DeleteIcon style={{ color: "#ef233c" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Grid>
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

      <Dialog
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        aria-labelledby="edit-user-modal"
        aria-describedby="edit-user-modal-description"
      >
        <DialogTitle>Edit User Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Phone Number"
            name="phone"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            value={formData.phone}
            fullWidth
            margin="normal"
          />
          <TextField
            label="GST Number"
            name="gstNo"
            onChange={(e) =>
              setFormData({ ...formData, gstNo: e.target.value })
            }
            value={formData.gstNo}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            value={formData.address}
            fullWidth
            margin="normal"
          />
          {/* Other form fields for editing user details */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowEditModal(false)}
            style={{ color: "white", backgroundColor: "#ef233c" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleProfileUpdate(formData)}
            style={{ color: "white", backgroundColor: "#003E70" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllUsers;
