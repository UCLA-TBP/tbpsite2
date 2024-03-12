import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  CircularProgress,
  Snackbar,
  Grid,
  Typography,
} from '@mui/material';

const HEADSHOT_LINK =
	"https://res.cloudinary.com/dp7hitkpy/image/upload/f_auto,q_auto/v1/Headshots/bvls0rg0ttfb9bzb7nhi";

function UploadHeadshot({ candidate, setCandidate }) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loadingImage, setLoadingImage] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    setShowSnackbar(false);
  };

  function handleUpload(event) {
    setLoadingImage(true);
    event.preventDefault(); // prevent default form submission behavior

    if (!candidate || !candidate._id) {
      console.error("Candidate or candidate._id is undefined");
      return;
    }

    // Get the file input element and the selected image file
    const fileInput = document.querySelector('input[name="img"]');
    const file = fileInput.files[0];
    if (!file) {
      setSnackbarMessage('Please select an image');
      setShowSnackbar(true);
      setLoadingImage(false);
      return;
    }
    if (file.size >= 10 * 1024 * 1024) {
      setSnackbarMessage('Image too big! Images are limited to 10MB');
      setShowSnackbar(true);
      setLoadingImage(false);
      return;
    }

    axios
      .get('/api/user/get-user/' + candidate._id)
      .then((response) => {
        const user = response.data; // get the user object from the response

        // User has already uploaded a headshot, delete file in cloudinary
        if (user.headshot?.url) {
            axios
              .post('/api/user/delete-headshot-by-id', { public_id: user.headshot.public_id })
              .then((response) => {
                console.log("Succesfully deleted headshot")
              })
              .catch((err) => {
                console.log(err);
              });
        }

        // Create a new FormData object to send the file data and user reference to the server
        const formData = new FormData();
        formData.append('img', file);

        // Send a POST request to the server with the form data using Axios
        axios
          .post('/api/user/upload-headshot', formData)
          .then((response) => {
            const updatedCandidate = {
              ...candidate,
                headshot: {
                  ...candidate.headshot,
                  url: response.data.imageUrl,
                  public_id: response.data.publicId,
                }
            };
            // Associate the newly uploaded PDF's id with the current user
            axios
              .put('/api/user/update-user/' + candidate._id, updatedCandidate)
              .then((res) => {
                setCandidate(updatedCandidate);
              })
              .catch((err) => {
                console.log(err);
              });

            setSnackbarMessage('Headshot uploaded successfully!');
            setShowSnackbar(true);
            setLoadingImage(false);
          })
          .catch((error) => {
            setLoadingImage(false);
            console.error(error);
            setSnackbarMessage('Upload failed!');
            setShowSnackbar(true);
          });
      })
      .catch((error) => {
        setLoadingImage(false);
        console.error(error);
        setSnackbarMessage('Upload failed!');
        setShowSnackbar(true);
      });
  }

  return (
    <Grid
      container
      spacing={{ xs: 1, md: 2 }}
      rowSpacing={1}
      pt={2}
      sx={{
        width: { xs: '100%', sm: '75%', md: '65%', lg: '55%' },
      }}
    >

      <Grid item xs={4} md={3} lg={2}>
        <Typography sx={{ fontSize: '1rem' }} variant='p' color='primary'>
          Select Headshot:
        </Typography>
      </Grid>

      <Grid item xs={8} md={9} lg={10}>
        <input
          type='file'
          name='img'
          accept='image/jpeg, image/png'
          style={{ color: '#fff', marginBottom: '1rem' }}
        />
        <br />
      </Grid>

      <Grid item xs={4} md={3} lg={2}>
        <Typography sx={{ fontSize: '1rem' }} variant='p' color='primary'>
          Current Headshot:
        </Typography>
      </Grid>

      <Grid item xs={4} md={3} lg={2}>
        {
        candidate?.headshot
            ?
            <img
                src={candidate?.headshot.url || HEADSHOT_LINK}
                alt="headshot"
                style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    borderRadius: "0px",
                }}
            />
            :      
            <Typography sx={{ fontSize: '1rem' }} variant='p1' color='primary'>
                Not submitted
            </Typography>
        }
      </Grid>


      <Grid item xs={12} pt={0}>
        <Button
          variant='contained'
          size='small'
          color='secondary'
          onClick={handleUpload}
        >
          {loadingImage ? (
            <CircularProgress
              size='1.4rem'
              sx={{ color: '#000', marginLeft: '2rem', marginRight: '2rem' }}
            />
          ) : (
            'Submit Headshot'
          )}
        </Button>
      </Grid>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        sx={{
          '& .MuiSnackbarContent-root': {
            color: 'black', //your custom color here
            backgroundColor: (theme) => theme.palette.secondary.main, //your custom color here
          },
        }}
      />
    </Grid>
  );
}

export default UploadHeadshot;
