import { useState } from 'react';
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
} from '@mui/material';

const DocumentUploader = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [textData, setTextData] = useState('');
  const [fileType, setFileType] = useState('');

  const CustomInput = styled('input')({
    display: 'none',
  });

  const FileInputLabel = styled('label')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    height: '50px',
    backgroundColor: '#1976d2',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
  });

  const handleFileTypeSelect = (event) => {
    setFileType(event.target.value);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      setUploading(true);
      // Simulating upload delay for 2 seconds (Remove this in actual implementation)
      setTimeout(() => {
        const currentDate = new Date().toLocaleString(); // Get current date and time
        setUploadedDocuments([
          ...uploadedDocuments,
          {
            file: selectedFile,
            text: textData,
            fileType,
            uploadDateTime: currentDate,
          },
        ]);
        setSelectedFile(null);
        setTextData('');
        setFileType('');
        setUploading(false);
      }, 2000);
    }
  };


  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Document Uploader
      </Typography>
      <FileInputLabel htmlFor="upload-file">
        {selectedFile ? selectedFile.name : 'Select File'}
        <CustomInput id="upload-file" type="file" onChange={handleFileSelect} />
      </FileInputLabel>
      <TextField
        select
        label="File Type"
        variant="outlined"
        value={fileType}
        onChange={handleFileTypeSelect}
        style={{ marginTop: '10px', width: '50%' }}
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
        label="Text Data"
        variant="outlined"
        value={textData}
        onChange={(e) => setTextData(e.target.value)}
        style={{ marginTop: '10px', width: '50%' }}
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFileUpload}
        disabled={!selectedFile || uploading}
        style={{ marginTop: '10px' }}
      >
        {uploading ? <CircularProgress size={24} /> : 'Send'}
      </Button>
      {uploading && (
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          Uploading...
        </Typography>
      )}
      {uploadedDocuments.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>File Name</TableCell>
                <TableCell>File Type</TableCell>
                <TableCell>File Size</TableCell>
                <TableCell>Text Data</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploadedDocuments.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.file.name}</TableCell>
                  <TableCell>{item.fileType}</TableCell>
                  <TableCell>{(item.file.size / 1024).toFixed(2)} KB</TableCell>
                  <TableCell>{item.text}</TableCell>
                  <TableCell>{item.uploadDateTime.split(',')[0]}</TableCell>
                  <TableCell>{item.uploadDateTime.split(',')[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
    </Paper>
  );
};

export default DocumentUploader;
