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
  uploadFileFromAdminToUser,
} from "../../services/FileService";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import dayjs from "dayjs";
import { getAllUsers, getAllUsersForDoc } from "../../services/AdminService";
import { isAdmin } from "../../services/Util";

const DocumentUploader = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [textData, setTextData] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileTypeUserId, setFileTypeUserId] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [userIds, setUserIds] = useState([]);

  console.log(userIds);

  const fetchData = async () => {
    try {
      const allUsers = await getAllUsersForDoc();
      if (allUsers) {
        setUserIds(allUsers?.usersList ? allUsers?.usersList : []);
      }

      console.log("obj ", allUsers);
      if (Array.isArray(allUsers?.usersList)) {
        const userIdRes = await allUsers?.usersList.map((user) => user.userId);
        console.log("userIdRes: ", userIdRes);

        // Assuming setUserIds is an asynchronous function (e.g., a state update in React)
        // setUserIds(() => userIdRes || []);

        // Note: setUserIds might not have updated the state immediately
        console.log("ALL USERS: ", userIds);
      } else {
        console.error("Error fetching data: Invalid data format");
      }
      // console.log("ALL USERS : ", userIds);

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
    setSelectedDate(formattedDate);
  };

  const CustomInput = styled("input")({
    display: "none",
  });

  const handleFileTypeSelect = (event) => {
    setFileType(event.target.value);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleFileUpload = async (e, admin) => {
    e.preventDefault();

    if (admin) {
      console.log(admin);
      if (selectedFile && fileType && selectedDate && textData) {
        setUploading(true);

        try {
          const uploadedFileData = {
            file: selectedFile,
            text: textData,
            fileType: fileType,
            uploadDateTime: selectedDate,
          };

          // Upload the file
          await uploadFileFromAdminToUser(uploadedFileData, fileTypeUserId);
          console.log("File uploaded successfully");

          // Fetch the updated data after file upload
          setLoadingTable(true);
          try {
            const apiResponse = await getFileDetailByUserId();
            console.log("API Response after upload:", apiResponse);
            setUploadedDocuments(apiResponse?.fileTransDetails?.content || []);
          } catch (fetchError) {
            console.error(
              "Error fetching updated data after upload:",
              fetchError
            );
          } finally {
            setLoadingTable(false);
          }

          // Reset form fields and loading state
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
      }
    } else {
      if (selectedFile && fileType && selectedDate && textData) {
        setUploading(true);

        try {
          const uploadedFileData = {
            file: selectedFile,
            text: textData,
            fileType: fileType,
            uploadDateTime: selectedDate,
          };

          // Upload the file
          await uploadFileAdmin(uploadedFileData);
          console.log("File uploaded successfully");

          // Fetch the updated data after file upload
          setLoadingTable(true);
          try {
            const apiResponse = await getFileDetailByUserId();
            console.log("API Response after upload:", apiResponse);
            setUploadedDocuments(apiResponse?.fileTransDetails?.content || []);
          } catch (fetchError) {
            console.error(
              "Error fetching updated data after upload:",
              fetchError
            );
          } finally {
            setLoadingTable(false);
          }

          // Reset form fields and loading state
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
      }
    }
  };
  const FileInputLabel = styled("label")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "80px",
    border: "2px dashed #1976d2",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "border 0.3s ease",
    "&:hover": {
      border: "2px dashed #1565c0",
    },
    "&:active": {
      border: "2px dashed #1565c0",
    },
  });

  const UploadIcon = styled(CloudUploadIcon)({
    fontSize: "48px",
    marginBottom: "8px",
    color: "#003E70",
  });

  const FileInputText = styled(Typography)({
    color: "#003E70",
  });

  console.log("len : ", uploadedDocuments?.length);
  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}
    >
      <Typography variant="h5" gutterBottom style={{ color: "#003E70" }}>
        Send Your Documents
      </Typography>
      <FileInputLabel htmlFor="upload-file">
        <UploadIcon />
        <FileInputText>
          {selectedFile ? selectedFile.name : "Click to Upload File"}
        </FileInputText>
        <CustomInput id="upload-file" type="file" multiple onChange={handleFileSelect} />
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
        <div
          style={{
            marginTop: "10px",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              textField={(params) => (
                <TextField {...params} variant="outlined" fullWidth />
              )}
            />
          </div>
          {isAdmin() && (
            <div style={{ flex: 1 }}>
              <TextField
                select
                label="User ID & User Name"
                variant="outlined"
                value={fileTypeUserId}
                onChange={(e) => setFileTypeUserId(e.target.value)}
                style={{ width: "100%" }}
              >
                {userIds?.map((item) => {
                  return (
                    <MenuItem
                      id={item?.userId}
                      key={item?.userId}
                      value={item?.userId}
                    >{`${item?.userId} [${item?.name}]`}</MenuItem>
                  );
                })}
              </TextField>
            </div>
          )}
          <div
            style={{
              marginLeft: "10px",
              color: "red",
              fontWeight: "600",
              fontFamily: "sans-serif",
            }}
          >
            <span>
              Note : Please fill all the details before sending the file.
            </span>
          </div>
        </div>
      </LocalizationProvider>

      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          handleFileUpload(e);
        }}
        disabled={!selectedFile || uploading}
        style={{
          marginTop: "10px",
          backgroundColor: !selectedFile
            ? "gray" // Specify the background color when no file is selected
            : uploading
            ? "#003E70" // Specify the background color during uploading
            : "#003E70", // Specify the background color for the normal state
          color: "white", // Specify the text color
          opacity: uploading || !selectedFile ? 0.7 : 1, // Adjust opacity for disabled state if needed
          cursor: !selectedFile ? "not-allowed" : "pointer", // Set cursor to "not-allowed" when no file is selected
        }}
      >
        {uploading ? <CircularProgress size={24} /> : "Send"}
      </Button>
      {isAdmin() && (
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            handleFileUpload(e, "admin");
          }}
          style={{
            marginTop: "10px",
            marginLeft: "10px",
          }}
        >
          {uploading ? <CircularProgress size={24} /> : "Send To User"}
        </Button>
      )}
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
                      {/* <TableCell style={{ color: "white" }}>File ID</TableCell> */}
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
                        {/* <TableCell>{item.fileTransDetailsId}</TableCell> */}
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