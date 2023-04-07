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
        }}
        onClick={() => {
          // handleDropDownClose();
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
  // new DropDownItemData('Advisors and Faculty', 'officers/faculty'),
];

// TODO: change available links based on user position
const OfficerDropDownEntries = [
  new DropDownItemData('OFFICER'),
  new DropDownItemData('Candidate Tracker', 'admin/candidate_tracker'),
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

const MemberDropDownEntries = [new DropDownItemData('MEMBER SERVICES')];

const CandidateDropDownEntries = [new DropDownItemData('CANDIDATE SERVICES')];

const UniversalDropDownEntries = [new DropDownItemData('logout')];

function Navbar({ authenticatedUser, setAuthenticatedUser }) {
  const [scrollPos, setScrollPos] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropDownItems, setDropDownItems] = useState([]);
  const dropDownEntered = useRef(false);
  const [dropDownTimer, setDropDownTimer] = useState(null);
  const [dropDownOpened, setDropDownOpened] = useState(false);
  const [userDropDownEntries, setUserDropDownEntries] = useState([]);

  useEffect(() => {
    const targetId = window.location.href.match(/#.*$/)?.at(0).slice(1);
    centerOnElement(targetId);
    // eslint-disable-next-line
  }, [window.location.href]);

  useEffect(() => {
    const userPosition = authenticatedUser?.position;
    switch (userPosition) {
      case 'officer':
        setUserDropDownEntries([
          ...OfficerDropDownEntries,
          ...MemberDropDownEntries,
          ...CandidateDropDownEntries,
          ...UniversalDropDownEntries,
        ]);
        break;
      case 'member':
        setUserDropDownEntries([
          ...MemberDropDownEntries,
          ...CandidateDropDownEntries,
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
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  const handleDropDown = (e, items) => {
    setAnchorEl(e.currentTarget);
    setDropDownItems(items);
    setDropDownOpened(true);
    if (dropDownTimer) clearTimeout(dropDownTimer);
  };

  const handleDropDownClose = () => {
    setAnchorEl(null);
    setDropDownOpened(false);
    dropDownEntered.current = false;
  };

  const handleScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setScrollPos(winScroll);
  };

  const startDropDownTimer = () => {
    setDropDownTimer(
      setTimeout(() => {
        if (!dropDownEntered.current) {
          handleDropDownClose();
        }
      }, 100)
    );
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: (theme) =>
          alpha(theme.palette.primary.main, 0.8 * Math.min(1, scrollPos / 500)),
        boxShadow: 0,
      }}
    >
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
            &nbsp; Tau Beta Pi | UCLA
          </Button>
        </Grid>
        <Grid item>
          <NavButton
            variant='text'
            size='large'
            onClick={
              dropDownOpened
                ? handleDropDownClose
                : (e) => {
                    handleDropDown(e, MoreDropDownEntries);
                  }
            }
            onMouseEnter={(e) => {
              handleDropDown(e, MoreDropDownEntries);
            }}
            onMouseLeave={startDropDownTimer}
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
                dropDownOpened
                  ? handleDropDownClose
                  : (e) => {
                      handleDropDown(e, userDropDownEntries);
                    }
              }
              onMouseEnter={(e) => {
                handleDropDown(e, userDropDownEntries);
              }}
              onMouseLeave={startDropDownTimer}
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
                dropDownOpened
                  ? handleDropDownClose
                  : (e) => {
                      handleDropDown(e, [new DropDownItemData('login')]);
                    }
              }
              onMouseEnter={(e) => {
                handleDropDown(e, [new DropDownItemData('login')]);
              }}
              onMouseLeave={startDropDownTimer}
            >
              log in <PersonOutlineIcon />
            </NavButton>
          </Grid>
        )}
      </Grid>
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
        onClose={handleDropDownClose}
        disableEnforceFocus
      >
        <Container
          disableGutters
          sx={{ py: 1, pl: 1, pr: 3 }}
          onMouseLeave={handleDropDownClose}
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
                  mt: idx > 0 ? 2 : 0,
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
