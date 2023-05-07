import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const MissingTestInfoModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      console.log('clicked');
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          id='modal-box'
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography> Test</Typography>
        </Box>
      </Modal>
    </>
  );
};

export default MissingTestInfoModal;
