import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, useNavigate } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

// import { theme } from "../../Theme";
import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import PeopleIcon from "@mui/icons-material/People";
import FeedIcon from "@mui/icons-material/Feed";
import { useTheme } from "@emotion/react";
import FolderIcon from "@mui/icons-material/Folder";
import Swal from "sweetalert2";
import { isAdmin } from "../services/Util";
import Loader from "../pages/Loader";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme, isMobile) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(isMobile ? 0 : 7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(isMobile ? 0 : 9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, isMobile }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme, isMobile),
    "& .MuiDrawer-paper": closedMixin(theme, isMobile),
  }),
}));

export default function UserNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(!isMobile);
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(
    localStorage.getItem("activeItem") || "/user/dashboard"
  );
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.setItem("activeItem", location.pathname); // Update active item based on location
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleNavClick = (url) => {
    setLoadingDelay(true); // Set loading delay to true
    setTimeout(() => {
      setLoadingDelay(false); // Set loading delay to false after the delay
      navigate(url); // Navigate to the specified URL
      setActiveItem(url); // Set activeItem to the clicked URL
      if (isMobile) {
        setOpen(isMobile ? false : true);
      }
    }, 500); // Set the delay time to 500 milliseconds
  };
  

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/user/profile"); // Navigate to the /user/profile route
    setActiveItem("/user/profile"); // Set activeItem to '/user/profile'
    handleClose(); // Close the menu after navigation
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    setLoading(true); // Start loading when logout is confirmed
    setTimeout(() => {
      localStorage.clear();
      navigate("/login");
      setLoading(false); // Set loading to false after redirecting

      // Show SweetAlert upon successful logout
      Swal.fire({
        icon: "success",
        title: "Logout successfully",
      });
    }, 2000); // Mimicking a delay for demonstration purposes
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };
  const [loadingDelay, setLoadingDelay] = React.useState(true);

  React.useEffect(() => {
    // Mimicking a .5 second delay for demonstration purposes
    const delayTimeout = setTimeout(() => {
      setLoadingDelay(false);
    }, 500);

    return () => {
      clearTimeout(delayTimeout);
    };
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ backgroundColor: "#faf9f9" }}>
        <Toolbar color="primary">
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                style={{ color: "#003E70" }}
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpen(!open)}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <img
                src="/assets/main-logo.jpg"
                alt=""
                style={{
                  height: "60px",
                  width: "270px",
                  mixBlendMode: "darken",
                }}
              />
            </Box>
            <Box>
              <Tooltip title="click to open">
                <IconButton onClick={handleClick} sx={{ pr: "10%" }}>
                  <Avatar alt="A" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
              <Dialog
                open={logoutDialogOpen}
                onClose={handleLogoutCancel}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-description"
              >
                <DialogTitle id="logout-dialog-title">
                  Confirm Logout
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="logout-dialog-description">
                    Are you sure you want to logout?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleLogoutCancel} variant="contained">
                    No
                  </Button>
                  <Button
                    onClick={handleLogoutConfirm}
                    style={{ backgroundColor: "#e53935", color: "white" }}
                  >
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
              {loading && ( // Show loading indicator if loading is true
                <Box
                  sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 9999,
                  }}
                >
                  <CircularProgress color="secondary" />
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ position: "absolute" }}>
        <Drawer
          variant="permanent"
          open={open}
          isMobile={isMobile}
          PaperProps={{
            sx: {
              backgroundColor: "#faf9f9",
              color: "white",
              position: "fixed",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            },
          }}
        >
          <DrawerHeader></DrawerHeader>
          <Divider />
          <List>
            {[
              {
                id: "1",
                name: "Dashboard",
                icon: <DashboardIcon />,
                link: "/user/dashboard",
              },
              {
                id: "2",
                name: "Profile",
                icon: <PersonIcon />,
                link: "/user/profile",
              },
              {
                id: "3",
                name: "Users",
                icon: <PeopleIcon />,
                link: "/user/all-users",
              },
              {
                id: "4",
                name: "My Documents",
                icon: <FolderIcon />,
                link: "/user/my-documents",
              },
              {
                id: "5",
                name: "Send Documents",
                icon: <DriveFolderUploadIcon />,
                link: "/user/documents",
              },
              {
                id: "6",
                name: "All Documents",
                icon: <FolderCopyIcon />,
                link: "/user/all-users-documents",
              },
              {
                id: "7",
                name: "News",
                icon: <FeedIcon />,
                link: "/user/blog",
              },
            ].map(
              (text, index) =>
                ((text.link !== "/user/all-users" &&
                  text.link !== "/user/all-users-documents") ||
                  isAdmin()) && (
                  <ListItem
                    key={text.id}
                    disablePadding
                    sx={{ display: "block" }}
                    onClick={() => handleNavClick(text.link)}
                    selected={activeItem === text.link}
                    button
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        backgroundColor:
                          activeItem === text.link ? "#003E70" : "transparent",
                        "&:hover": {
                          backgroundColor:
                            activeItem === text.link
                              ? "#003E70"
                              : hoveredItem === text.link
                              ? "#e0e0e0"
                              : "transparent",
                        },
                      }}
                      onMouseEnter={() => setHoveredItem(text.link)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          color:
                            activeItem === text.link ? "#faf9f9" : "#003E70",
                        }}
                      >
                        {text.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text.name}
                        sx={{
                          opacity: open ? 1 : 0,
                          color:
                            activeItem === text.link ? "#faf9f9" : "#003E70",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                )
            )}
          </List>
          <Box
            sx={{
              position: "absolute",
              bottom: "50px", // Adjust the bottom spacing as needed
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {open || isMobile ? (
              <Button
                variant="contained"
                style={{ backgroundColor: "#ef233c" }}
                onClick={handleLogoutConfirm}
              >
                Logout
              </Button>
            ) : (
              <IconButton
                onClick={handleLogoutConfirm}
                style={{ color: "#ef233c" }}
              >
                <PowerSettingsNewIcon />
              </IconButton>
            )}
          </Box>
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: !isMobile ? (!open ? "12px 65px" : "12px") : 1,
          //   pl: { xs: 8, md: 10, xl: 32, lg: 32 },
          marginLeft: !isMobile ? (!open ? 2 : 30) : 0,
          backgroundColor: "#F8F1FF",
        }}
      >
        <DrawerHeader />
        {loadingDelay ? (
          // Show the Loader component with a .5 sec delay
          <Loader open={true} />
        ) : (
          <Outlet />
        )}
      </Box>
    </Box>
  );
}
