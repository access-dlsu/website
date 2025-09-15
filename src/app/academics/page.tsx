'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from "@/components/notification";

import styles from './academics.module.css';

export default function Events() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [authenticated, setAuthenticated] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    // Check authentication status on mount
    fetch('/api/auth/check', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setAuthenticated(!!data.authenticated);
      })
      .catch(err => {
        setAuthenticated(false);
        showNotification(err, 'error');
      })
      .finally(() => {
        setAuthLoaded(true);
      });
  }, []);

  const handleSignIn = async (href: string = '') => {
    const redirectUrl = `/academics/${href}`;
    if (authenticated) {
      router.push(redirectUrl);
      return;
    }
    router.push(`/api/auth/signin?redirect=${encodeURIComponent(redirectUrl)}`);
  };

  const signInReviewers = () => handleSignIn('reviewers');
  const signInTutorials = () => handleSignIn('tutorials');
  
  const signInBtn = authLoaded
                  ? authenticated ? 'GO' : (<><img src='/img/google.svg' /> SIGN IN WITH DLSU</>)
                  : 'LOADING...';

  return (
    <>
      <div className={styles.academics}>
        <h2>ACADEMIC SERVICES</h2>
        <div className={styles.section}>
          <div className={styles.services}>
            <div className={styles.service}>
              <h3>Reviewers</h3>
              <p>ACCESS offers Computer Engineering students with digestible review materials tailored to their current CpE courses, enhancing their preparation for quizzes and exams.</p>
              <button onClick={signInReviewers} disabled={!authLoaded}>{signInBtn}</button>
            </div>
            <div className={styles.service}>
              <h3>Tutorials</h3>
              <p>ACCESS offers targeted tutorial sessions for Computer Engineering students, supporting their understanding and skills in CpE courses throughout the academic year.</p>
              <button disabled>GO</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
