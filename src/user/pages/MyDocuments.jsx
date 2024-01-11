import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Collapse,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  getFileDetailByTransId,
  getFileDetailByUserIdAndYear,
  getUploadedFileYears,
} from "../services/AdminService";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import CustomPagination from "./user-components/CustomPagination";
import FileDetailsTable from "./document-center/FileDetailsTable";

const columns = [
  { id: "Serial Number", label: "No", minWidth: 100 },
  { id: "fileTransDetailsId", label: "File ID", minWidth: 100 },
  // { id: "fileName", label: "file Name", minWidth: 100 },
  // { id: "userId", label: "User ID", minWidth: 100 },
  { id: "year", label: "Year", minWidth: 100 },
  { id: "reportDate", label: "Report Date", minWidth: 100 },
  { id: "fileType", label: "File Type", minWidth: 100 },
  { id: "Action", label: "Action", minWidth: 50 },
];

const MyDocuments = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // State to manage current page
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [fileDetails, setFileDetails] = useState([]);
  const [selectedYear, setSelectedYear] = useState(""); // State to hold the selected year
  const [availableYears, setAvailableYears] = useState([]); // State to hold the available years

  useEffect(() => {
    async function fetchYears() {
      try {
        const yearsResponse = await getUploadedFileYears(); // Replace with the actual user ID
        console.log("Available Years:", yearsResponse.years);
        setAvailableYears(yearsResponse.years);
        // Set the default selected year to the first year in the list
        setSelectedYear(yearsResponse.years[0]);
      } catch (error) {
        console.error("Error fetching years:", error);
        // Handle error as needed
      }
    }

    fetchYears();
  }, []);

  useEffect(() => {
    // Fetch data from API when the component mounts
    async function fetchData() {
      try {
        // Replace with the actual API call to get the initial data
        const initialApiData = await getFileDetailByUserIdAndYear(
          /* Dynamically extract userId and year from the API response */
          4, // Example userId
          selectedYear,
          currentPage,
          rowsPerPage,
          "reportDate"
        );

        console.log("Initial API Data - ", initialApiData);

        // Update state with fetched data
        if (
          initialApiData &&
          initialApiData.fileTransDetails &&
          Array.isArray(initialApiData.fileTransDetails.content)
        ) {
          setData(initialApiData.fileTransDetails.content);
        } else {
          console.error(
            "API response does not contain the expected 'content' array for fileTransDetails."
          );
          setData([]);
        }

        // Extract transId from the first item in the content array
        const transId = initialApiData.fileTransDetails.content[0].transId;

        // Fetch file details based on transId
        const fileDetailsResponse = await getFileDetailByTransId(transId);
        console.log("File details by transaction ID:", fileDetailsResponse);

        // Check if the response contains 'fileDetails' array
        if (
          fileDetailsResponse &&
          Array.isArray(fileDetailsResponse.fileDetails)
        ) {
          const fileDetails = fileDetailsResponse.fileDetails;
          console.log("Received file details:", fileDetails);
          // Update 'fileDetails' state to pass data to 'FileDetailsTable' component
          setFileDetails(fileDetails);
        } else {
          console.error(
            "getFileDetailByTransId response does not contain the expected 'fileDetails' array."
          );
          // Handle the situation when 'fileDetails' array is not available as expected
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call fetchData directly
  }, [currentPage, rowsPerPage, selectedYear]);

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
    setCurrentPage(0); // Reset currentPage when the year changes
  };

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0); // Reset currentPage to 0 when rowsPerPage changes
  };

  const [openRowId, setOpenRowId] = useState(null); // State to manage open/collapsed rows

  const handleRowClick = async (rowId) => {
    setOpenRowId(openRowId === rowId ? null : rowId);

    try {
      const clickedRowData = data[rowId]; // Assuming data is an array of objects
      const transId = clickedRowData.transId; // Extracting transId from clicked row data

      const fileDetailsResponse = await getFileDetailByTransId(transId);
      console.log("File details by transaction ID:", fileDetailsResponse);

      // Check if the response contains 'fileDetails' array
      if (
        fileDetailsResponse &&
        Array.isArray(fileDetailsResponse.fileDetails)
      ) {
        const fileDetails = fileDetailsResponse.fileDetails;
        console.log("Received file details:", fileDetails);
        // Update 'fileDetails' state to pass data to 'FileDetailsTable' component
        setFileDetails(fileDetails);
      } else {
        console.error(
          "getFileDetailByTransId response does not contain the expected 'fileDetails' array."
        );
        // Handle the situation when 'fileDetails' array is not available as expected
      }
    } catch (error) {
      console.error("Error fetching file details by transaction ID:", error);
      // Implement error handling as needed
    }
  };

  return (
    <Grid container spacing={2}>
      {/* First Column */}
      <Grid item xs={12} sm={12}>
        <Paper
          sx={{ width: { xs: "400px", sm: "600px", md: "800px", lg: "100%" } }}
        >
          <Box
            sx={{
              margin: "10px",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">My Documents</Typography>
            {/* Styled Select component */}
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="select-year-label">Year</InputLabel>
              <Select
                labelId="select-year-label"
                id="select-year"
                value={selectedYear}
                onChange={handleYearChange}
                label="Year"
              >
                {availableYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ padding: "0px 10px", overflowX: "auto" }}>
            <TableContainer>
              <Table>
                <TableHead style={{ background: "#003E70" }}>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{
                          minWidth: column.minWidth,
                          color: "white",
                          fontSize: "15px",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <React.Fragment key={index}>
                      <TableRow key={index}>
                        <TableCell>
                          {currentPage * rowsPerPage + index + 1}
                        </TableCell>
                        {columns.slice(1, -1).map((column) => (
                          <TableCell key={column.id}>
                            {row[column.id]}
                          </TableCell>
                        ))}
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleRowClick(index)}
                          >
                            {openRowId === index ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      {/* Collapsible row */}
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={columns.length}
                        >
                          <Collapse
                            in={openRowId === index}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box sx={{ margin: 1 }}>
                              {/* Displaying table with fileDetails */}
                              <FileDetailsTable fileDetails={fileDetails} />
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <CustomPagination
              currentPage={currentPage}
              totalPages={Math.ceil(data.length / rowsPerPage)}
              handlePageChange={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={rowsPerPage}
            />
            <br />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MyDocuments;
