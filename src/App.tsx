import type { Component, JSX } from 'solid-js';

import styles from './App.module.css';

import accessWordmarkSrc from '/src/assets/logo/access.png';

const App: Component<{ children?: JSX.Element }> = (props) => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <a href="/">
          <img src={accessWordmarkSrc} alt="ACCESS Logo"/>
          <span>ACCESS</span>
        </a>
        <div>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/reviewers">Reviewers</a></li>
            <li><a href="/tutorials">Tutorials</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </header>
      
      <main class={styles.main}>
        {props.children}
      </main>
      
      <footer class={styles.footer}>
        {/* Insert footer content */}
      </footer>
    </div>
  );
};

export default App;
