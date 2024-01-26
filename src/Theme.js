import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#fff',
          boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
          // boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#fff', // Set the background color for the Card
          boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px', // Apply the box shadow
          // boxShadow: 'none', // You can uncomment this line to remove the box shadow
        },
      },
    },
  },
});
