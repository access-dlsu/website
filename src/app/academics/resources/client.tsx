'use client';

import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { BookOpen, FileText, Video, Code, Lock, Search, Download, AlertCircle, CheckCircle, Info } from 'lucide-react';

// Resource categories
const categories = [
  { id: 'all', name: 'All Resources', icon: BookOpen },
  { id: 'notes', name: 'Reviewers', icon: FileText },
  { id: 'textbooks', name: 'Textbooks', icon: BookOpen },
  { id: 'videos', name: 'Video Tutorials', icon: Video },
  { id: 'code', name: 'Code Examples', icon: Code },
];

interface DriveFile {
  id: string;
  name: string;
  mimeType?: string;
  size?: number;
  modifiedTime?: string;
}

interface GroupedFile extends DriveFile {
  category: string;
  restricted: boolean;
  displayName: string;
  courseCode?: string | null;
  fileType?: string;
  quizNumber?: number | null;
}

export default function ResourcesClient() {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState<DriveFile[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [notification, setNotification] = useState<{ message: string; type: 'info' | 'success' | 'error' } | null>(null);
  const [showAuthWarning, setShowAuthWarning] = useState(true);
  const [isAuthWarningFading, setIsAuthWarningFading] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  // Set user info cookie when logged in and fade out auth warning
  useEffect(() => {
    // Mark that we've checked auth
    if (!hasCheckedAuth) {
      setHasCheckedAuth(true);
    }

    if (session?.user && showAuthWarning) {
      // Start fade out animation
      setIsAuthWarningFading(true);
      
      // Remove after animation completes
      const timeout = setTimeout(() => {
        setShowAuthWarning(false);
      }, 500);

      fetch('/api/set-user-info').catch(() => {
        // Silently fail if cookie setting fails
      });

      return () => clearTimeout(timeout);
    }
  }, [session, hasCheckedAuth, showAuthWarning]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/resources');
        const data = await res.json();
        setFiles(data.files || []);
      } catch {
        setFiles([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Animate loading progress
  useEffect(() => {
    if (!loading) {
      setLoadingProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 3;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [loading]);

  // Show notification
  function showNotification(message: string, type: 'info' | 'success' | 'error') {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  }

  // Extract course code from filename (e.g., "CSYSARC_24-25-T2_QUIZ-1.pdf" -> "CSYSARC")
  function extractCourseCode(filename: string): string | null {
    const match = filename.match(/^([A-Z]+)/);
    return match ? match[1] : null;
  }

  // Extract quiz/exam number (e.g., "QUIZ-1" -> 1, "EXAM-2" -> 2)
  function extractQuizNumber(filename: string): number | null {
    const match = filename.match(/(?:QUIZ|EXAM|TEST|ASSESSMENT)[-_]?(\d+)/i);
    return match ? parseInt(match[1], 10) : null;
  }

  // Extract academic year and term (e.g., "24-25-T2" -> "A.Y. 2024 - 2025 Term 2")
  function extractAcademicYearTerm(filename: string): string | null {
    const match = filename.match(/(\d{2})-(\d{2})-T(\d)/);
    if (match) {
      const startYear = `20${match[1]}`;
      const endYear = `20${match[2]}`;
      const term = match[3];
      return `A.Y. ${startYear} - ${endYear} Term ${term}`;
    }
    return null;
  }

  // Determine file type (quiz, exam, notes, etc.)
  function getFileTypeCategory(filename: string): string {
    const lower = filename.toLowerCase();
    if (lower.includes('quiz')) return 'quiz';
    if (lower.includes('exam') || lower.includes('test')) return 'exam';
    if (lower.includes('notes') || lower.includes('lecture')) return 'notes';
    if (lower.includes('lab') || lower.includes('exercise')) return 'lab';
    if (lower.includes('project')) return 'project';
    return 'other';
  }

  // Categorize files based on naming convention
  function categorizeFile(filename: string): string {
    const lower = filename.toLowerCase();
    if (lower.includes('textbook') || lower.includes('book')) return 'textbooks';
    if (lower.includes('notes') || lower.includes('lecture')) return 'notes';
    if (lower.includes('video') || lower.includes('tutorial') || lower.includes('.mp4') || lower.includes('.mkv')) return 'videos';
    if (lower.includes('code') || lower.includes('.zip') || lower.includes('example')) return 'code';
    return 'notes'; // Default category
  }

  // Check if file is restricted (members only)
  function isRestricted(filename: string): boolean {
    const lower = filename.toLowerCase();
    return lower.includes('[restricted]') || lower.includes('[members]');
  }

  // Filter and organize files with grouping
  function getFilteredFiles() {
    if (!files) return [];
    
    return files
      .filter((file: DriveFile) => {
        if (file.mimeType === 'application/vnd.google-apps.folder') return false;
        
        const category = categorizeFile(file.name);
        const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
        const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesSearch;
      })
      .map((file: DriveFile): GroupedFile => ({
        ...file,
        category: categorizeFile(file.name),
        restricted: isRestricted(file.name),
        displayName: file.name.replace(/\[restricted\]/gi, '').replace(/\[members\]/gi, '').trim(),
        courseCode: extractCourseCode(file.name),
        fileType: getFileTypeCategory(file.name),
        quizNumber: extractQuizNumber(file.name),
      }));
  }

  // Group files by course code
  function groupByCourse(files: GroupedFile[]): Map<string, { academicYearTerm: string | null; files: GroupedFile[] }> {
    const grouped = new Map<string, { academicYearTerm: string | null; files: GroupedFile[] }>();
    
    files.forEach(file => {
      const key = file.courseCode || 'Other';
      if (!grouped.has(key)) {
        grouped.set(key, {
          academicYearTerm: extractAcademicYearTerm(file.name),
          files: []
        });
      }
      // Update academic year/term if we find one and don't have it yet
      if (!grouped.get(key)!.academicYearTerm) {
        const ayTerm = extractAcademicYearTerm(file.name);
        if (ayTerm) {
          grouped.get(key)!.academicYearTerm = ayTerm;
        }
      }
      grouped.get(key)!.files.push(file);
    });

    // Sort files within each group by quiz number or name
    grouped.forEach((groupData) => {
      groupData.files.sort((a, b) => {
        if (a.quizNumber && b.quizNumber) {
          return a.quizNumber - b.quizNumber;
        }
        return a.name.localeCompare(b.name);
      });
    });

    return grouped;
  }

  function getFileSize(bytes?: number): string {
    if (!bytes) return 'Unknown';
    const mb = bytes / (1024 * 1024);
    if (mb < 1) return `${(bytes / 1024).toFixed(1)} KB`;
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    return `${(mb / 1024).toFixed(2)} GB`;
  }

  function initiateDownload(fileId: string, fileName: string) {
    showNotification('Preparing your download', 'info');
    fetch(`/api/resources/download?fileId=${encodeURIComponent(fileId)}`)
      .then(async res => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Download failed');
        }
        let filename = fileName;
        const contentDisposition = res.headers.get('Content-Disposition');
        if (contentDisposition) {
          const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          if (match && match[1]) {
            filename = match[1].replace(/['"]/g, '').trim();
          }
        }
        return { filename, blob: await res.blob() };
      })
      .then(data => {
        const blobUrl = URL.createObjectURL(data.blob);
        if (downloadRef.current) {
          downloadRef.current.href = blobUrl;
          downloadRef.current.download = data.filename;
          downloadRef.current.click();
          URL.revokeObjectURL(blobUrl);
        }
        showNotification('Download started', 'success');
      })
      .catch(error => {
        showNotification(error.message || 'Download failed', 'error');
      });
  }

  const filteredFiles = getFilteredFiles();
  const groupedByCourse = groupByCourse(filteredFiles);

  return (
    <div className="pt-32 pb-8 px-6 max-w-7xl mx-auto">
      {/* Notification */}
      {notification && (
        <div className="notification-container" data-type={notification.type}>
          {notification.type === 'success' && (
            <CheckCircle className="w-5 h-5 flex-shrink-0" aria-hidden />
          )}
          {notification.type === 'error' && (
            <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden />
          )}
          {notification.type === 'info' && (
            <Info className="w-5 h-5 flex-shrink-0" aria-hidden />
          )}
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="notification-close-btn"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="text-center space-y-6 mb-12">
        <h1 className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
          Learning Resources
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-manrope)' }}>
          Access textbooks, lecture notes, video tutorials, and code examples to support your learning journey.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto search-bar">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10 pointer-events-none" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none relative"
            style={{ fontFamily: 'var(--font-manrope)' }}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`category-filter ${isActive ? 'category-filter-active' : ''} flex items-center gap-2 px-6 py-3 font-medium text-gray-300`}
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Auth Warning */}
      {showAuthWarning && (
        <div className={`auth-warning-container ${isAuthWarningFading ? 'auth-warning-fade-out' : ''}`}>
          <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-manrope)' }}>
            Sign in to access restricted resources
          </h3>
          <p className="text-gray-400" style={{ fontFamily: 'var(--font-manrope)' }}>
            Some resources require DLSU authentication. Sign in with your @dlsu.edu.ph email to access all materials.
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-6">
          <div className="loading-container-inline">
            <div className="loading-content">
              <h2 className="loading-title">Loading</h2>
              <div className="loading-bar-container">
                <div 
                  className="loading-bar-fill"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="loading-percentage">{Math.floor(loadingProgress)}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Resources Grid - Grouped by Course */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from(groupedByCourse.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([courseCode, courseData]) => (
              <div key={courseCode} className="course-card p-6 h-fit">
                {/* Course Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
                    {courseCode}
                  </h2>
                  {courseData.academicYearTerm && (
                    <p className="text-sm text-gray-400" style={{ fontFamily: 'var(--font-manrope)' }}>
                      {courseData.academicYearTerm}
                    </p>
                  )}
                </div>

                {/* Group by file type within course */}
                {(() => {
                  const byType = new Map<string, GroupedFile[]>();
                  courseData.files.forEach(file => {
                    const type = file.fileType || 'other';
                    if (!byType.has(type)) byType.set(type, []);
                    byType.get(type)!.push(file);
                  });

                  return Array.from(byType.entries()).map(([fileType, typeFiles]) => (
                    <div key={fileType} className="mb-6 last:mb-0">
                      {/* File Type Label */}
                      <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide" style={{ fontFamily: 'var(--font-manrope)' }}>
                        {fileType === 'quiz' ? 'Quizzes' : 
                         fileType === 'exam' ? 'Exams' : 
                         fileType === 'notes' ? 'Notes' :
                         fileType === 'lab' ? 'Labs' :
                         fileType === 'project' ? 'Projects' : 'Resources'}
                      </h3>

                      {/* Buttons for each file */}
                      <div className="flex flex-wrap gap-2">
                        {typeFiles.map((file) => {
                          const isLocked = file.restricted && !session;
                          return (
                            <div key={file.id} className="relative group">
                              <button
                                onClick={() => {
                                  if (isLocked) {
                                    showNotification('Sign in to access this file', 'error');
                                  } else {
                                    initiateDownload(file.id, file.name);
                                  }
                                }}
                                disabled={isLocked}
                                className={`resource-button ${isLocked ? 'resource-button-locked' : ''} flex items-center gap-2 px-4 py-2.5 font-medium text-sm text-white`}
                                style={{ fontFamily: 'var(--font-manrope)' }}
                              >
                                {isLocked && <Lock className="w-3.5 h-3.5" />}
                                {file.quizNumber ? (
                                  `${fileType === 'quiz' ? 'Quiz' : fileType === 'exam' ? 'Exam' : 'Test'} ${file.quizNumber}`
                                ) : (
                                  <span className="max-w-[150px] truncate">{file.displayName}</span>
                                )}
                                <Download className="w-3.5 h-3.5" />
                              </button>
                              
                              {/* File size tooltip - shows on hover */}
                              {file.size && (
                                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                  <div className="file-size-tooltip" style={{ fontFamily: 'var(--font-manrope)' }}>
                                    {getFileSize(file.size)}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            ))}
        </div>
      )}

      {/* No Results */}
      {!loading && filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg" style={{ fontFamily: 'var(--font-manrope)' }}>
            No resources found. Try adjusting your search or filters.
          </p>
        </div>
      )}

      <a ref={downloadRef} style={{ display: 'none' }} />
    </div>
  );
}
