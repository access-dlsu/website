"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Info,
  CalendarDays,
  GraduationCap,
  Users,
  Menu,
  BookOpen,
  UserCircle,
  Trophy,
  Bot,
  FileText,
  Plus,
  History,
  Wrench,
  Award,
  Library,
  Video,
  FolderOpen,
  HeartHandshake,
  UserCheck,
  Network,
  LogOut,
  AlertCircle,
  Lock,
  X,
} from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";

// Separate component for search params handling
import {
  NavbarLink,
  NavbarDropdownTrigger,
  DropdownMenu,
  type NavItem
} from "@/components/ui/navbar";

// Navigation Configuration
const NAV_CONFIG: NavItem[] = [
  {
    id: "about",
    label: "About Us",
    href: "/about-us",
    icon: Info,
  },
  {
    id: "events",
    label: "Events",
    icon: CalendarDays,
    isDropdown: true,
    dropdownContent: [
      {
        title: "Browse Events",
        items: [
          { label: "Upcoming Events", href: "/events/upcoming", icon: CalendarDays },
          { label: "Past Events", href: "/events/past", icon: History },
        ],
      },
      {
        title: "By Type",
        items: [
          { label: "Workshops", href: "/events/workshops", icon: Wrench },
          { label: "Competitions", href: "/events/competitions", icon: Award },
        ],
      },
    ],
  },
  {
    id: "academics",
    label: "Academics",
    icon: GraduationCap,
    isDropdown: true,
    dropdownContent: [
      {
        title: "Learn",
        items: [
          { label: "Resources", href: "/academics/resources", icon: Library },
          { label: "Tutorials", href: "/academics/tutorials", icon: Video },
        ],
      },
      {
        title: "Get Involved",
        items: [
          { label: "Project Gallery", href: "/academics/projects", icon: FolderOpen },
          { label: "Mentorship", href: "/academics/mentorship", icon: HeartHandshake },
        ],
      },
    ],
  },
  {
    id: "members",
    label: "Members",
    icon: Users,
    isDropdown: true,
    dropdownContent: [
      {
        title: "Directory",
        items: [
          { label: "Members", href: "/members/directory", icon: UserCheck },
          { label: "Officers", href: "/members/officers", icon: Users },
        ],
      },
      {
        title: "Community",
        items: [
          { label: "Alumni Network", href: "/members/alumni", icon: Network },
        ],
      },
    ],
  },
];

function AuthErrorHandler({
  onAuthError,
}: {
  onAuthError: (error: string | null) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams?.get("error");
    if (error === "AccessDenied") {
      onAuthError(
        "Only DLSU email addresses (@dlsu.edu.ph) are allowed to sign in.",
      );

      // Clear the error from URL
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete("error");
        window.history.replaceState({}, "", url.toString());
      }

      // Clear error message after 5 seconds
      const timer = setTimeout(() => onAuthError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, onAuthError]);

  return null;
}

const HeaderContent = ({
  authError,
  setAuthError,
}: {
  authError: string | null;
  setAuthError: (error: string | null) => void;
}) => {
  const { data: session, status } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  const [isCompressed, setIsCompressed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isLoginExpanded, setIsLoginExpanded] = useState(false); // Track login pill expansion
  const [isOfficer, setIsOfficer] = useState(false);
  const [officerChecked, setOfficerChecked] = useState(false);

  // When true, temporarily suppress the compress transition so revealing the navbar
  // from the hidden state displays instantly in the compressed layout without the
  // compress animation.
  const [suppressCompressTransition, setSuppressCompressTransition] =
    useState(false);

  // Memoize boolean to keep dependency array stable
  const hasActiveDropdown = useMemo(
    () => activeDropdown !== null,
    [activeDropdown],
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Close dropdown and exit focus mode when scrolling
      setActiveDropdown(null);
      setIsFocusMode(false);
      setIsLoginExpanded(false); // Close login pill on scroll

      // Show full header when at top (within 10px)
      if (currentScrollY < 10) {
        setIsVisible(true);
        setIsCompressed(false);
      }
      // Hide header when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Preserve the compressed state when hiding. If the navbar is currently
        // compressed and we force setIsCompressed(false) here, it briefly expands
        // to the default/full state before hiding — causing the unwanted animation.
        // To avoid that, only change visibility; keep `isCompressed` as-is so the
        // navbar hides directly from the compressed appearance.
        setIsVisible(false);
      }
      // Show compressed navbar when scrolling up (not at top)
      else if (currentScrollY < lastScrollY && currentScrollY > 100) {
        // If we're revealing from a hidden state, temporarily suppress the compress transition
        // so the navbar appears immediately in compressed form without the compress animation.
        if (!isVisible) {
          setIsVisible(true);
          setIsCompressed(true);
          setSuppressCompressTransition(true);
          // Restore transitions shortly after showing
          window.setTimeout(() => {
            setSuppressCompressTransition(false);
          }, 80);
        } else {
          setIsVisible(true);
          setIsCompressed(true);
        }
        // Don't reset isExpanded - keep it if already expanded
      }
      // Show full header when scrolling up near top
      else if (currentScrollY < lastScrollY && currentScrollY <= 100) {
        setIsVisible(true);
        setIsCompressed(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isVisible]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Check if click is inside login container
      const target = e.target as HTMLElement;
      if (target.closest('.login-container')) return;

      setActiveDropdown(null);
      setIsFocusMode(false); // Reset focus mode when clicking outside
      setIsLoginExpanded(false); // Close login pill when clicking outside
    };

    if (hasActiveDropdown || isLoginExpanded) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      if (hasActiveDropdown || isLoginExpanded) {
        document.removeEventListener("click", handleClickOutside);
      }
    };
  }, [hasActiveDropdown, isLoginExpanded]);

  // Check officer status when session changes
  useEffect(() => {
    const checkOfficerStatus = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch("/api/officers/check");
          const data = await response.json();
          setIsOfficer(data.isOfficer);
        } catch (error) {
          console.error("Error checking officer status:", error);
          setIsOfficer(false);
        }
      } else {
        setIsOfficer(false);
      }
      setOfficerChecked(true);
    };

    checkOfficerStatus();
  }, [session]);

  const handleCompressedClick = () => {
    // Toggle compressed state when user clicks the menu trigger
    setIsCompressed((prev) => !prev);
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
      setIsLoginExpanded(false); // Close login pill when opening dropdown
    }
  };

  const toggleLogin = () => {
    if (isLoginExpanded) {
      setIsLoginExpanded(false);
    } else {
      setIsLoginExpanded(true);
      setActiveDropdown(null); // Close any active dropdowns
      setIsFocusMode(false);
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

      {/* Header Wrapper to center Navbar and Pill together */}
      <div className={`header-wrapper ${isVisible ? "header-visible" : "header-hidden"}`}>
        <div className={`logo-container header-element ${isVisible && !isCompressed ? "header-visible" : "header-hidden"}`}>
          <div className="logo-pill">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center gap-2 h-full px-5"
            >
              <span className="flex items-center gap-2">
                <Image
                  src="/logo/access.svg"
                  alt="ACCESS DLSU Logo"
                  width={24}
                  height={24}
                  priority
                  className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                />
                <span className="brand-text text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                  ACCESS
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* Unified Navbar - switches between full and compressed states */}
        <div
          className={`navbar ${isCompressed ? "navbar-compressed" : ""} ${isFocusMode ? "navbar-focus-mode" : ""} ${suppressCompressTransition ? "navbar-no-compress-transition" : ""}`}
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

            {/* Navigation links - dynamically generated from config */}
            <nav className="navbar-links">
              {NAV_CONFIG.map((item) => {
                // Check officer requirements
                if (item.requiresOfficer && (!isOfficer || !officerChecked)) return null;

                if (item.isDropdown) {
                  return (
                    <NavbarDropdownTrigger
                      key={item.id}
                      item={item}
                      isActive={activeDropdown === item.id}
                      isFocusMode={isFocusMode}
                      toggleDropdown={toggleDropdown}
                    />
                  );
                } else {
                  return (
                    <NavbarLink
                      key={item.id}
                      item={item}
                      isFocusMode={isFocusMode}
                    />
                  );
                }
              })}
            </nav>
          </div>
        </div>

        <div className={`login-container ${session ? "logged-in" : ""}`}>
          <div
            className={`login-pill ${isLoginExpanded ? "expanded" : ""}`}
          >
            <div
              className="login-trigger"
              onClick={(e) => {
                e.stopPropagation(); // Prevent document click handler
                toggleLogin();
              }}
            >
              {session ? (
                // Show profile picture when logged in, X when expanded
                isLoginExpanded ? (
                  <span className="close-icon-wrapper">
                    <X className="w-7 h-7 close-icon" aria-hidden />
                  </span>
                ) : (
                  <>
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user?.name || "User"}
                        width={48}
                        height={48}
                        className="profile-picture"
                        onError={(e) => {
                          // Fallback to UserCircle icon if image fails to load
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget
                            .nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "block";
                        }}
                      />
                    ) : null}
                    <UserCircle
                      className="w-5 h-5 profile-fallback"
                      aria-hidden
                      style={{ display: session.user?.image ? "none" : "block" }}
                    />
                  </>
                )
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
                          alt={session.user?.name || "User"}
                          width={80}
                          height={80}
                          className="profile-picture-large"
                        />
                      ) : (
                        <UserCircle
                          className="w-20 h-20 profile-fallback-large"
                          aria-hidden
                        />
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
                      Sign in with your <strong>@dlsu.edu.ph</strong> email to
                      access exclusive resources and connect with the community.
                    </p>

                    <button
                      className="google-signin-button"
                      onClick={() => signIn("google")}
                      disabled={status === "loading"}
                    >
                      <svg
                        className="google-icon"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                      >
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      {status === "loading"
                        ? "Loading..."
                        : "Sign in with Google"}
                    </button>

                    <div className="login-perks">
                      <div className="perk-item">
                        <BookOpen className="w-4 h-4 perk-icon-svg" aria-hidden />
                        <span>Access learning materials</span>
                      </div>
                      <div className="perk-item">
                        <UserCircle
                          className="w-4 h-4 perk-icon-svg"
                          aria-hidden
                        />
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
      </div>

      {/* Dropdown menus - rendered outside navbar for independent blur */}
      {NAV_CONFIG.map((item) => (
        <DropdownMenu
          key={item.id}
          item={item}
          activeDropdown={activeDropdown}
          isCompressed={isCompressed}
        />
      ))}
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
