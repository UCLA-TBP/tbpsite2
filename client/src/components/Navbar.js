import React, { useState, useEffect } from 'react';
import {
  alpha,
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

// const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.transparent,
// }));
const NavButton = styled(Button)(({ theme }) => ({
  color: alpha(theme.palette.text.secondary, 0.6),
  '&:hover': {
    color: theme.palette.text.secondary,
  },
}));

function Navbar() {
  const [scrollPos, setScrollPos] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setScrollPos(winScroll);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log(scrollPos);
  }, [scrollPos]);

  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: (theme) =>
          alpha(theme.palette.primary.main, 0.8 * Math.min(1, scrollPos / 500)),
        boxShadow: 0,
      }}
    >
      {/* <StyledAppBar position='sticky'> */}
      <Grid
        container
        direction='row'
        justifyContent='flex-end'
        spacing={1.5}
        sx={{ px: 3, py: 1.5 }}
      >
        <Grid item>
          <Button
            color='inherit'
            variant='text'
            size='large'
            sx={{ '&:hover': { bgcolor: 'transparent' } }}
          >
            <img
              className='navbar-logo'
              src='/tbp-logo.png'
              alt='tbp-logo'
              height='30'
            />
            &nbsp; Tau Beta Pi | UCLA
          </Button>
        </Grid>
        <Grid item>
          <NavButton variant='text' size='large' onClick={handleClick}>
            More <MoreVertIcon />
          </NavButton>
        </Grid>
        <Grid item>
          <NavButton variant='text' size='large' onClick={handleClick}>
            ethantjackson <PersonOutlineIcon />
          </NavButton>
        </Grid>
      </Grid>
      {/* </StyledAppBar> */}
      <Menu
        sx={{ mt: '54px' }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem
          sx={{
            mr: '15px',
            bgcolor: (theme) => theme.palette.primary.main,
          }}
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          Test
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Navbar;
