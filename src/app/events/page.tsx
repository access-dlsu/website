import React from 'react';
import { headers } from 'next/headers';

import styles from './events.module.css';

interface FlagshipEvents {
  name: string,
  description: string,
  photoUrl: string,
  url: string,
  highlights: string[]
}

interface OtherEvents {
  name: string,
  photoUrl: string,
  url: string
}

interface Calendar {
  name: string,
  date: Date
}

export default async function Events() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const apiUrl = `${protocol}://${host}/api`;
  
  // Fetch data from API endpoints
  const eventRes = await fetch(`${apiUrl}/events`, { cache: 'no-store' });
  const eventData: { flagship: FlagshipEvents[], other: OtherEvents[] } = await eventRes.json();

  const calendarRes = await fetch(`${apiUrl}/calendar`, { cache: 'no-store' });
  const rawCalendarData = await calendarRes.json();

  // Convert date strings from API to Date objects
  const calendarData: Calendar[] = rawCalendarData.map((event: any) => ({
    ...event,
    date: new Date(event.date),
  }));

  // Group calendarData by month and year
  const calendarByMonth: { [key: string]: Calendar[] } = {};
  calendarData.forEach(event => {
    const monthYear = event.date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!calendarByMonth[monthYear]) calendarByMonth[monthYear] = [];
    calendarByMonth[monthYear].push(event);
  });

  return (
    <>
      <div className={styles.events}>
        <h2>FLAGSHIP EVENTS</h2>
        <div className={styles.flagshipEvents}>
          {eventData.flagship.map((event, eventIndex) => (
            <div key={eventIndex}>
              <div className={styles.number}>
                <p>{String(eventIndex + 1).padStart(2, '0')}</p>
              </div>
              <div className={styles.details}>
                <h3>{event.name.toUpperCase()}</h3>
                <p>{event.description}</p>
                <a href={event.url}>SEE MORE</a>
              </div>
              <div className={styles.highlights}>
                <ul>
                  {event.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
              {event.photoUrl && (
                <div className={styles.image}>
                  <img src={event.photoUrl}/>
                </div>
              )}
            </div>
          ))}
        </div>
        <h2>OTHER EVENTS</h2>
        <div className={styles.otherEvents}>
          {eventData.other.map((event) => (
            <a href={event.url} title={event.name} key={event.url}>
              <img src={event.photoUrl}/>
            </a>
          ))}
        </div>
        <h2>TERM 3 CALENDAR</h2>
        <div className={styles.calendar}>
          {Object.entries(calendarByMonth).map(([monthYear, events]) => (
            <React.Fragment key={monthYear}>
              <h5>{monthYear}</h5>
              <div className={styles.calendarMonth}>
                {events.map((ev, index) => (
                  <div className={styles.calendarItem} key={index}>
                    <h3>{ev.date.toLocaleDateString(undefined, { day: 'numeric' }).padStart(2, '0')}</h3>
                    <h6>{ev.date.toLocaleDateString(undefined, { weekday: 'narrow' })}</h6>
                    <p>{ev.name}</p>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  )
}
