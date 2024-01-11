import { useState } from "react";
import MyDocuments from "./MyDocuments";
import { TextField, Button, Grid, Container } from "@mui/material";

const AllDocuments = () => {
  const [userId, setUserId] = useState("");
  const [searchYear, setSearchYear] = useState("");

  const handleSearch = () => {};

  return (
    <Container maxWidth="lg">
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="User ID"
            variant="outlined"
            fullWidth
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Year"
            variant="outlined"
            fullWidth
            value={searchYear}
            onChange={(e) => setSearchYear(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
        <Grid item xs={12}>
          <MyDocuments userId={userId} searchYear={searchYear} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AllDocuments;
