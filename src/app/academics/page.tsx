'use client';

import styles from './academics.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFirebaseAuth, getGoogleProvider } from '@/firebaseClient';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useNotification } from "@/components/notification";

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
      .catch(() => {
        setAuthenticated(false);
      });
    // Firebase auth loading check
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, () => {
      setAuthLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    const href = '/academics/reviewers';
    if (authenticated) {
      router.push(href);
      return;
    }

    try {
      const auth = getFirebaseAuth();
      const provider = getGoogleProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const idToken = await result.user.getIdToken();
        // Send token to backend to create session and set cookie
        const response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });
        const data = await response.json();
        if (response.ok && data.success) {
          router.push(href);
        } else {
          const error = data.error || 'Authentication failed';
          showNotification(error, 'error');
        }
      }
    } catch (error) {
      const err = error as any;
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        return;
      }
      if (err.code === 'auth/popup-blocked') {
        showNotification('Popup was blocked by browser. Please enable popups for this website and try again.', 'error');
        return;
      }
      const errMsg = err.message || 'Sign in failed';
      showNotification(errMsg, 'error');
    }
  };

  return (
    <>
      <div className={styles.academics}>
        <h2>ACADEMIC SERVICES</h2>
        <div className={styles.section}>
          <div className={styles.services}>
            <div className={styles.service}>
              <h3>Reviewers</h3>
              <p>ACCESS offers Computer Engineering students with digestible review materials tailored to their current CpE courses, enhancing their preparation for quizzes and exams.</p>
              <button onClick={handleSignIn} disabled={!authLoaded}>
                {authLoaded
                  ? authenticated ? 'GO' : (<><img src='img/google.svg' /> SIGN IN WITH DLSU</>)
                  : 'LOADING...'
                }
              </button>
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
