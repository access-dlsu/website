'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Home as HomeIcon, Info, CalendarDays, GraduationCap, Users, Lock, Menu, BookOpen, UserCircle, Trophy, Bot, FileText, Plus, ChevronDown, Clock, History, Wrench, Award, Library, Video, FolderOpen, HeartHandshake, UserCheck, Network, Gift, LogOut, AlertCircle } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";

// Separate component for search params handling
function AuthErrorHandler({ onAuthError }: { onAuthError: (error: string | null) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams?.get('error');
    if (error === 'AccessDenied') {
      onAuthError('Only DLSU email addresses (@dlsu.edu.ph) are allowed to sign in.');
      
      // Clear the error from URL
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('error');
        window.history.replaceState({}, '', url.toString());
      }
      
      // Clear error message after 5 seconds
      const timer = setTimeout(() => onAuthError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, onAuthError]);

  return null;
}

function HeaderContent({ authError, setAuthError }: { authError: string | null; setAuthError: (error: string | null) => void }) {
  const { data: session, status } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  const [isCompressed, setIsCompressed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Memoize boolean to keep dependency array stable
  const hasActiveDropdown = useMemo(() => activeDropdown !== null, [activeDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Close dropdown and exit focus mode when scrolling
      setActiveDropdown(null);
      setIsFocusMode(false);

      // Show full header when at top (within 10px)
      if (currentScrollY < 10) {
        setIsVisible(true);
        setIsCompressed(false);
        setIsExpanded(false);
      } 
      // Hide header when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsCompressed(false);
        setIsExpanded(false);
      } 
      // Show compressed navbar when scrolling up (not at top)
      else if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setIsVisible(true);
        setIsCompressed(true);
        // Don't reset isExpanded - keep it if already expanded
      }
      // Show full header when scrolling up near top
      else if (currentScrollY < lastScrollY && currentScrollY <= 100) {
        setIsVisible(true);
        setIsCompressed(false);
        setIsExpanded(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
      setIsFocusMode(false); // Reset focus mode when clicking outside
    };
    
    if (hasActiveDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      if (hasActiveDropdown) {
        document.removeEventListener('click', handleClickOutside);
      }
    };
  }, [hasActiveDropdown]); // Use memoized boolean

  const handleCompressedClick = () => {
    // Only expand, don't toggle back
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const toggleDropdown = (dropdownName: string) => {
    if (activeDropdown === dropdownName) {
      // Closing dropdown
      setActiveDropdown(null);
      setIsFocusMode(false);
    } else {
      // Opening dropdown
      setActiveDropdown(dropdownName);
      setIsFocusMode(true);
    }
  };

  return (
    <>
      {/* Error notification for authentication failures */}
      {authError && (
        <div className="auth-error-notification">
          <AlertCircle className="w-5 h-5" aria-hidden />
          <span>{authError}</span>
          <button 
            onClick={() => setAuthError(null)} 
            className="auth-error-close"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}

      <Link href="/" aria-label="Home" className={`fixed top-4 logo-offset header-element ${isVisible && !isCompressed ? 'header-visible' : 'header-hidden'}`}>
        <span className="flex items-center gap-2">
          <Image src="/logo/access.svg" alt="ACCESS DLSU Logo" width={48} height={48} priority className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
          <span className="brand-text text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">ACCESS</span>
        </span>
      </Link>
      
      {/* Unified Navbar - switches between full and compressed states */}
      <div 
        className={`navbar ${isVisible ? 'header-visible' : 'header-hidden'} ${isCompressed ? 'navbar-compressed' : ''} ${isExpanded ? 'navbar-expanded' : ''} ${isFocusMode ? 'navbar-focus-mode' : ''}`}
      >
        <div className="navbar-content">
          {/* Compressed trigger - only visible when compressed and not expanded */}
          <button 
            className="navbar-trigger"
            onClick={handleCompressedClick}
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-4 h-4" aria-hidden />
            <span className="navbar-label">Navigation Bar</span>
          </button>
          
          {/* Navigation links - always present */}
          <nav className="navbar-links">
            <Link className={`navbar-item ${isFocusMode ? 'navbar-item-hidden' : ''}`} href="/">
              <span className="inline-flex items-center gap-1.5">
                <HomeIcon className="w-4 h-4" aria-hidden />
                <span>Home</span>
              </span>
            </Link>
            <Link className={`navbar-item ${isFocusMode ? 'navbar-item-hidden' : ''}`} href="/about-us">
              <span className="inline-flex items-center gap-1.5">
                <Info className="w-4 h-4" aria-hidden />
                <span>About Us</span>
              </span>
            </Link>
            
            {/* Events dropdown trigger */}
            <div className={`navbar-dropdown ${activeDropdown === 'events' ? 'navbar-dropdown-active' : ''} ${isFocusMode && activeDropdown !== 'events' ? 'navbar-item-hidden' : ''}`}>
              <button 
                className="navbar-dropdown-trigger hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown('events');
                }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4" aria-hidden />
                  <span>Events</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'events' ? 'rotate-180' : ''}`} aria-hidden />
                </span>
              </button>
            </div>
            
            {/* Academics dropdown trigger */}
            <div className={`navbar-dropdown ${activeDropdown === 'academics' ? 'navbar-dropdown-active' : ''} ${isFocusMode && activeDropdown !== 'academics' ? 'navbar-item-hidden' : ''}`}>
              <button 
                className="navbar-dropdown-trigger hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown('academics');
                }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" aria-hidden />
                  <span>Academics</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'academics' ? 'rotate-180' : ''}`} aria-hidden />
                </span>
              </button>
            </div>
            
            {/* Members Hub dropdown trigger */}
            <div className={`navbar-dropdown ${activeDropdown === 'members' ? 'navbar-dropdown-active' : ''} ${isFocusMode && activeDropdown !== 'members' ? 'navbar-item-hidden' : ''}`}>
              <button 
                className="navbar-dropdown-trigger hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown('members');
                }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Users className="w-4 h-4" aria-hidden />
                  <span>Members Hub</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'members' ? 'rotate-180' : ''}`} aria-hidden />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Dropdown menus - rendered outside navbar for independent blur */}
      {activeDropdown === 'events' && (!isCompressed || isExpanded) && (
        <div className="dropdown-menu-container">
          <div className="navbar-dropdown-menu">
            <div className="dropdown-section">
              <div className="dropdown-subcategory">Events Calendar</div>
              <div className="dropdown-items-row">
                <Link href="/events/upcoming" className="navbar-dropdown-item">
                  <Clock className="w-4 h-4" aria-hidden />
                  <span>Upcoming Events</span>
                </Link>
                <Link href="/events/past" className="navbar-dropdown-item">
                  <History className="w-4 h-4" aria-hidden />
                  <span>Past Events</span>
                </Link>
              </div>
            </div>
            
            <div className="dropdown-section">
              <div className="dropdown-subcategory">Event Types</div>
              <div className="dropdown-items-row">
                <Link href="/events/workshops" className="navbar-dropdown-item">
                  <Wrench className="w-4 h-4" aria-hidden />
                  <span>Workshops</span>
                </Link>
                <Link href="/events/competitions" className="navbar-dropdown-item">
                  <Award className="w-4 h-4" aria-hidden />
                  <span>Competitions</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeDropdown === 'academics' && (!isCompressed || isExpanded) && (
        <div className="dropdown-menu-container">
          <div className="navbar-dropdown-menu">
            <div className="dropdown-section">
              <div className="dropdown-subcategory">Learning Materials</div>
              <div className="dropdown-items-row">
                <Link href="/academics/resources" className="navbar-dropdown-item">
                  <Library className="w-4 h-4" aria-hidden />
                  <span>Learning Resources</span>
                </Link>
                <Link href="/academics/tutorials" className="navbar-dropdown-item">
                  <Video className="w-4 h-4" aria-hidden />
                  <span>Tutorials</span>
                </Link>
              </div>
            </div>
            
            <div className="dropdown-section">
              <div className="dropdown-subcategory">Student Work</div>
              <div className="dropdown-items-row">
                <Link href="/academics/projects" className="navbar-dropdown-item">
                  <FolderOpen className="w-4 h-4" aria-hidden />
                  <span>Project Gallery</span>
                </Link>
                <Link href="/academics/mentorship" className="navbar-dropdown-item">
                  <HeartHandshake className="w-4 h-4" aria-hidden />
                  <span>Mentorship Program</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeDropdown === 'members' && (!isCompressed || isExpanded) && (
        <div className="dropdown-menu-container">
          <div className="navbar-dropdown-menu">
            <div className="dropdown-section">
              <div className="dropdown-subcategory">Member Directory</div>
              <div className="dropdown-items-row">
                <Link href="/members/directory" className="navbar-dropdown-item">
                  <UserCheck className="w-4 h-4" aria-hidden />
                  <span>Member Directory</span>
                </Link>
                <Link href="/members/officers" className="navbar-dropdown-item">
                  <Users className="w-4 h-4" aria-hidden />
                  <span>Officers</span>
                </Link>
              </div>
            </div>
            
            <div className="dropdown-section">
              <div className="dropdown-subcategory">Community</div>
              <div className="dropdown-items-row">
                <Link href="/members/alumni" className="navbar-dropdown-item">
                  <Network className="w-4 h-4" aria-hidden />
                  <span>Alumni Network</span>
                </Link>
                <Link href="/members/benefits" className="navbar-dropdown-item">
                  <Gift className="w-4 h-4" aria-hidden />
                  <span>Member Benefits</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`login-container header-element ${isVisible && !isCompressed ? 'header-visible' : 'header-hidden'}`}>
        <div className="login-pill">
          <div className="login-trigger">
            {session ? (
              // Show profile picture when logged in
              <>
                {session.user?.image ? (
                  <Image 
                    src={session.user.image} 
                    alt={session.user?.name || 'User'} 
                    width={40}
                    height={40}
                    className="profile-picture"
                    onError={(e) => {
                      // Fallback to UserCircle icon if image fails to load
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                ) : null}
                <UserCircle 
                  className="w-5 h-5 profile-fallback" 
                  aria-hidden
                  style={{ display: session.user?.image ? 'none' : 'block' }}
                />
              </>
            ) : (
              // Show lock icon when not logged in
              <>
                <Lock className="w-4 h-4" aria-hidden />
                <span>Login</span>
              </>
            )}
          </div>
          
          <div className="login-expanded">
            <div className="login-expanded-content">
              {session ? (
                // Logged in state
                <>
                  <div className="profile-header">
                    {session.user?.image ? (
                      <Image 
                        src={session.user.image} 
                        alt={session.user?.name || 'User'} 
                        width={80}
                        height={80}
                        className="profile-picture-large"
                      />
                    ) : (
                      <UserCircle className="w-20 h-20 profile-fallback-large" aria-hidden />
                    )}
                    <h3 className="profile-name">{session.user?.name}</h3>
                    <p className="profile-email">{session.user?.email}</p>
                  </div>
                  
                  <button 
                    className="google-signin-button signout-button"
                    onClick={() => signOut()}
                  >
                    <LogOut className="w-5 h-5" aria-hidden />
                    Sign out
                  </button>
                </>
              ) : (
                // Logged out state
                <>
                  <div className="login-header">
                    <Lock className="w-5 h-5" aria-hidden />
                    <h3>Member Login</h3>
                  </div>
                  
                  <p className="login-description">
                    Sign in with your <strong>@dlsu.edu.ph</strong> email to access exclusive resources and connect with the community.
                  </p>
                  
                  <button 
                    className="google-signin-button"
                    onClick={() => signIn("google")}
                    disabled={status === "loading"}
                  >
                    <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {status === "loading" ? "Loading..." : "Sign in with Google"}
                  </button>
                  
                  <div className="login-perks">
                    <div className="perk-item">
                      <BookOpen className="w-4 h-4 perk-icon-svg" aria-hidden />
                      <span>Access learning materials</span>
                    </div>
                    <div className="perk-item">
                      <UserCircle className="w-4 h-4 perk-icon-svg" aria-hidden />
                      <span>Alumni Directory</span>
                    </div>
                    <div className="perk-item">
                      <Trophy className="w-4 h-4 perk-icon-svg" aria-hidden />
                      <span>Challenges</span>
                    </div>
                    <div className="perk-item">
                      <Bot className="w-4 h-4 perk-icon-svg" aria-hidden />
                      <span>Ace The Assistant</span>
                    </div>
                    <div className="perk-item">
                      <FileText className="w-4 h-4 perk-icon-svg" aria-hidden />
                      <span>Blog Post</span>
                    </div>
                    <div className="perk-item">
                      <Plus className="w-4 h-4 perk-icon-svg" aria-hidden />
                      <span>More to Come Soon...</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Header() {
  const [authError, setAuthError] = useState<string | null>(null);
  
  return (
    <>
      <Suspense fallback={null}>
        <AuthErrorHandler onAuthError={setAuthError} />
      </Suspense>
      <HeaderContent authError={authError} setAuthError={setAuthError} />
    </>
  );
}