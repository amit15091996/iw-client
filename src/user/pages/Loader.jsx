import { Backdrop, CircularProgress } from "@mui/material";

const Loader = ({ open }) => {
  return (
    <Backdrop open={open} style={{ zIndex: 9999, color:'cyan' }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
