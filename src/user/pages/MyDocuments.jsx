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
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import CustomPagination from "./user-components/CustomPagination";
import FileDetailsTable from "./document-center/FileDetailsTable";
import { getFromLocalStorage } from "../services/Util";
import {
  getFileDetailByTransId,
  getFileDetailByUserIdAndYear,
  getUploadedFileYears,
} from "../services/AdminService";

const columns = [
  { id: "Serial Number", label: "No", minWidth: 100 },
  // { id: "fileTransDetailsId", label: "File ID", minWidth: 100 },
  { id: "year", label: "Year", minWidth: 100 },
  { id: "reportDate", label: "Report Date", minWidth: 100 },
  { id: "fileType", label: "File Type", minWidth: 100 },
  { id: "Action", label: "Action", minWidth: 50 },
];

const MyDocuments = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [fileDetails, setFileDetails] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    async function fetchYears() {
      try {
        const yearsResponse = await getUploadedFileYears();
        setAvailableYears(yearsResponse?.years);
        setSelectedYear(
          yearsResponse?.years?.length > 0 ? yearsResponse?.years[0] : ""
        );
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    }

    fetchYears();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const loggedInUserData = getFromLocalStorage("userInfo");
        const userJson = JSON.parse(loggedInUserData);
        const userId = userJson ? userJson.userId : null;

        if (!selectedYear) {
          return;
        }

        const initialApiData = await getFileDetailByUserIdAndYear(
          selectedYear,
          currentPage,
          rowsPerPage,
          "fileTransDetailsId"
        );

        console.log("API Response:", initialApiData);
        console.log("Total Results:", initialApiData.totalResults);
        console.log(
          "No of Elements:",
          initialApiData.fileTransDetails.numberOfElements
        );
        console.log("Content:", initialApiData.fileTransDetails.content);

        if (
          initialApiData &&
          initialApiData?.fileTransDetails &&
          Array.isArray(initialApiData?.fileTransDetails.content)
        ) {
          setData(initialApiData?.fileTransDetails.content);
        } else {
          console.error(
            "API response does not contain the expected 'content' array for fileTransDetails."
          );
          setData([]);
        }

        const transId = initialApiData?.fileTransDetails.content[0]?.transId;
        setTotalElements(initialApiData.fileTransDetails.totalElements || 0);
        const fileDetailsResponse = await getFileDetailByTransId(transId);

        if (
          fileDetailsResponse &&
          Array.isArray(fileDetailsResponse?.fileDetails)
        ) {
          const fileDetails = fileDetailsResponse?.fileDetails;
          console.log("Received file details:", fileDetails);
          setFileDetails(fileDetails);
        } else {
          console.error(
            "getFileDetailByTransId response does not contain the expected 'fileDetails' array."
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [currentPage, rowsPerPage, selectedYear]);

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
    setCurrentPage(0);
  };

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  const [openRowId, setOpenRowId] = useState(null);

  const handleRowClick = async (rowId) => {
    setOpenRowId(openRowId === rowId ? null : rowId);

    try {
      const clickedRowData = data[rowId];
      const transId = clickedRowData.transId;

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
  };

  return (
    <Grid container spacing={2}>
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
            <Typography variant="h5" style={{color:'#003E70'}}>My Documents</Typography>
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
                            style={{backgroundColor:'#003E70', color: 'white'}}
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
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <CustomPagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalElements / rowsPerPage)}
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
