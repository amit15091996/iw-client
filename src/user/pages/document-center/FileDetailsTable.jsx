import React from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileDownloadButton from './FileDownloadButton';

const FileDetailsTable = ({ fileDetails }) => {
    const handleDownload = (fileUrl) => {
        // Implement your download logic here using the fileUrl
        window.open(fileUrl, '_blank');
      };
      
  const formatDateTime = (dateTimeString) => {
    const formattedDateTime = dateTimeString.slice(0, 10); // Extracts "YYYY-MM-DD"
    const formattedTime = dateTimeString.slice(11, 16); // Extracts "HH:mm"
  
    return `${formattedDateTime} ${formattedTime}`;
  };

  return (
    <TableContainer>
      <Table style={{ backgroundColor: "#ffffff" }}>
        <TableHead>
          <TableRow style={{ backgroundColor: "#365486" }}>
            <TableCell style={{ color: "white" }}>File Details ID</TableCell>
            <TableCell style={{ color: "white" }}>Date & Time</TableCell>
            <TableCell style={{ color: "white" }}>File Type</TableCell>
            <TableCell style={{ color: "white" }}>File Description</TableCell>
            <TableCell style={{ color: "white" }}>Year</TableCell>
            <TableCell style={{ color: "white" }}>Download</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fileDetails &&
            fileDetails.map((fileDetail, index) => (
              <TableRow
                key={index}
                style={
                  index % 2 === 0
                    ? { backgroundColor: "#f5f5f5" } // Alternate row color
                    : { backgroundColor: "#ffffff" } // Default row color
                }
              >
                <TableCell>{fileDetail.fileDetailsId}</TableCell>
               <TableCell>{formatDateTime(fileDetail.fileStoredTime)}</TableCell>
                <TableCell>{fileDetail.fileType}</TableCell>
                <TableCell>{fileDetail.fileDescription}</TableCell>
                <TableCell>{fileDetail.year}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDownload(fileDetail.fileUrl)}
                    aria-label="Download"
                  >
                    <FileDownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FileDetailsTable;
