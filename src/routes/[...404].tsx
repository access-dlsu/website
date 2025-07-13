import { HttpStatusCode } from "@solidjs/start";

import styles from './index.module.css';

export default function NotFound() {
  return (
    <div class={`${styles.intro} ${styles.showFooter} pb-20 flex items-center`}>
      <HttpStatusCode code={404} />
      <h1 class="text-5xl font-bold">404 Not Found</h1>
    </div>
  )
}