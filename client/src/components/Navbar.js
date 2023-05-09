import React, { useState, useEffect, useRef } from 'react';
import {
  alpha,
  AppBar,
  Button,
  Container,
  Grid,
  Link,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import styled from '@emotion/styled';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&:hover': {
    color: alpha(theme.palette.text.secondary, 0.6),
  },
}));

const DropDownItemLink = ({
  name,
  destination,
  handleDropDownClose,
  centerOnElement,
}) => {
  return (
    <Link href={`/${destination}`} underline='none'>
      <MenuItem
        sx={{
          color: (theme) => theme.palette.text.secondary,
          '&:hover': {
            color: (theme) => alpha(theme.palette.text.secondary, 0.6),
          },
          fontSize: '.9rem',
          mt: { xs: -2.5, sm: 0 },
        }}
        onClick={() => {
          handleDropDownClose();
          // if (destination[0] === '#') centerOnElement(destination.slice(1));
        }}
      >
        {name}
      </MenuItem>
    </Link>
  );
};

class DropDownItemData {
  constructor(name, destination) {
    this.name = name;
    this.destination = destination;
  }
}

const MoreDropDownEntries = [
  new DropDownItemData('HOME'),
  new DropDownItemData('Who We Are', '#who-we-are'),
  new DropDownItemData('Becoming a Member', '#becoming-a-member'),
  new DropDownItemData('Tutoring', '#tutoring'),
  new DropDownItemData('Event Calendar', '#event-calendar'),
  new DropDownItemData('Activities', '#activities'),
  new DropDownItemData('Contact', '#contact'),
  new DropDownItemData('EVENTS'),
  new DropDownItemData('Events', 'events'),
  new DropDownItemData('TUTORING QUICKLINKS'),
  new DropDownItemData('Schedule', 'tutoring/schedule'),
  // new DropDownItemData('Review Sheets', 'tutoring/review_sheets'),
  // new DropDownItemData('Feedback', 'tutoring/feedback'),
  // new DropDownItemData('Log Hours', 'log_hours'),
  new DropDownItemData('CONTACT QUICKLINKS'),
  new DropDownItemData('Officers', 'officers'),
  new DropDownItemData('Faculty', 'faculty'),
  new DropDownItemData('Website Feedback', '#contact'),
];

// TODO: change available links based on user position
const OfficerDropDownEntries = [
  new DropDownItemData('OFFICER'),
  new DropDownItemData('Candidate Tracker', 'admin/candidate_tracker'),
  new DropDownItemData('Set Tutoring Phrase', 'admin/tutoring_phrase'),
  new DropDownItemData('Candidate Spreadsheet', 'admin/candidate_spreadsheet'),
  // new DropDownItemData('Admin Panel', '#!'),
  // new DropDownItemData('Candidates', '#!'),
  // new DropDownItemData('Active members', '#!'),
  // new DropDownItemData('Requirement Attendance', 'profile/requirements'),
  // new DropDownItemData('All Profiles', '#!'),
  // new DropDownItemData('Tutoring', '#!'),
  // new DropDownItemData('Downloads', '#!'),
  // new DropDownItemData('Wiki', '#!'),
  // new DropDownItemData('MEMBER SERVICES'),
  // new DropDownItemData('Profile', 'profile'),
  // new DropDownItemData('Testbank', 'profile/upload_test'),
  // new DropDownItemData('Log Out', '#!'),
];

const MemberDropDownEntries = [
  new DropDownItemData('MEMBER SERVICES'),
  new DropDownItemData('Testbank', 'members/testbank'),
];

const CandidateDropDownEntries = [
  new DropDownItemData('CANDIDATE SERVICES'),
  new DropDownItemData('Induction Progress', 'candidates/induction-progress'),
];

const UniversalDropDownEntries = [new DropDownItemData('logout')];

function Navbar({ authenticatedUser, setAuthenticatedUser }) {
  const [scrollPos, setScrollPos] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropDownItems, setDropDownItems] = useState([]);
  const dropDownEntered = useRef(false);
  const [dropDownParent, setDropDownParent] = useState(null);
  const [userDropDownEntries, setUserDropDownEntries] = useState([]);

  const [doScrollFade, setDoScrollFade] = useState(false);
  const isMobileView = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const dropDownRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    const targetId = window.location.href.match(/#.*$/)?.at(0).slice(1);
    centerOnElement(targetId);
    setDoScrollFade(window.location.pathname === '/');
    // eslint-disable-next-line
  }, [window.location.href]);

  useEffect(() => {
    const userPosition = authenticatedUser?.position;
    switch (userPosition) {
      case 'officer':
        setUserDropDownEntries([
          ...OfficerDropDownEntries,
          ...MemberDropDownEntries,
          // ...CandidateDropDownEntries,
          ...UniversalDropDownEntries,
        ]);
        break;
      case 'member':
        setUserDropDownEntries([
          ...MemberDropDownEntries,
          // ...CandidateDropDownEntries,
          ...UniversalDropDownEntries,
        ]);
        break;
      case 'candidate':
        setUserDropDownEntries([
          ...CandidateDropDownEntries,
          ...UniversalDropDownEntries,
        ]);
        break;
      default:
        setUserDropDownEntries([]);
        break;
    }
  }, [authenticatedUser]);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      setScrollPos(winScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickAway = (e) => {
      if (!e.target.closest('.MuiContainer-root')) {
        if (Boolean(anchorEl)) {
          handleDropDownClose(false);
        }
      }
    };
    window.addEventListener('mousedown', handleClickAway);
    return () => {
      window.removeEventListener('mousedown', handleClickAway);
    };
  }, [anchorEl]);

  const centerOnElement = (targetId) => {
    if (targetId) {
      const target = document.getElementById(targetId);
      if (target)
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
    }
  };

  const handleDropDown = (e, items, dropDownParent) => {
    setAnchorEl(e.currentTarget);
    setDropDownItems(items);
    setDropDownParent(dropDownParent);
  };

  const handleDropDownClose = () => {
    setAnchorEl(null);
    setDropDownParent(null);
    dropDownEntered.current = false;
  };

  return (
    <AppBar
      ref={navbarRef}
      position='fixed'
      sx={{
        backgroundColor: (theme) =>
          doScrollFade
            ? alpha(
                theme.palette.primary.main,
                0.8 * Math.min(1, scrollPos / 500)
              )
            : theme.palette.primary.main,
        boxShadow: 0,
      }}
    >
      <Grid
        container
        direction='row'
        justifyContent='flex-end'
        spacing={isMobileView ? 0 : 1.5}
        sx={{ px: { xs: 0.5, md: 3 }, py: 1.5 }}
      >
        <Grid
          item
          sx={
            isMobileView
              ? {
                  position: 'absolute',
                  left: '12px',
                }
              : {}
          }
        >
          <Button
            color='inherit'
            variant='text'
            size='large'
            sx={{ '&:hover': { bgcolor: 'transparent' } }}
            onClick={() => {
              window.location = '/#intro';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img
              className='navbar-logo'
              src='/tbp-logo.png'
              alt='tbp-logo'
              height='25'
            />
            &nbsp;
            {isMobileView ? 'TBP | UCLA' : ' Tau Beta Pi | UCLA'}
          </Button>
        </Grid>
        <Grid item>
          <NavButton
            variant='text'
            size='large'
            onClick={
              dropDownParent === 'more'
                ? handleDropDownClose
                : (e) => {
                    handleDropDown(e, MoreDropDownEntries, 'more');
                  }
            }
            onMouseEnter={(e) => {
              handleDropDown(e, MoreDropDownEntries, 'more');
            }}
          >
            More <MoreVertIcon />
          </NavButton>
        </Grid>
        {authenticatedUser ? (
          <Grid item>
            <NavButton
              variant='text'
              size='large'
              onClick={
                dropDownParent === 'user'
                  ? handleDropDownClose
                  : (e) => {
                      handleDropDown(e, userDropDownEntries, 'user');
                    }
              }
              onMouseEnter={(e) => {
                handleDropDown(e, userDropDownEntries, 'user');
              }}
            >
              {authenticatedUser.name.first} <PersonOutlineIcon />
            </NavButton>
          </Grid>
        ) : (
          <Grid item>
            <NavButton
              variant='text'
              size='large'
              onClick={
                dropDownParent === 'user'
                  ? handleDropDownClose
                  : (e) => {
                      handleDropDown(
                        e,
                        [new DropDownItemData('login')],
                        'user'
                      );
                    }
              }
              onMouseEnter={(e) => {
                handleDropDown(e, [new DropDownItemData('login')], 'user');
              }}
            >
              log in <PersonOutlineIcon />
            </NavButton>
          </Grid>
        )}
      </Grid>
      <Menu
        ref={dropDownRef}
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
        onClose={handleDropDownClose}
        disableEnforceFocus
      >
        <Container
          disableGutters
          sx={{ py: 1, pl: 1, pr: 3 }}
          onMouseEnter={() => {
            dropDownEntered.current = true;
          }}
        >
          {dropDownItems.map((item, idx) => {
            if (item.destination)
              return (
                <DropDownItemLink
                  key={item.name}
                  name={item.name}
                  destination={item.destination}
                  handleDropDownClose={handleDropDownClose}
                  centerOnElement={centerOnElement}
                />
              );
            if (item.name === 'login')
              return (
                <LoginForm
                  key={item.name}
                  loginCallback={(res) => {
                    setAuthenticatedUser(res.data.user);
                    handleDropDownClose();
                  }}
                />
              );
            if (item.name === 'logout')
              return (
                <LogoutButton
                  key={item.name}
                  logoutCallback={() => {
                    setAuthenticatedUser(null);
                    handleDropDownClose();
                  }}
                />
              );
            return (
              <MenuItem
                key={item.name}
                disabled
                sx={{
                  '&.Mui-disabled': {
                    color: (theme) => theme.palette.text.primary,
                    opacity: 1,
                  },
                  mt: { xs: -0.5, sm: idx > 0 ? 2 : 0 },
                  fontSize: '.9rem',
                }}
              >
                {item.name}
              </MenuItem>
            );
          })}
        </Container>
      </Menu>
    </AppBar>
  );
}

export default Navbar;
