import { Grid, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./contact.css";

const Contact = () => {
  return (
    <div className="page-container">
      <div className="content">
        <p className="centered-text">Contact Us</p>
        <p className="contact-detail">
          We will respond to your message as soon as possible. Please find the
          contact details, send us an email or click on the WhatsApp icon.
        </p>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          style={{ marginTop: "1rem" }}
        >
          <Grid item xs={12} sm={8}>
            {/* Google Map */}
            <div className="map-responsive">
              <iframe
                title="google map"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3725.6667265364435!2d81.86094117525488!3d20.965894880667783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDU3JzU3LjIiTiA4McKwNTEnNDguNyJF!5e0!3m2!1sen!2sus!4v1693738168598!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* Contact Details */}
            <div className="contact-details">
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                style={{ color: "#003E70", fontStyle: "serif" }}
              >
                Contact Info
              </Typography>
              <div className="contact-info">
                <Typography
                  variant="h6"
                  display="flex"
                  alignItems="center"
                  style={{ color: "#003E70" }}
                >
                  <LocationOnIcon style={{ marginRight: "8px" }} />
                  Address
                </Typography>
                <Typography variant="body2" style={{ color: "#0077b6" }}>
                  Ganj Road, Near Shri Ram Janki Mandir, Ward No 16, Gobra
                  Nawapara, Raipur C.G. 493881
                </Typography>
              </div>
              <div className="contact-info">
                <Typography
                  variant="h6"
                  display="flex"
                  alignItems="center"
                  style={{ color: "#003E70" }}
                >
                  <CallIcon style={{ marginRight: "8px" }} />
                  Phone
                </Typography>
                <Typography variant="body2" style={{ color: "#0077b6" }}>
                  +91 7000186765
                </Typography>
              </div>
              <div className="contact-info">
                <Typography
                  variant="h6"
                  display="flex"
                  alignItems="center"
                  style={{ color: "#003E70" }}
                >
                  <EmailIcon style={{ marginRight: "8px" }} />
                  Email
                </Typography>
                <Typography variant="body2" style={{ color: "#0077b6" }}>
                  intallyshwisdom@gmail.com
                </Typography>
              </div>
              <Typography
                variant="h5"
                align="center"
                style={{ color: "#003E70" }}
              >
                Get social with us
              </Typography>
              <div className="social-icons">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="facebook-icon"
                >
                  <FacebookIcon
                    style={{
                      fontSize: 35,
                      color: "#1877F2",
                      marginLeft: 45,
                      marginRight: 20,
                    }}
                  />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-icon"
                >
                  <LinkedInIcon
                    style={{ fontSize: 35, color: "#0A66C2", marginRight: 20 }}
                  />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram-icon"
                >
                  <InstagramIcon
                    style={{ fontSize: 35, color: "#E4405F", marginRight: 20 }}
                  />
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-icon"
                >
                  <WhatsAppIcon style={{ fontSize: 35, color: "#25D366" }} />
                </a>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Contact;
