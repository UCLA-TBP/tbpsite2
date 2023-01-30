import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
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

function App() {
  return (
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
        <Route path='testbank' element={<TestBank />} />
        {/* TODO: ADMIN STUFF */}
      </Routes>
    </Router>
  );
}

export default App;
