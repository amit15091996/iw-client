import { useState } from "react";
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
  Grid,
  Box,
} from "@mui/material";
import { uploadFileAdmin } from "../../services/FileService";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DocumentUploader = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [textData, setTextData] = useState("");
  const [fileType, setFileType] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // New state for date

  const handleDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
    console.log(formattedDate); // Output the formatted date for debugging

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
        console.log("--- ", selectedDate);
        // const currentDate = selectedDate.toISOString().slice(0, 10); // Get current date
        const uploadedFileData = {
          file: selectedFile,
          text: textData,
          fileType: fileType,
          uploadDateTime: selectedDate,
        };

        // Adding a 2-second delay using setTimeout
        setTimeout(async () => {
          try {
            await uploadFileAdmin(uploadedFileData);

            setUploadedDocuments([
              ...uploadedDocuments,
              {
                ...uploadedFileData,
              },
            ]);
            setSelectedFile(null);
            setTextData("");
            setFileType("");
            setSelectedDate(null);
            setUploading(false);
          } catch (error) {
            console.error("Error occurred during file upload:", error);
            setUploading(false);
            // Handle error state or display error message to the user
          }
        }, 2000); // 2 seconds delay (2000 milliseconds)
      } catch (error) {
        console.error("Error occurred:", error);
        setUploading(false);
        // Handle error state or display error message to the user
      }
    }
  };

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
        style={{ marginTop: "10px", width: "100%" }} // Adjusted width for mobile view
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
        {/* Add more file type options here as needed */}
      </TextField>
      <TextField
        label="File Name"
        variant="outlined"
        value={textData}
        onChange={(e) => setTextData(e.target.value)}
        style={{ marginTop: "10px", width: "100%" }} // Adjusted width for mobile view
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ marginTop: "10px", width: "100%" }}>
          <DatePicker
            //  format="DD-MM-YYYY"
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
      {uploadedDocuments.length > 0 && (
        <Grid container spacing={2}>
          {/* First Column */}
          {/* <Grid item xs={12} sm={12}> */}
            <Paper
              sx={{
                width: { xs: "400px", sm: "600px", md: "800px", lg: "100%" },
              }}
            >
              <Box sx={{ margin: "15px 10px", padding: "10px" }}>
                <Typography variant="h5">Intervies Attended</Typography>
              </Box>
              <Box sx={{ padding: "0px 10px", overflowX: "auto" }}>
                <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ minWidth: 100 }}>File Name</TableCell>
                        <TableCell>File Type</TableCell>
                        <TableCell>Text Data</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Report Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {uploadedDocuments.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.file.name}</TableCell>
                          <TableCell>{item.fileType}</TableCell>
                          <TableCell>{item.text}</TableCell>
                          <TableCell>
                            {item.uploadDateTime.split(",")[0]}
                          </TableCell>
                          <TableCell>
                            {item.uploadDateTime.split(",")[1]}
                          </TableCell>
                          <TableCell>{item.uploadDateTime}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Paper>
          {/* </Grid> */}
        </Grid>
      )}
    </Paper>
  );
};
export default DocumentUploader;
