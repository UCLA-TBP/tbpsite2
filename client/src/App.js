import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './home/Home';
import ProfileRequirements from './profile/ProfileRequirements';
import Profile from './profile/Profile';
import TutoringProfile from './profile/TutoringProfile';
import UploadTest from './profile/UploadTest';
import Events from './events/Events';
import TutoringSchedule from './tutoring/TutoringSchedule';
import ReviewSheets from './tutoring/ReviewSheets';
import TutoringFeedback from './tutoring/TutoringFeedback';
import LogHours from './tutoring/LogHours';
import Officers from './officers/Officers';
import Faculty from './officers/Faculty';
import TestBank from './member-services/TestBank';
import Corporate from './member-services/Corporate';
import Candidates from './candidates/Candidates';
import Requirements from './candidates/MCCheck';
import './App.css';

const navTheme = createTheme({
  palette: {
    primary: {
      main: '#000',
      contrastText: '#fff',
    },
    text: {
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

const theme = createTheme({
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
  },
  typography: {
    p: {
      color: '#bdbdbd',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontWeight: 400,
      fontSize: '1.2rem',
      lineHeight: 1.5,
      display: 'block',
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
    },
    highlight: {
      color: '#eec807',
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={navTheme}>
        <Navbar />
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='profile'>
              <Route path='' element={<Profile />} />
              <Route path='requirements' element={<ProfileRequirements />} />
              <Route path='tutoring' element={<TutoringProfile />} />
              <Route path='upload_test' element={<UploadTest />} />
            </Route>
            <Route path='events' element={<Events />} />
            <Route path='tutoring'>
              <Route path='' element={<Navigate to='schedule' replace />} />
              <Route path='schedule' element={<TutoringSchedule />} />
              <Route path='review_sheets' element={<ReviewSheets />} />
              <Route path='feedback' element={<TutoringFeedback />} />
              <Route path='log_hours' eleemnt={<LogHours />} />
            </Route>
            <Route path='officers'>
              <Route path='' element={<Officers />} />
              <Route path='faculty' element={<Faculty />} />
            </Route>
            <Route path='member_services'>
              <Route path='testbank' element={<TestBank />} />
              <Route path='corporate' element={<Corporate />} />
            </Route>
            <Route path='candidates' element={<Candidates />}>
            </Route>
            {/* TODO: ADMIN STUFF */}
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
