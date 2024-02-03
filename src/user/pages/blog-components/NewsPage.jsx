import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { isAdmin } from "../../services/Util";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  updateBlog,
} from "../../services/BlogService";
import CustomPagination from "../user-components/CustomPagination";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../Loader";

const cardStyle = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const cardContentStyle = {
  flexGrow: 1,
};

const scrollableContentStyle = {
  maxHeight: 200,
  overflowY: "auto",
  padding: "10px", // Adjust padding as needed
};

const NewsPage = () => {
  const [open, setOpen] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [cardTitle, setCardTitle] = useState("");
  const [cardContent, setCardContent] = useState("");
  const [cardImage, setCardImage] = useState(null);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Loading state:", loading);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [loading]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.includes("image/") && file.size <= 5000000) {
      setCardImage(file);
    } else {
      console.error("Invalid file format or size");
    }
  };

  const handlePostNews = async (e) => {
    e.preventDefault();

    if (cardTitle && cardContent && cardImage) {
      const val = {
        blogTitle: cardTitle,
        blogDesc1: cardContent,
        blogImage: cardImage,
      };

      try {
        setLoading(true);

        const newPost = await createBlog(val);

        if (newPost && newPost.result) {
          setNewsList([...newsList, newPost.result]);
          setCardTitle("");
          setCardContent("");
          setCardImage(null);
          setOpen(false);
          setForceUpdate((prev) => prev + 1); // Increment forceUpdate to trigger re-render
          Swal.fire({
            icon: "success",
            title: "Post Successful",
            text: "Your post has been created successfully!",
          });
        } else {
          console.error("Error: Invalid response structure from createBlog");
        }
      } catch (error) {
        console.error("Error posting news:", error);
        Swal.fire({
          icon: "error",
          title: "Post Failed",
          text: "There was an error while creating your post. Please try again.",
        });
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    console.log("News List after API call:", newsList);
  }, [newsList]);

  const handleEdit = (blogId) => {
    // Find the selected blog from the newsList
    const selectedBlog = newsList.find((blog) => blog.blogId === blogId);
    if (selectedBlog) {
      setCardTitle(selectedBlog.blogTitle);
      setCardContent(selectedBlog.blogDesc1);

      // Check if the selectedBlog has image data
      if (selectedBlog.fileDetails && selectedBlog.fileDetails.fileData) {
        setCardImage({
          name: "Existing Image", // Set a default name or use any relevant information
          fileData: selectedBlog.fileDetails.fileData,
          fileType: selectedBlog.fileDetails.fileType,
        });
      } else {
        setCardImage(null);
      }

      setSelectedBlogId(blogId);
      handleOpen();
    }
  };
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteConfirmationBlogId, setDeleteConfirmationBlogId] =
    useState(null);

  const handleOpenDeleteConfirmation = (blogId) => {
    setDeleteConfirmationBlogId(blogId);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationBlogId(null);
    setDeleteConfirmationOpen(false);
  };
  const handleDelete = async (blogId) => {
    // Show a confirmation dialog before deleting
    handleOpenDeleteConfirmation(blogId);
  };
  const handleConfirmDelete = async () => {
    if (deleteConfirmationBlogId) {
      try {
        await deleteBlog(deleteConfirmationBlogId);
        const updatedNewsList = newsList.filter(
          (blog) => blog.blogId !== deleteConfirmationBlogId
        );
        setNewsList(updatedNewsList);
        handleCloseDeleteConfirmation();
        Swal.fire({
          icon: "success",
          title: "Delete Successful",
          text: "Your post has been deleted successfully!",
        });

        // Fetch the first page of blogs again to update the list
        handlePageChange(0);
      } catch (error) {
        console.error("Error deleting blog:", error);
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: "There was an error while deleting your post. Please try again.",
        });
      }
    }
  };

  const handleUpdate = async () => {
    if (selectedBlogId && cardTitle && cardContent) {
      const updatedBlogData = {
        blogId: selectedBlogId,
        blogTitle: cardTitle,
        blogDesc1: cardContent,
        blogImage: cardImage, // Ensure cardImage is a File object
      };

      try {
        setLoading(true);

        // Call the updateBlog function
        const updatedBlog = await updateBlog(updatedBlogData);

        // Update the newsList with the edited blog
        const updatedNewsList = newsList.map((blog) =>
          blog.blogId === updatedBlog.blogId ? updatedBlog : blog
        );

        setNewsList(updatedNewsList);
        setCardTitle("");
        setCardContent("");
        setCardImage(null);
        setSelectedBlogId(null);
        handleClose();
        Swal.fire({
          icon: "success",
          title: "Update Successful",
          text: "Your post has been updated successfully!",
        });
      } catch (error) {
        console.error("Error updating blog:", error);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "There was an error while updating your post. Please try again.",
        });
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
  };

  const handlePageChange = async (newPage) => {
    console.log("newPage:", newPage);

    try {
      setLoading(true); // Set loading to true
      const result = await getBlogs("NOT_DELETED", newPage, 9);
      console.log("Result from backend:", result);

      setNewsList(result.blogList);
      setCurrentPage(newPage);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    const fetchBlogs = async (newPage) => {
      try {
        const result = await getBlogs("NOT_DELETED", newPage, 9);
        setNewsList(result.blogList);
        setCurrentPage(result.currentPage);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        // Introduce a 1-second delay before setting loading to false
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchBlogs(currentPage);
  }, [currentPage, forceUpdate]); // Include forceUpdate in the dependency array

  return (
    <Container>
      {isAdmin() && (
        <Button
          onClick={handleOpen}
          style={{ marginRight: 10, float: "right", color: 'white', backgroundColor: '#003E70' }}
        >
          Add Post
        </Button>
      )}
      <Typography variant="h4" style={{ color: "#003E70" }}>
        I W News
      </Typography>
      <br />
      {loading && <Loader open={loading} />}
      <Grid container spacing={3}>
        {newsList &&
          newsList.length > 0 &&
          newsList.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item?.blogId}>
              <Card key={item?.blogId} style={cardStyle}>
                {item && item.fileDetails && item.fileDetails.fileData && (
                  <CardMedia
                    style={{
                      objectFit: "cover",
                      objectPosition: "top",
                      height: "200px",
                    }}
                    component="img"
                    image={`data:image/${item?.fileDetails?.fileType};base64,${item?.fileDetails?.fileData}`}
                    alt={item.blogTitle}
                    onError={(e) => {
                      e.target.src =
                        "https://www.pexels.com/photo/close-up-shot-of-keyboard-buttons-2882552/"; // Replace this URL with the correct fallback image URL
                    }}
                  />
                )}
                <CardContent style={cardContentStyle}>
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ color: "#003E70", fontFamily: "sans-serif" }}
                  >
                    {item?.blogTitle}
                  </Typography>
                  <div style={scrollableContentStyle}>
                    <Typography
                      style={{
                        backgroundColor: "#f1faee",
                        color: "#343a40",
                        fontFamily: "sans-serif",
                        textAlign: "justify",
                      }}
                    >
                      {item?.blogDesc1}
                    </Typography>
                  </div>
                </CardContent>
                {isAdmin() && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "auto",
                    }}
                  >
                    {/* Edit Icon */}
                    <IconButton
                      onClick={() => handleEdit(item?.blogId)}
                      style={{ color: "#003E70" }}
                    >
                      <EditIcon />
                    </IconButton>
                    {/* Delete Icon */}
                    <IconButton
                      onClick={() => handleDelete(item?.blogId)}
                      style={{ color: "#e53935" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )}
              </Card>
            </Grid>
          ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Post</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter post details:</DialogContentText>
          <label
            htmlFor="fileInput"
            style={{
              cursor: "pointer",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
              display: "block",
            }}
          >
            {cardImage ? `Selected: ${cardImage.name}` : "Choose an Image"}
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />

          <TextField
            margin="dense"
            label="Card Title"
            fullWidth
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Card Content"
            fullWidth
            multiline
            rows={4}
            value={cardContent}
            onChange={(e) => setCardContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ backgroundColor: "#ef233c", color: "white" }}
          >
            Cancel
          </Button>
          <Button
            onClick={selectedBlogId ? handleUpdate : handlePostNews}
            style={{
              backgroundColor: selectedBlogId ? "#003E70" : "#003E70",
              color: "white",
            }}
          >
            {selectedBlogId ? "Update" : "Post"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteConfirmation}
            style={{ backgroundColor: "#003E70", color: "white" }}
          >
            No
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="secondary"
            style={{ backgroundColor: "#ef233c", color: "white" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <br />
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </Container>
  );
};

export default NewsPage;
