import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CodeIcon from '@mui/icons-material/Code';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function Services() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#003E70',
              width: '100%',
              height: 100,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <CodeIcon sx={{ color: 'white', fontSize: 40 }} />
          </Box>
          <CardHeader
            title="Development" // Adding the title here
            titleTypographyProps={{ variant: 'h6' }}
            sx={{
              backgroundColor: '#f5f5f5',
              textAlign: 'center',
              paddingTop: 6,
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            One of our core strengths lies in our investment in software
            development. We develop and deliver high-quality products in
            accordance with specifications.
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: 2,
          }}
        >
          <Button variant="outlined" onClick={handleOpenModal}>
            Learn More
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            More Options
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Add your additional options here...
          </Typography>
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </>
  );
}
