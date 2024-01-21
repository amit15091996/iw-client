import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Collapse,
  IconButton,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  getAllFileDetail,
  getFileDetailByTransId,
  getFileDetailByUserIdAndYear,
} from "../services/FileService";
import FileDetailsTable from "./document-center/FileDetailsTable";
import CustomPagination from "./user-components/CustomPagination";
import Loader from "./Loader";

const columns = [
  { id: "Serial Number", label: "No", minWidth: 100 },
  { id: "fileTransDetailsId", label: "File ID", minWidth: 100 },
  { id: "userId", label: "User ID", minWidth: 100 },
  { id: "fileType", label: "File Type", minWidth: 100 },
  { id: "fileDescription", label: "File Name", minWidth: 100 },
  { id: "reportDate", label: "Report Date", minWidth: 100 },
  { id: "year", label: "Year", minWidth: 100 },
  { id: "Action", label: "Action", minWidth: 50 },
];

const AllDocuments = () => {
  const [fileTransDetails, setFileTransDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [fileDetails, setFileDetails] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [year, setYear] = useState('');



  const fetchData = async () => {
    try {
      setLoading(true);

      console.log("Current Page : ", currentPage);
      console.log("Rows Per Page : ", rowsPerPage);
      const response = await getAllFileDetail(currentPage, rowsPerPage);
      console.log("fileTransDetails:", response.fileTransDetails);

      setFileTransDetails(response.fileTransDetails);

      // Update totalPages based on the totalElements received from the API
      setTotalPages(
        Math.ceil(response.fileTransDetails.totalElements / rowsPerPage)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      //  delay of 0.5 seconds
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, rowsPerPage]);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(0);
  };

  const handleRowClick = async (rowId) => {
    console.log("handleRowClick triggered");
    setOpenRowId(openRowId === rowId ? null : rowId);

    if (fileTransDetails && openRowId !== rowId) {
      try {
        const clickedRowData = fileTransDetails?.content[rowId];
        const transId = clickedRowData?.transId;
        const fileDetailsResponse = await getFileDetailByTransId(transId);
        console.log("File details by transaction ID:", fileDetailsResponse);
        if (
          fileDetailsResponse &&
          Array.isArray(fileDetailsResponse.fileDetails)
        ) {
          const fileDetails = fileDetailsResponse.fileDetails;
          console.log("Received file details:", fileDetails);
          setFileDetails(fileDetails);
        } else {
          console.error(
            "getFileDetailByTransId response does not contain the expected 'fileDetails' array."
          );
        }
      } catch (error) {
        console.error("Error fetching file details by transaction ID:", error);
      }
    }
  };



  const handleSearch = async () => {
    try {
      setLoading(true);
  
      const response = await getFileDetailByUserIdAndYear(
        userId,
        year,
        0,  // Reset currentPage to 0 after search
        rowsPerPage
      );
  
      console.log("getFileDetailByUserIdAndYear : ", response);
  
      if (response && response.fileTransDetails) {
        setFileTransDetails((prevData) => ({
          ...prevData,
          content: response.fileTransDetails.content,
        }));
  
        // Update totalPages based on the totalElements received from the API
        setTotalPages(
          Math.ceil(response.fileTransDetails.totalElements / rowsPerPage)
        );
      } else if (response && response.totalResults > 0) {
        setFileTransDetails({
          content: response.fileTransDetails.content,
          totalElements: response.totalResults,
        });
  
        // Update totalPages based on the totalResults received from the API
        setTotalPages(Math.ceil(response.totalResults / rowsPerPage));
      } else {
        console.error("API response is missing expected 'fileTransDetails'.");
      }
    } catch (error) {
      console.error("Error searching data:", error);
    } finally {
      // delay of 0.5 seconds
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  


  return (
    <>
      {loading && <Loader open={loading} />}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Paper
            sx={{
              width: { xs: "400px", sm: "600px", md: "800px", lg: "100%" },
            }}
          >
            <Box
              sx={{
                margin: "10px",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">All User Documents</Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  label="User ID"
                  variant="outlined"
                  size="small"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  style={{ marginRight: "10px" }}
                />
                <TextField
                  label="Year"
                  variant="outlined"
                  size="small"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  style={{ marginRight: "10px" }}
                />
                <Button variant="contained" onClick={handleSearch}>
                  Search
                </Button>
              </Box>
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
                    {fileTransDetails?.content && fileTransDetails.content.length > 0 ? (
                      // Render table rows if data is available
                      fileTransDetails.content.map((detail, index) => (
                        <React.Fragment key={detail.fileTransDetailsId}>
                          <TableRow>
                            <TableCell>
                              {currentPage * rowsPerPage + index + 1}
                            </TableCell>
                            {columns.slice(1, -1).map((column) => (
                              <TableCell key={column.id}>
                                {detail[column.id]}
                              </TableCell>
                            ))}
                            <TableCell>
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => handleRowClick(index)}
                                style={{ color: '#003E70' }}
                              >
                                {openRowId === index ? (
                                  <KeyboardArrowUp />
                                ) : (
                                  <KeyboardArrowDown />
                                )}
                              </IconButton>
                            </TableCell>
                          </TableRow>
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
                                  <FileDetailsTable fileDetails={fileDetails} />
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))
                    ) : (
                      // Render a single row with a message if no data is available
                      <TableRow>
                        <TableCell colSpan={columns.length} align="center">
                          {loading ? (
                            'Loading...'
                          ) : (
                            <span style={{ color: 'red' }}>Data not available</span>
                          )}
                        </TableCell>
                      </TableRow>


                    )}
                  </TableBody>

                </Table>
              </TableContainer>
              <br />
              {fileTransDetails?.content && fileTransDetails.content.length > 0 ? (
                // Render CustomPagination if data is available
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  rowsPerPage={rowsPerPage}
                />
              ) : (
                // Render a disabled CustomPagination if no data is available
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  rowsPerPage={rowsPerPage}
                  disabled
                />
              )}
              <br />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AllDocuments;
