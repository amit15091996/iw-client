import { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  TextField,
  MenuItem,
  styled,
  Box,
} from "@mui/material";
import getFileDetailByUserId, {
  uploadFileAdmin,
} from "../../services/FileService";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DocumentUploader = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [textData, setTextData] = useState("");
  const [fileType, setFileType] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTable(true);
        const apiResponse = await getFileDetailByUserId();
        console.log("API Response:", apiResponse);

        // Accessing the content array from fileTransDetails
        const contentArray = apiResponse?.fileTransDetails?.content || [];

        // Setting the last five elements from contentArray
        setUploadedDocuments(contentArray.slice(-5));
        setLoadingTable(false);
        console.log("Updated uploadedDocuments:", contentArray.slice(-5));
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingTable(false);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
    setSelectedDate(formattedDate);
  };

  const CustomInput = styled("input")({
    display: "none",
  });

  const FileInputLabel = styled("label")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "200px",
    height: "50px",
    backgroundColor: "#1976d2",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  });

  const handleFileTypeSelect = (event) => {
    setFileType(event.target.value);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (selectedFile && fileType && selectedDate && textData) {
      setUploading(true);

      try {
        const uploadedFileData = {
          file: selectedFile,
          text: textData,
          fileType: fileType,
          uploadDateTime: selectedDate,
        };

        // Simulating the API call using setTimeout
        setTimeout(async () => {
          try {
            await uploadFileAdmin(uploadedFileData);

            // Fetch the updated data after file upload
            setLoadingTable(true);
            const apiResponse = await getFileDetailByUserId();
            setUploadedDocuments(apiResponse?.fileTransDetails?.content || []);
            setLoadingTable(false);

            setSelectedFile(null);
            setTextData("");
            setFileType("");
            setSelectedDate(null);
            setUploading(false);
          } catch (error) {
            console.error("Error occurred during file upload:", error);
            setUploading(false);
            setLoadingTable(false);
          }
        }, 2000); // 2 seconds delay (2000 milliseconds)
      } catch (error) {
        console.error("Error occurred:", error);
        setUploading(false);
        setLoadingTable(false);
      }
    }
  };

  console.log("len : ", uploadedDocuments?.length);
  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}
    >
      <Typography variant="h5" gutterBottom>
        Document Uploader
      </Typography>
      <FileInputLabel htmlFor="upload-file">
        {selectedFile ? selectedFile.name : "Select File"}
        <CustomInput id="upload-file" type="file" onChange={handleFileSelect} />
      </FileInputLabel>
      <TextField
        select
        label="File Type"
        variant="outlined"
        value={fileType}
        onChange={handleFileTypeSelect}
        style={{ marginTop: "10px", width: "100%" }}
      >
        <MenuItem value="Audit Report">Audit Report</MenuItem>
        <MenuItem value="Bank Statement">Bank Statement</MenuItem>
        <MenuItem value="GST R1">GST R1</MenuItem>
        <MenuItem value="GST R3B">GST R3B</MenuItem>
        <MenuItem value="GST Certificate">GST Certificate</MenuItem>
        <MenuItem value="ITR Return">ITR Return</MenuItem>
        <MenuItem value="ITR Report">ITR Report</MenuItem>
        <MenuItem value="KYC Details">KYC Details</MenuItem>
        <MenuItem value="Sale Register">Sale Register</MenuItem>
        <MenuItem value="Purchase Register">Purchase Register</MenuItem>
        <MenuItem value="Others">Others</MenuItem>
      </TextField>
      <TextField
        label="File Name"
        variant="outlined"
        value={textData}
        onChange={(e) => setTextData(e.target.value)}
        style={{ marginTop: "10px", width: "100%" }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ marginTop: "10px", width: "100%" }}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            textField={(params) => (
              <TextField {...params} variant="outlined" fullWidth />
            )}
          />
        </div>
      </LocalizationProvider>
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFileUpload}
        disabled={!selectedFile || uploading}
        style={{ marginTop: "10px" }}
      >
        {uploading ? <CircularProgress size={24} /> : "Send"}
      </Button>
      {uploading && (
        <Typography variant="body2" style={{ marginTop: "10px" }}>
          Uploading...
        </Typography>
      )}
      {loadingTable ? (
        <Typography variant="body2" style={{ marginTop: "10px" }}>
          Loading table data...
        </Typography>
      ) : (
        uploadedDocuments?.length > 0 && (
          <Paper>
            <Box sx={{ margin: "15px 10px", padding: "10px" }}>
              <Typography variant="h5">Recent Documents</Typography>
            </Box>
            <Box sx={{ padding: "0px 10px", overflowX: "auto" }}>
              <TableContainer component={Paper}>
                <Table style={{ marginBottom: "0", border: "none" }}>
                  <TableHead style={{ backgroundColor: "#003E70" }}>
                    <TableRow>
                      <TableCell style={{ color: "white" }}>Sr.No</TableCell>
                      <TableCell style={{ color: "white" }}>
                        File Type
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        File Name
                      </TableCell>
                      <TableCell style={{ color: "white" }}>File ID</TableCell>
                      <TableCell style={{ color: "white" }}>Year</TableCell>
                      <TableCell style={{ color: "white" }}>
                        Report Date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {uploadedDocuments.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.fileType}</TableCell>
                        <TableCell>{item.fileDescription}</TableCell>
                        <TableCell>{item.fileTransDetailsId}</TableCell>
                        <TableCell>{item.year}</TableCell>
                        <TableCell>{item.reportDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        )
      )}
    </Paper>
  );
};

export default DocumentUploader;
