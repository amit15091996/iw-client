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
} from "@mui/material";
import {
  getFileDetailByTransId,
  getFileDetailByUserIdAndYear,
} from "../services/AdminService";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import CustomPagination from "./user-components/CustomPagination";
import FileDetailsTable from "./document-center/FileDetailsTable";


const columns = [
  { id: "fileTransDetailsId", label: "File ID", minWidth: 100 },
  { id: "fileName", label: "file Name", minWidth: 100 },
  { id: "userId", label: "User ID", minWidth: 100 },
  { id: "year", label: "Year", minWidth: 100 },
  { id: "reportDate", label: "Report Date", minWidth: 100 },
  { id: "fileType", label: "File Type", minWidth: 100 },
];

const MyDocuments = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // State to manage current page
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [fileDetails, setFileDetails] = useState([]);

  useEffect(() => {
    // Fetch data from API when the component mounts
    async function fetchData() {
      try {
        const userId = 4; // Replace with the desired user ID
        const year = 2024; // Provide the desired year for fetching data
        const pageNo = currentPage; // Set page number based on state
        const pageSize = rowsPerPage; // Set page size based on state
        const sortBy = "reportDate"; // Set the field to sort by

        const apiData = await getFileDetailByUserIdAndYear(
          userId,
          year,
          pageNo,
          pageSize,
          sortBy
        );
        console.log("apiData - ", apiData);
        // Update state with fetched data
        if (
          apiData &&
          apiData.fileTransDetails &&
          Array.isArray(apiData.fileTransDetails.content)
        ) {
          setData(apiData.fileTransDetails.content); // Extracting 'content' array
        } else {
          console.error(
            "API response does not contain the expected 'content' array for fileTransDetails."
          );
          // Handle the situation if 'content' array is not available, setting an empty array as a fallback
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [currentPage, rowsPerPage]); // Fetch data when currentPage or rowsPerPage change

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
      if (fileDetailsResponse && Array.isArray(fileDetailsResponse.fileDetails)) {
        const fileDetails = fileDetailsResponse.fileDetails;
        console.log("Received file details:", fileDetails);
        // Update 'fileDetails' state to pass data to 'FileDetailsTable' component
        setFileDetails(fileDetails);
      } else {
        console.error("getFileDetailByTransId response does not contain the expected 'fileDetails' array.");
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
          <Box sx={{ margin: "15px 10px", padding: "10px" }}>
            <Typography variant="h5">My Documents</Typography>
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
                    <TableCell style={{ minWidth: 50 }} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <React.Fragment key={index}>
                      <TableRow key={index}>
                        {columns.map((column) => (
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
                          colSpan={columns.length + 1}
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
