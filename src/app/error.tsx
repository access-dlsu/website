'use client';

import styles from './page.module.css';

export default function Error() {
  return (
    <div className={`${styles.intro} ${styles.showFooter} pb-20 flex items-center`}>
      <h1 className="text-5xl font-bold">Something went wrong!</h1>
    </div>
  )
}