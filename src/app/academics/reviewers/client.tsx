'use client';

import { useEffect, useState } from 'react';

import aStyles from '../academics.module.css';
import styles from './reviewers.module.css';

export default function Reviewers() {
  const [files, setFiles] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/reviewers');
        const data = await res.json();
        setFiles(data.files || []);
      } catch {
        setFiles([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  // Helper to organize files by subject and term
  function organizeFiles(files: any[]) {
    const organized: any = {};
    files.forEach(file => {
      const filename = file.originalName || file.name;
      const match = filename.match(/^([A-Z]+)_([0-9-T]+)_(QUIZ|FINALS|Quiz|Finals|quiz|finals)-(\d+[A-Z]*)\.pdf$/i);
      if (match) {
        const [, subject, term, type, number] = match;
        if (!organized[subject]) organized[subject] = {};
        if (!organized[subject][term]) organized[subject][term] = { quizzes: [], finals: [] };
        const fileInfo = {
          filename,
          number,
          webViewLink: file.webViewLink,
        };
        if (type.toUpperCase() === 'QUIZ') organized[subject][term].quizzes.push(fileInfo);
        else if (type.toUpperCase() === 'FINALS') organized[subject][term].finals.push(fileInfo);
      }
    });
    // Sort quizzes and finals by number
    Object.keys(organized).forEach(subject => {
      Object.keys(organized[subject]).forEach(term => {
        organized[subject][term].quizzes.sort((a: any, b: any) => {
          const aNum = parseInt(a.number) || 0;
          const bNum = parseInt(b.number) || 0;
          return aNum - bNum;
        });
        organized[subject][term].finals.sort((a: any, b: any) => {
          const aNum = parseInt(a.number) || 0;
          const bNum = parseInt(b.number) || 0;
          return aNum - bNum;
        });
      });
    });
    return organized;
  }

  function getTotalFiles(termData: any) {
    let count = 0;
    Object.values(termData).forEach((t: any) => {
      count += (t.quizzes?.length || 0) + (t.finals?.length || 0);
    });
    return count;
  }

  function renderOrganizedFiles(organized: any) {
    if (Object.keys(organized).length === 0) {
      return (
        <div className={`${styles.notFound} flex items-center`}>
          <span>No files found or unable to fetch files.</span>
        </div>
      );
    }
    // Sort subjects alphabetically
    const sortedCourses = Object.keys(organized).sort();
    return (
      <div className={styles.courses}>
        {sortedCourses.map(course => {
          const termData = organized[course];
          // Sort terms (academic years) most recent first
          const sortedTerms = Object.keys(termData).sort().reverse();
          return (
            <div key={course} className={styles.course}>
              <div className={styles.header}>
                <h3 className={styles.code}>{course}</h3>
                <div className={styles.count}>
                  {getTotalFiles(termData)} file{getTotalFiles(termData) > 1 ? 's' : ''} available
                </div>
              </div>
              {sortedTerms.map(term => {
                // Convert format like "25-26-T1" to "2025-2026 Term 1"
                let termLabel = term;
                const termParts = term.split('-');
                if (termParts.length === 3) {
                  const year1 = 2000 + parseInt(termParts[0]);
                  const year2 = 2000 + parseInt(termParts[1]);
                  const termNum = termParts[2].replace('T', 'Term ');
                  termLabel = `${year1}-${year2} ${termNum}`;
                }
                const { quizzes, finals } = termData[term];
                return (
                  <div key={term} className={styles.termData}>
                    <h3 className={styles.term}>{termLabel}</h3>
                    {quizzes.length > 0 && (
                      <div className={finals.length > 0 ? 'mb-4' : ''}>
                        {/*<h4 className={styles.category}>Quizzes</h4>*/}
                        <div className={styles.files}>
                          {quizzes.map((quiz: any) => (
                            <a
                              key={quiz.number}
                              href={quiz.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.file}
                            >
                              Quiz {quiz.number}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    {finals.length > 0 && (
                      <div>
                        {/*<h4 className={styles.category}>Finals</h4>*/}
                        <div className={styles.files}>
                          {finals.map((final: any) => (
                            <a
                              key={final.number}
                              href={final.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.file}
                            >
                              Finals
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={aStyles.academics}>
      <h2>Reviewers Hub</h2>
      <p className="text-md text-gray-200 mb-4 transition-colors duration-200">Browse and download academic materials organized by course and term.</p>
      {loading ? (
        <div className="flex items-center"><span>Loading...</span></div>
      ) : files ? (
        renderOrganizedFiles(organizeFiles(files))
      ) : null}
    </div>
  );
}
