import { useState, useRef, useEffect } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  Hidden,
} from "@mui/material";
import { Menu, KeyboardArrowUp } from "@mui/icons-material";
import Carousel from "./Carousel";
import Services from "./Services";
import NamesCarousel from "./NamesCarousel";
import About from "./About";
import Contact from "./Contact";
import { Link } from "react-router-dom";

const Navbar = () => {
  const sectionRefs = useRef([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const appBarHeight = 0; // Set the height of your AppBar here
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    const offset =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    if (!showScroll && offset > 300) {
      setShowScroll(true);
    } else if (showScroll && offset <= 300) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);
  // Custom names for navigation tabs
  const navTabNames = [
    "Home",
    "Services",
    "Clients",
    "About",
    "Contact",
    "Login",
  ]; // Replace these names with your desired tab names

  const scrollToSection = (index) => {
    const offsetTop = sectionRefs.current[index].offsetTop - appBarHeight;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
    setDrawerOpen(false);
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;
      if (offset > appBarHeight) {
        sectionRefs.current.forEach((ref) => {
          ref.style.paddingTop = `${appBarHeight}px`;
        });
      } else {
        sectionRefs.current.forEach((ref) => {
          ref.style.paddingTop = "0";
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" style={{ backgroundColor: "#003E70" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            I W
          </Typography>
          <Hidden smDown>
            <Box sx={{ display: "flex" }}>
              {navTabNames.map((name, index) =>
                name === "Login" ? (
                  <Button
                    key={`nav-${index}`}
                    color="inherit"
                    component={Link}
                    to="/login"
                  >
                    {name}
                  </Button>
                ) : (
                  <Button
                    key={`nav-${index}`}
                    color="inherit"
                    onClick={() => scrollToSection(index)}
                  >
                    {name}
                  </Button>
                )
              )}
            </Box>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 170,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
          }}
          style={{ color: "#fff", backgroundColor: "#003E70" }}
        >
          <List>
            {navTabNames.map((name, index) =>
              name === "Login" ? (
                <ListItem
                  button
                  key={`nav-${index}`}
                  component={Link}
                  to="/login"
                >
                  <ListItemText primary={name} />
                </ListItem>
              ) : (
                <ListItem
                  button
                  key={`nav-${index}`}
                  onClick={() => scrollToSection(index)}
                >
                  <ListItemText primary={name} />
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>

      <div
        ref={(ref) => (sectionRefs.current[0] = ref)}
        style={{
          paddingTop: "0",
          height: "auto",
          backgroundColor: "#fff",
          margin: "0",
          overflow: "hidden",
        }}
      >
        <div>
          <Carousel />
        </div>
      </div>

      <div
        ref={(ref) => (sectionRefs.current[1] = ref)}
        style={{
          paddingTop: "0",
          height: "auto",
          backgroundColor: "#fff",
          margin: "0",
          overflow: "hidden",
        }}
      >
        <div>
          {/* <h2>Content of Nav 2 section</h2> */}
          <Services />
        </div>
      </div>

      <div
        ref={(ref) => (sectionRefs.current[2] = ref)}
        style={{
          paddingTop: "0",
          height: "auto",
          backgroundColor: "#f8f9fa",
          margin: "0",
          overflow: "hidden",
        }}
      >
        <div style={{ marginTop: "50px" }}>
          <NamesCarousel />
        </div>
      </div>
      <div
        ref={(ref) => (sectionRefs.current[3] = ref)}
        style={{
          paddingTop: "0",
          height: "auto",
          backgroundColor: "#fff",
          margin: "0",
          overflow: "hidden",
        }}
      >
        <div style={{ marginTop: "50px" }}>
          <About />
        </div>
      </div>
      <div
        ref={(ref) => (sectionRefs.current[4] = ref)}
        style={{
          paddingTop: "0",
          height: "auto",
          backgroundColor: "#fff",
          margin: "0",
          overflow: "hidden",
        }}
      >
        <div style={{ marginTop: "-20px" }}>
          <Contact />
          <div
            className="footer"
            style={{
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontFamily: 'sans-serif',
              fontSize: '15px',
              color: '#fff',
              fontWeight: 600,
              backgroundColor: '#003e70',
            }}
          >
            © 2020 Intallysh Wisdom
          </div>
        </div>
      </div>
      {showScroll && (
        <IconButton
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "#4e148c",
            color: "#fff",
            zIndex: 1000,
            "&:hover": {
              backgroundColor: "#003E70",
            },
          }}
          onClick={scrollTop}
          aria-label="scroll to top"
        >
          <KeyboardArrowUp />
        </IconButton>
      )}
    </div>
  );
};

export default Navbar;
