import Link from "next/link";
import { CalendarDays, BookOpen, Users, Trophy, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="relative">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-2xl" style={{ fontFamily: 'var(--font-poppins)' }}>
              Welcome to <span className="text-green-400">ACCESS</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg" style={{ fontFamily: 'var(--font-manrope)' }}>
              Association of Computer Engineering Students
            </p>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-manrope)' }}>
              Empowering the next generation of computer engineers at De La Salle University through innovation, collaboration, and excellence.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/about" className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all font-semibold text-lg shadow-lg hover:shadow-green-500/50 hover:scale-105" style={{ fontFamily: 'var(--font-manrope)' }}>
                Learn More
              </Link>
              <Link href="/events" className="px-8 py-4 glass-card hover:bg-white/20 text-white rounded-full transition-all font-semibold text-lg shadow-lg" style={{ fontFamily: 'var(--font-manrope)' }}>
                View Events
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16" style={{ fontFamily: 'var(--font-poppins)' }}>
              What We Offer
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Link href="/events" className="glass-card p-8 rounded-2xl hover:bg-white/10 transition-all group">
                <CalendarDays className="w-12 h-12 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Events
                </h3>
                <p className="text-gray-300 mb-4" style={{ fontFamily: 'var(--font-manrope)' }}>
                  Join workshops, competitions, and networking events throughout the year.
                </p>
                <span className="text-green-400 flex items-center gap-2 font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                  Explore Events <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link href="/academics" className="glass-card p-8 rounded-2xl hover:bg-white/10 transition-all group">
                <BookOpen className="w-12 h-12 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Academics
                </h3>
                <p className="text-gray-300 mb-4" style={{ fontFamily: 'var(--font-manrope)' }}>
                  Access learning resources, tutorials, and mentorship programs.
                </p>
                <span className="text-green-400 flex items-center gap-2 font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                  View Resources <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link href="/members" className="glass-card p-8 rounded-2xl hover:bg-white/10 transition-all group">
                <Users className="w-12 h-12 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Community
                </h3>
                <p className="text-gray-300 mb-4" style={{ fontFamily: 'var(--font-manrope)' }}>
                  Connect with fellow students, alumni, and industry professionals.
                </p>
                <span className="text-green-400 flex items-center gap-2 font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                  Join Community <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <div className="glass-card p-8 rounded-2xl hover:bg-white/10 transition-all group">
                <Trophy className="w-12 h-12 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Excellence
                </h3>
                <p className="text-gray-300 mb-4" style={{ fontFamily: 'var(--font-manrope)' }}>
                  Strive for excellence in academics, leadership, and innovation.
                </p>
                <span className="text-green-400 flex items-center gap-2 font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card p-12 rounded-3xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
                Our Impact
              </h2>
              
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-400 mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                    500+
                  </div>
                  <div className="text-gray-300 text-lg" style={{ fontFamily: 'var(--font-manrope)' }}>
                    Active Members
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-400 mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                    50+
                  </div>
                  <div className="text-gray-300 text-lg" style={{ fontFamily: 'var(--font-manrope)' }}>
                    Events Per Year
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-400 mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                    1000+
                  </div>
                  <div className="text-gray-300 text-lg" style={{ fontFamily: 'var(--font-manrope)' }}>
                    Alumni Network
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-400 mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                    10+
                  </div>
                  <div className="text-gray-300 text-lg" style={{ fontFamily: 'var(--font-manrope)' }}>
                    Years of Excellence
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
              Ready to Join Us?
            </h2>
            <p className="text-xl text-gray-300" style={{ fontFamily: 'var(--font-manrope)' }}>
              Become part of a thriving community of computer engineering students dedicated to innovation and excellence.
            </p>
            <button className="px-10 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all font-semibold text-lg shadow-lg hover:shadow-green-500/50 hover:scale-105" style={{ fontFamily: 'var(--font-manrope)' }}>
              Become a Member
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
