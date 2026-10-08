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
    <Container sx={{ paddingBottom: '100px' }}>
      <Typography variant='h1' mt={10} mb={0}>
        Events
      </Typography>
      <Typography variant='p' mt={2} mb={3}>
        <a href='https://calendar.google.com/calendar/embed?src=a603aec3817a70f7c66d8de37574d752cf4900e114784725dc3ef4ca6820528c%40group.calendar.google.com&ctz=America%2FLos_Angeles'>
          Calendar Link
        </a>
      </Typography>
      <EventsCalendar />
    </Container>
  );
}

export default Events;
