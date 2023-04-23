import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './home/Home';
import ProfileRequirements from './profile/ProfileRequirements';
import Profile from './profile/Profile';
import TutoringProfile from './profile/TutoringProfile';
import UploadTest from './profile/UploadTest';
import Events from './events/Events';
import TutoringSchedule from './tutoring/TutoringSchedule';
// import ReviewSheets from './tutoring/ReviewSheets';
// import TutoringFeedback from './tutoring/TutoringFeedback';
// import LogHours from './tutoring/LogHours';
import Officers from './officers/Officers';
import Faculty from './officers/Faculty';
//import TestBank from './member-services/TestBank';
// import Corporate from './member-services/Corporate';
import InductionProgress from './candidates/InductionProgress';
import CandidateTracker from './admin/CandidateTracker';
import TutoringPhrase from './admin/TutoringPhrase';
import SignupForm from './signup/SignupForm';

import RouteProtection from './permissions/RouteProtection';
import { positions } from './permissions/PermissionsUtils';

import './App.css';
import FeatureInProgress from './FeatureInProgress';

const navTheme = createTheme({
  palette: {
    primary: {
      main: '#000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#eec807',
    },
    text: {
      main: '#fff',
      primary: '#fff',
      secondary: '#AAA',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#000',
          borderRadius: 0,
        },
      },
    },
  },
});

let theme = createTheme({});
theme = createTheme({
  palette: {
    // white
    primary: {
      main: '#ffffff',
    },
    // gold/yellow
    secondary: {
      main: '#eec807',
    },
    // dark grey
    custom: {
      main: '#222',
    },
    // light grey
    custom2: {
      main: '#bdbdbd',
    },
  },
  typography: {
    p: {
      color: '#bdbdbd',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontWeight: 400,
      fontSize: '1.2rem',
      lineHeight: 1.5,
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
    h1: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '350%',
      lineHeight: 1.2,
      fontFamily: [
        '-apple-system,BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans - serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ].join(','),
    },
    h2: {
      color: 'white',
      fontSize: '2.7rem',
      lineHeight: 1.2,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        "'Segoe UI'",
        'Roboto',
        "'Helvetica Neue'",
        'Arial',
        "'Noto Sans'",
        'sans-serif',
        "'Apple Color Emoji'",
        "'Segoe UI Emoji'",
        "'Segoe UI Symbol'",
        "'Noto Color Emoji'",
      ].join(','),
      fontWeight: 400,
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.7rem',
      },
    },
    h3: {
      fontSize: '1.6rem',
      lineHeight: 1.2,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        "'Segoe UI'",
        'Roboto',
        "'Helvetica Neue'",
        'Arial',
        "'Noto Sans'",
        'sans-serif',
        "'Apple Color Emoji'",
        "'Segoe UI Emoji'",
        "'Segoe UI Symbol'",
        "'Noto Color Emoji'",
      ].join(','),
      fontWeight: 400,
    },
    h4: {
      fontSize: '1.3rem',
      lineHeight: 1.1,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        "'Segoe UI'",
        'Roboto',
        "'Helvetica Neue'",
        'Arial',
        "'Noto Sans'",
        'sans-serif',
        "'Apple Color Emoji'",
        "'Segoe UI Emoji'",
        "'Segoe UI Symbol'",
        "'Noto Color Emoji'",
      ].join(','),
      fontWeight: 400,
    },
    highlight: {
      color: '#eec807',
    },
  },
});

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    axios
      .get('/api/user/authenticated-user')
      .then((res) => setAuthenticatedUser(res.data.user))
      .catch((err) => setAuthenticatedUser(null));
  }, []);

  return (
    <>
      <ThemeProvider theme={navTheme}>
        <Navbar
          authenticatedUser={authenticatedUser}
          setAuthenticatedUser={setAuthenticatedUser}
        />
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='spicybroccoli5000' element={<SignupForm />} />
            <Route path='profile'>
              <Route path='' element={<Profile />} />
              <Route path='requirements' element={<ProfileRequirements />} />
              <Route path='tutoring' element={<TutoringProfile />} />
              <Route path='upload_test' element={<UploadTest />} />
            </Route>
            <Route path='events' element={<Events />} />
            <Route path='tutoring'>
              {/* <Route path='' element={<Navigate to='schedule' replace />} /> */}
              <Route path='schedule' element={<TutoringSchedule />} />
              {/* <Route path='review_sheets' element={<ReviewSheets />} /> */}
              {/* <Route path='feedback' element={<TutoringFeedback />} /> */}
              {/* <Route path='log_hours' eleemnt={<LogHours />} /> */}
            </Route>
            <Route path='officers'>
              <Route path='' element={<Officers />} />
            </Route>
            <Route path='faculty' element={<Faculty />} />
            {/* <Route path='member_services'>
              <Route path='testbank' element={<TestBank />} />
              <Route path='corporate' element={<Corporate />} />
            </Route> */}
            <Route path='candidates'>
              <Route
                path='requirements'
                element={
                  <RouteProtection
                    authenticatedUser={authenticatedUser}
                    allowedPositions={[positions.candidate]}
                  />
                }
              ></Route>
            </Route>
            {/* TODO: ADMIN STUFF */}
            <Route path='candidates'>
              <Route
                path='induction-progress'
                element={
                  <RouteProtection
                    authenticatedUser={authenticatedUser}
                    allowedPositions={[positions.candidate]}
                  />
                }
              >
                <Route
                  path=''
                  element={
                    <InductionProgress
                      candidate={authenticatedUser}
                      setCandidate={setAuthenticatedUser}
                    />
                  }
                />
              </Route>
            </Route>
            <Route path='admin'>
              <Route
                path='candidate_tracker'
                element={
                  <RouteProtection
                    authenticatedUser={authenticatedUser}
                    allowedPositions={[positions.officer]}
                  />
                }
              >
                <Route path='' element={<CandidateTracker />} />
              </Route>
              <Route
                path='tutoring_phrase'
                element={
                  <RouteProtection
                    authenticatedUser={authenticatedUser}
                    allowedPositions={[positions.officer]}
                  />
                }
              >
                <Route path='' element={<TutoringPhrase />} />
              </Route> 
            </Route>
            <Route path='in-progress' element={<FeatureInProgress />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
