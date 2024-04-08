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
import Team from "./Team";

const Navbar = () => {
  const sectionRefs = useRef([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const appBarHeight = 0; // Set the height of your AppBar here
  const [showScroll, setShowScroll] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkScrollTop = () => {
    const offset =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    if (!showScroll && offset > 200) {
      setShowScroll(true);
    } else if (showScroll && offset <= 200) {
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
  }, [checkScrollTop, showScroll]);
  // Custom names for navigation tabs
  const navTabNames = [
    "HOME",
    "SERVICES",
    "CLIENTS",
    "ABOUT",
    "TEAM",
    "CONTACT",
    "LOGIN",
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

  const scrollToContact = () => {
    const contactSectionOffset =
      sectionRefs.current[5].offsetTop - appBarHeight; // Update with appropriate index
    window.scrollTo({ top: contactSectionOffset, behavior: "smooth" });
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" style={{ backgroundColor: "#fff" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* Intallysh Wisdom */}
            <img
              src="/assets/main-logo.jpg"
              alt="Logo"
              style={{ marginRight: "10px", height: "55px", marginTop: "10px" }}
            />
          </Typography>
          <Hidden smDown>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {navTabNames.map((name, index) => (
                <Typography
                  style={{ color: "#003E70", fontSize: "18px" }}
                  key={`nav-${index}`}
                  variant="body1"
                  sx={{ marginRight: 2, cursor: "pointer" }}
                  onClick={(event) => {
                    if (name === "LOGIN") {
                      event.preventDefault(); // Prevent default behavior
                      // Handle login specific action, e.g., redirect to "/login"
                      window.location.href = "/login";
                    } else {
                      scrollToSection(index);
                    }
                  }}
                >
                  {name}
                </Typography>
              ))}
            </Box>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              style={{ color: "#003E70", right:'10px'}}
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}  
            >
              <Menu sx={{ fontSize: '30px' }} />
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
              name === "LOGIN" ? (
                <ListItem
                  button
                  key={`nav-${index}`}
                  component={Link}
                  href="http://fe.intallyshwisdom.com:3399/login"
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
          <Services onContactButtonClick={scrollToContact} />
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
          backgroundColor: "#f9f9f9",
          margin: "0",
          overflow: "hidden",
        }}
      >
        <div style={{ marginTop: "70px" }}>
          <div
            className="heading"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              className="centered-text"
              style={{
                fontSize: "30px",
                color: "#003e70",

                textAlign: "center",
              }}
            >
              Our Team
            </p>
          </div>
          <div
            style={{
              color: "#3d5a80",
              fontStyle: "italic",
              fontSize: "20px",
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "800px", // Adjust the maximum width as needed
              padding: "20px", // Optional padding
            }}
          >
            "Our team embodies collaborative excellence, merging diverse skills,
            shaping innovation, achieving goals, and setting industry standards
            through collective expertise and unified vision."
          </div>

          <Team />
        </div>
      </div>
      <div
        ref={(ref) => (sectionRefs.current[5] = ref)}
        style={{
          paddingTop: "0",
          height: "auto",
          backgroundColor: "#fff",
          margin: "0",
          overflow: "hidden",
        }}
      >
        <div style={{ marginTop: "50px" }}>
          <Contact />
          <div
            className="footer"
            style={{
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontFamily: "sans-serif",
              fontSize: "15px",
              color: "#fff",
              fontWeight: 600,
              backgroundColor: "#003e70",
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
