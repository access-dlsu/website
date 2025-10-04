import Link from "next/link";
import Header from "../../components/header";
import { Footer } from "../../components/footer";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";

export default function EventsPage() {
  const upcomingEvents = [
    {
      title: "Tech Talk: AI in Modern Applications",
      date: "October 15, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "DLSU Gokongwei Hall",
      attendees: 120,
      category: "Workshop"
    },
    {
      title: "Hackathon 2025",
      date: "October 25-26, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "DLSU Innovation Center",
      attendees: 200,
      category: "Competition"
    },
    {
      title: "Career Fair: Meet Tech Companies",
      date: "November 5, 2025",
      time: "10:00 AM - 5:00 PM",
      location: "DLSU Yuchengco Hall",
      attendees: 300,
      category: "Networking"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
              Events
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-manrope)' }}>
              Join us for exciting workshops, competitions, and networking opportunities
            </p>
          </section>

          {/* Quick Links */}
          <section className="flex justify-center gap-4 flex-wrap">
            <Link href="/events/upcoming" className="glass-card px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              <span className="text-white font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                Upcoming Events
              </span>
            </Link>
            <Link href="/events/past" className="glass-card px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              <span className="text-white font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                Past Events
              </span>
            </Link>
            <Link href="/events/workshops" className="glass-card px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              <span className="text-white font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                Workshops
              </span>
            </Link>
            <Link href="/events/competitions" className="glass-card px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              <span className="text-white font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                Competitions
              </span>
            </Link>
          </section>

          {/* Upcoming Events */}
          <section className="space-y-6">
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
              Upcoming Events
            </h2>
            <div className="grid gap-6">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="glass-card p-6 rounded-xl hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm mb-2" style={{ fontFamily: 'var(--font-manrope)' }}>
                        {event.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
                        {event.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-300" style={{ fontFamily: 'var(--font-manrope)' }}>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-green-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-400" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-400" />
                      <span>{event.attendees} expected</span>
                    </div>
                  </div>

                  <button className="mt-4 px-6 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-full transition-colors" style={{ fontFamily: 'var(--font-manrope)' }}>
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="glass-card p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Stay Updated
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-manrope)' }}>
              Don&apos;t miss out on our latest events and workshops. Follow us on social media or log in to get personalized event notifications.
            </p>
            <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
              Follow Us
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
