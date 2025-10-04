"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-32 right-12 glass-card-3d p-4 rounded-full transition-all hover:scale-110 group">
          <ChevronUp className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
        </button>
      )}
    </>
  );
}