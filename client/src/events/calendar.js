import React, { useEffect, useState } from 'react';
import {google} from 'googleapis'; // Import the Google API Client Library for JavaScript


function Calendar() {
    const [events, setEvent] = useState(null); // Declare state variables to store the calendar data

    useEffect(() => {
        google.load('client', () => {
            google.client.init({
                apiKey: 'AIzaSyAN1BUFhyJ5x3rqxsi5WfiarEWHT3JbvB4',
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'], // Specify the API discovery document for the Google Calendar API
                clientId: '782236656544-14d7g7abra7k72khgm1o82sit8vfe78c.apps.googleusercontent.com.apps.googleusercontent.com',
                scope: 'profile',
            }).then(() => {
                google.client.calendar.events.list({
                    calendarId: 'lv5b95c37926e08bbs8jj20n38@group.calendar.google.com',
                    timeMin: new Date('2023-02-01T12:00:00').toISOString(),
                    singleEvents: true,
                    orderBy: 'startTime'
                }).then((response) => {
                    setEvent(response.result.items);
                });
            });
        });
    }, []);

    return (
        <div>
            {events.map((event) => (
                <div key={event.id}>
                    <h3>{event.summary}</h3>
                    <p>Start: {event.start.dateTime}</p>
                    <p>End: {event.end.dateTime}</p>
                </div>
            ))}
        </div>
    );
}
  
export default Calendar;