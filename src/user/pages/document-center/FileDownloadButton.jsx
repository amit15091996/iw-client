import React from "react";
import { getFile } from "../../services/AdminService";

const FileDownloadButton = ({ fileUrl }) => {
  const extractFilenameFromUrl = (url) => {
    const parts = url.split("=");
    return parts[parts.length - 1];
  };

  const handleDownload = () => {
    getFile(fileUrl)
      .then((downloadResponse) => {
        if (downloadResponse.success) {
          console.log("File downloaded successfully");
        } else {
          console.error("Error downloading file:", downloadResponse.error);
        }
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  return (
    <button onClick={handleDownload}>
      Download File
    </button>
  );
};

export default FileDownloadButton;
