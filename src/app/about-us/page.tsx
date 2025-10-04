export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
              About ACCESS
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-manrope)' }}>
              Association of Computer Engineering Students at De La Salle University
            </p>
          </section>

          {/* Mission & Vision */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                Our Mission
              </h2>
              <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'var(--font-manrope)' }}>
                To foster a community of passionate computer engineering students dedicated to 
                innovation, collaboration, and excellence in technology. We aim to provide resources, 
                opportunities, and support for our members to thrive academically and professionally.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                Our Vision
              </h2>
              <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'var(--font-manrope)' }}>
                To be the leading student organization that empowers future computer engineers 
                to become industry leaders, innovators, and change-makers in the rapidly evolving 
                world of technology.
              </p>
            </div>
          </section>

          {/* What We Do */}
          <section className="space-y-6">
            <h2 className="text-4xl font-bold text-white text-center" style={{ fontFamily: 'var(--font-poppins)' }}>
              What We Do
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Technical Workshops
                </h3>
                <p className="text-gray-300" style={{ fontFamily: 'var(--font-manrope)' }}>
                  Hands-on learning sessions covering the latest technologies and industry practices.
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Networking Events
                </h3>
                <p className="text-gray-300" style={{ fontFamily: 'var(--font-manrope)' }}>
                  Connect with industry professionals, alumni, and fellow students.
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Academic Support
                </h3>
                <p className="text-gray-300" style={{ fontFamily: 'var(--font-manrope)' }}>
                  Peer tutoring, study groups, and resource sharing for academic excellence.
                </p>
              </div>
            </div>
          </section>

          {/* History */}
          <section className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
              Our History
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-manrope)' }}>
              Founded at De La Salle University, ACCESS has been at the forefront of student 
              engagement in computer engineering for years. Our organization has grown from a 
              small group of passionate students to a thriving community that represents the 
              future of technology.
            </p>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'var(--font-manrope)' }}>
              Through the years, we&apos;ve organized countless events, workshops, and competitions 
              that have helped shape the careers of hundreds of students. Our alumni network 
              spans across leading tech companies worldwide.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
