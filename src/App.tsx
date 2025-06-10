import type { Component, JSX } from 'solid-js';

import styles from './App.module.css';

const App: Component<{ children?: JSX.Element }> = (props) => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        {/* Insert header content */}
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
