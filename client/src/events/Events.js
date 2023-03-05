import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import EventsCalendar from '../components/EventsCalendar';

function Events() {
  useEffect(() => {
    fetch('https://www.googleapis.com/calendar/v3/calendars/calendarId/events')
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <Container>
      <Typography variant='h2' mt={10}>
        Events
      </Typography>
      <a href='https://calendar.google.com/calendar/u/0/embed?src=lv5b95c37926e08bbs8jj20n38@group.calendar.google.com&ctz=America/Los_Angeles'>
        Calendar Link
      </a>
      <EventsCalendar />
    </Container>
  );
}

export default Events;
