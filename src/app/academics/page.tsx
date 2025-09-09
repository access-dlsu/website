'use client';

import Link from 'next/link';

import styles from './academics.module.css';

export default function Events() {
  return (
    <>
      <div className={styles.academics}>
        <h2>ACADEMIC SERVICES</h2>
        <div className={styles.section}>
          <div className={styles.services}>
            <div className={styles.service}>
              <h3>Reviewers</h3>
              <h6>ACCESS offers Computer Engineering students with digestible review materials tailored to their current CpE courses, enhancing their preparation for quizzes and exams.</h6>
              <Link href='/reviewers'>GO</Link>
            </div>
            <div className={styles.service}>
              <h3>Tutorials</h3>
              <h6>ACCESS offers targeted tutorial sessions for Computer Engineering students, supporting their understanding and skills in CpE courses throughout the academic year.</h6>
              <Link href='/tutorials'>GO</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
