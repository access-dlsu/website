"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';

const accessWordmarkSrc = '/logo/access_wordmark.png';

export default function Home() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    async function getAnnouncements() {
      const res = await fetch('/api/announcements', { cache: 'no-store' });
      if (!res.ok) {
        console.error('Failed to fetch announcements');
        setErrored(true);
        return;
      }
      const data = await res.json();
      setAnnouncements(data);
      setLoading(false);
    }

    getAnnouncements();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <>
      <div className={styles.intro}> <img src={accessWordmarkSrc} alt="The Association of Computer Engineering Students" />
        <p>ACCESS is a professional organization of Computer Engineering students who strive to be Lasallian achievers. This organization offers academic and career-related activities in order for students to develop their skills and hone their abilities in engineering.</p>
        <ul className="flex">
          <li><a href="/about">About Us</a></li>
          <li><a href="/about">Mission</a></li>
          <li><a href="/about">Vision</a></li>
        </ul>
      </div>

      <div className={styles.announcementBoard}>
        <h2>📢 Announcements</h2>
        <div className={styles.announcementList}>
          {loading ? (
            <p>Loading announcements...</p>
          ) : errored ? (
            <p>Error loading announcements</p>
          ) : (
            announcements.map((a: any) => (
              <div className={styles.announcement} key={a.title + a.date}>
                {a.image && (
                  <img src={a.image} alt={a.title} className={styles.announcementImage} />
                )}
                <h3>{a.title}</h3>
                <p>{a.description}</p>
                <span className={styles.date}>{a.date}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}