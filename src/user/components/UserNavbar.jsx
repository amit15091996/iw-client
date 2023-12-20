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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Outlet, useNavigate } from "react-router-dom";
import { theme } from "../../Theme";
import { Avatar, Tooltip, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
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
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function UserNavbar() {
  const [open, setOpen] = React.useState(true);
  const [activeItem, setActiveItem] = React.useState("/user/dashboard");
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const navigate = useNavigate();
  const handleNavClick = (url) => {
    console.log(url);
    navigate(url);
    setActiveItem(url);
  };

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
              <Typography
                variant="h6"
                noWrap
                component="div"
                style={{ color: "#003E70" }}
              >
                I W
              </Typography>
              {/* <img
                src="/assets/main-logo.jpg"
                alt=""
                style={{
                  height: "60px",
                  width: "270px",
                  mixBlendMode: "darken",
                }}
              /> */}
            </Box>
            <Box>
              <Tooltip title="Open settings">
                <IconButton sx={{ pr: "10%" }}>
                  <Avatar alt="A" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ position: "absolute" }}>
        <Drawer
          variant="permanent"
          open={open}
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
                name: "Users",
                icon: <PersonIcon />,
                link: "/user/all-users",
              },
              {
                id: "3",
                name: "Documents",
                icon: <FolderCopyIcon />,
                link: "/user/profile",
              },
              {
                id: "4",
                name: "Blog",
                icon: <InboxIcon />,
                link: "/user/profile",
              },
            ].map((text, index) => (
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
                      color: activeItem === text.link ? "#faf9f9" : "#003E70",
                    }}
                  >
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text.name}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: activeItem === text.link ? "#faf9f9" : "#003E70",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, pl: { xs: 8, md: 10, xl: 32, lg: 32 } }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
