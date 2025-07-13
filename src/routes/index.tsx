import { Component } from 'solid-js';
<<<<<<< HEAD:src/pages/Home.tsx
=======
import { generateParagraphs } from '~/components/lorem';
>>>>>>> becffef532dfc8cc15e41ef4fe0231c0964b629c:src/routes/index.tsx

import styles from './index.module.css';

const accessWordmarkSrc = '/logo/access_wordmark.png';

const Home: Component = () => {
  return (
    <>
      <div class={styles.intro}>
        <img src={accessWordmarkSrc} alt="The Association of Computer Engineering Students" />
        <p>ACCESS is a professional organization of Computer Engineering students who strive to be Lasallian achievers. This organization offers academic and career-related activities in order for students to develop their skills and hone their abilities in engineering.</p>
        <ul class="flex">
          <li><a href="/about">About Us</a></li>
          <li><a href="/about">Mission</a></li>
          <li><a href="/about">Vision</a></li>
        </ul>
      </div>

      <div class={styles.announcementBoard}>
      <h2>📢 Announcements</h2>
      <div class={styles.announcementList}>
        {announcements.map((a) => (
          <div class={styles.announcement}>
            {a.image && (
              <img src={a.image} alt={a.title} class={styles.announcementImage} />
            )}
            <h3>{a.title}</h3>
            <p>{a.description}</p>
            <span class={styles.date}>{a.date}</span>
          </div>
        ))}
      </div>
    </div>
    </>
  );
  
}

// This is a sample data for announcements.
// After API Implementation is done, this will be replaced with data fetched from the server.
const announcements = [
  {
    title: "General Assembly 2025",
    description: "Join us for the first GA of the term! Meet the officers and learn about upcoming events.",
    date: "July 15, 2025",
    image: "/src/assets/logo/access.png", // ✅ optional image
  },
  {
    title: "Project Proposal Deadline",
    description: "Submit your project ideas for the Capstone Expo by August 5.",
    date: "August 1, 2025",
    image: null, // ✅ no image
  },
];
export default Home;
