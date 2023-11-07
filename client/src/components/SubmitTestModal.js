import {
  Box,
  Modal,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import UploadTest from './UploadTest';

const SubmitTestModal = ({
  open,
  setOpen,
  user,
  setUser
}) => {
  const isOpen = useRef(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (!isOpen.current) return;
      const rect = document.getElementById('modal-box').getBoundingClientRect();
      if (
        e.clientX < rect.x ||
        e.clientX > rect.x + rect.width ||
        e.clientY < rect.y ||
        e.clientY > rect.y + rect.height + 100
      ) {
        setOpen(false);
      }
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [setOpen]);

  useEffect(() => {
    isOpen.current = open;
  }, [open]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        id='modal-box'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          width: { xs: 300, sm: 400, lg: 550 },
          borderRadius: '12px',
          boxShadow: 24,
          p: 4,
          backgroundColor: (theme) => theme.palette.custom.main,
        }}
      >
        <UploadTest
            candidate={user}
            setCandidate={setUser}
        />
      </Box>
    </Modal>
  );
};

export default SubmitTestModal;
