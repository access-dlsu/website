import { Component } from 'solid-js';
import { generateParagraphs } from '../utils/lorem';

import styles from './Home.module.css';

import accessWordmarkSrc from '/src/assets/logo/access_wordmark.png';

const Home: Component = () => {
  const paragraphs = generateParagraphs(10);

  return (
    <>
      <div class={styles.intro}>
        <img src={accessWordmarkSrc} alt="The Association of Computer Engineering Students" />
        <p>ACCESS is a professional organization of Computer Engineering students who strive to be Lasallian achievers. This organization offers academic and career-related activities in order for students to develop their skills and hone their abilities in engineering.</p>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/about">Mission</a></li>
          <li><a href="/about">Vision</a></li>
        </ul>
      </div>
      {paragraphs.map((paragraph) => (
        <p>{paragraph}</p>
      ))}
    </>
  );
}

export default Home;
