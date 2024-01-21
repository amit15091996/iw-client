import { IconButton } from "@mui/material";
import { getFile } from "../../services/AdminService";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const FileDownloadButton = ({ fileId ,fileName}) => {
  const handleDownload = () => {
    getFile(fileId,fileName)
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
    <IconButton onClick={handleDownload} aria-label="Download" style={{color:'#003E70'}}>
      <FileDownloadIcon />
    </IconButton>
  );
};
export default FileDownloadButton;