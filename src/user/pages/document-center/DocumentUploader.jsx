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
  styled,
  IconButton,
  Modal,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const DocumentUploader = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [textData, setTextData] = useState('');
  const [viewDocument, setViewDocument] = useState(null);

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

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      setUploading(true);
      // Simulating upload delay for 2 seconds (Remove this in actual implementation)
      setTimeout(() => {
        setUploadedDocuments([...uploadedDocuments, { file: selectedFile, text: textData }]);
        setSelectedFile(null);
        setTextData('');
        setUploading(false);
      }, 2000);
    }
  };

  const handleViewDocument = (file) => {
    console.log('View Document:', file); // Replace this with your logic to view the document
    setViewDocument(file);
    // Perform action to view the document (e.g., open a modal or display the document content)
  };

  const handleCloseModal = () => {
    setViewDocument(null);
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
                <TableCell>File Size</TableCell>
                <TableCell>Text Data</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploadedDocuments.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.file.name}</TableCell>
                  <TableCell>{(item.file.size / 1024).toFixed(2)} KB</TableCell>
                  <TableCell>{item.text}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="view-document"
                      onClick={() => handleViewDocument(item.file)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Modal open={!!viewDocument} onClose={handleCloseModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            View Document
          </Typography>
          {viewDocument && (
            <div>
              <Typography variant="body1">File Name: {viewDocument.name}</Typography>
              <Typography variant="body2">File Size: {(viewDocument.size / 1024).toFixed(2)} KB</Typography>
              {/* Add logic to display the document here */}
            </div>
          )}
          <Button variant="contained" color="primary" onClick={handleCloseModal} style={{ marginTop: '10px' }}>
            Close
          </Button>
        </div>
      </Modal>
    </Paper>
  );
};

export default DocumentUploader;
