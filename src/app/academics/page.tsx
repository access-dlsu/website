import { checkAuthFromCookies } from '@/lib/auth';
import { SignInButton } from '@/components/sign-in-button';

import styles from './academics.module.css';

export default async function Academics() {
  const data = await checkAuthFromCookies();
  const authenticated = !!data.authenticated;

  return (
    <div className={styles.academics}>
      <h2>ACADEMIC SERVICES</h2>
      <div className={styles.section}>
        <div className={styles.services}>
          <div className={styles.service}>
            <h3>Reviewers</h3>
            <p>ACCESS offers Computer Engineering students with digestible review materials tailored to their current CpE courses, enhancing their preparation for quizzes and exams.</p>
            <SignInButton href="reviewers" authenticated={authenticated} />
          </div>
          <div className={styles.service}>
            <h3>Tutorials</h3>
            <p>ACCESS offers targeted tutorial sessions for Computer Engineering students, supporting their understanding and skills in CpE courses throughout the academic year.</p>
            <button disabled>GO</button>
          </div>
        </div>
      </div>
    </div>
  );
}
