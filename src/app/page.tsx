import styles from './page.module.css';

const accessWordmarkSrc = '/logo/access_wordmark.png';

export default function Home() {
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
        {announcements.map((a) => (
          <div className={styles.announcement} key={a.title + a.date}>
            {a.image && (
              <img src={a.image} alt={a.title} className={styles.announcementImage} />
            )}
            <h3>{a.title}</h3>
            <p>{a.description}</p>
            <span className={styles.date}>{a.date}</span>
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
    image: "/logo/access.png", // ✅ optional image
  },
  {
    title: "Project Proposal Deadline",
    description: "Submit your project ideas for the Capstone Expo by August 5.",
    date: "August 1, 2025",
    image: null, // ✅ no image
  },
];