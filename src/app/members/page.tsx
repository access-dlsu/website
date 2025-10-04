import Link from "next/link";
import Header from "../../components/header";
import { Footer } from "../../components/footer";
import { Users, UserCircle, Award, Star, TrendingUp, BookOpen } from "lucide-react";

export default function MembersPage() {
  const benefits = [
    {
      icon: BookOpen,
      title: "Exclusive Resources",
      description: "Access premium learning materials, past exam papers, and project templates."
    },
    {
      icon: Users,
      title: "Networking",
      description: "Connect with fellow members, alumni, and industry professionals."
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Get recognized for your contributions and achievements within the organization."
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Access exclusive internship opportunities and career guidance."
    }
  ];

  const officers = [
    {
      name: "John Doe",
      position: "President",
      year: "4th Year",
      image: "/placeholder-profile.jpg"
    },
    {
      name: "Jane Smith",
      position: "Vice President",
      year: "4th Year",
      image: "/placeholder-profile.jpg"
    },
    {
      name: "Mike Johnson",
      position: "Secretary",
      year: "3rd Year",
      image: "/placeholder-profile.jpg"
    },
    {
      name: "Sarah Williams",
      position: "Treasurer",
      year: "3rd Year",
      image: "/placeholder-profile.jpg"
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
              Members Hub
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-manrope)' }}>
              Join our community of passionate computer engineering students and unlock exclusive benefits
            </p>
          </section>

          {/* Quick Links */}
          <section className="flex justify-center gap-4 flex-wrap">
            <Link href="/members/directory" className="glass-card px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              <span className="text-white font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                Member Directory
              </span>
            </Link>
            <Link href="/members/officers" className="glass-card px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              <span className="text-white font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                Officers
              </span>
            </Link>
            <Link href="/members/alumni" className="glass-card px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              <span className="text-white font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                Alumni Network
              </span>
            </Link>
            <Link href="/members/benefits" className="glass-card px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              <span className="text-white font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                Benefits
              </span>
            </Link>
          </section>

          {/* Member Stats */}
          <section className="grid md:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-green-400 mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                500+
              </div>
              <div className="text-gray-300" style={{ fontFamily: 'var(--font-manrope)' }}>
                Active Members
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-green-400 mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                1000+
              </div>
              <div className="text-gray-300" style={{ fontFamily: 'var(--font-manrope)' }}>
                Alumni
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-green-400 mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                50+
              </div>
              <div className="text-gray-300" style={{ fontFamily: 'var(--font-manrope)' }}>
                Events/Year
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-green-400 mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                100%
              </div>
              <div className="text-gray-300" style={{ fontFamily: 'var(--font-manrope)' }}>
                Awesome
              </div>
            </div>
          </section>

          {/* Member Benefits */}
          <section className="space-y-6">
            <h2 className="text-4xl font-bold text-white text-center" style={{ fontFamily: 'var(--font-poppins)' }}>
              Member Benefits
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="glass-card p-6 rounded-xl hover:bg-white/10 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <benefit.icon className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                        {benefit.title}
                      </h3>
                      <p className="text-gray-300" style={{ fontFamily: 'var(--font-manrope)' }}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Officers Section */}
          <section className="space-y-6">
            <h2 className="text-4xl font-bold text-white text-center" style={{ fontFamily: 'var(--font-poppins)' }}>
              Our Officers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {officers.map((officer, index) => (
                <div key={index} className="glass-card p-6 rounded-xl text-center hover:bg-white/10 transition-all">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <UserCircle className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
                    {officer.name}
                  </h3>
                  <p className="text-green-400 mb-1" style={{ fontFamily: 'var(--font-manrope)' }}>
                    {officer.position}
                  </p>
                  <p className="text-gray-400 text-sm" style={{ fontFamily: 'var(--font-manrope)' }}>
                    {officer.year}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Join CTA */}
          <section className="glass-card p-8 rounded-2xl text-center">
            <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Become a Member Today
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-manrope)' }}>
              Join ACCESS and be part of a community that will support your academic and professional journey. 
              Membership is open to all Computer Engineering students at DLSU.
            </p>
            <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
              Join Now
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
