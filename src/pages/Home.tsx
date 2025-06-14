import { Component } from 'solid-js';
import { generateParagraphs } from '../utils/lorem';

import styles from './Home.module.css';

const Home: Component = () => {
  const paragraphs = generateParagraphs(10);

  return (
    <>
      {paragraphs.map((paragraph) => (
        <p>{paragraph}</p>
      ))}
    </>
  );
}

export default Home;
