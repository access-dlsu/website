import type { Component } from 'solid-js';

import styles from './App.module.css';

const App: Component = (props: { children?: any }) => {
  return (
    <div class={styles.App}>
      {/* Insert header */}

      {props.children}
      
      {/* Insert footer */}
    </div>
  );
};

export default App;
