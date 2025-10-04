import Link from "next/link";
import Header from "../../components/header";
import { Footer } from "../../components/footer";
import { BookOpen, Code, Users, Award, Lightbulb } from "lucide-react";

export default function AcademicsPage() {
  const resources = [
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Access textbooks, lecture notes, and study materials curated by seniors and professors.",
      link: "/academics/resources"
    },
    {
      icon: Code,
      title: "Tutorials",
      description: "Step-by-step guides on programming languages, tools, and frameworks.",
      link: "/academics/tutorials"
    },
    {
      icon: Award,
      title: "Project Gallery",
      description: "Explore past projects and get inspiration for your own work.",
      link: "/academics/projects"
    },
    {
      icon: Users,
      title: "Mentorship Program",
      description: "Connect with upperclassmen and alumni for academic guidance.",
      link: "/academics/mentorship"
    }
  ];

  const courses = [
    {
      code: "COENGR1",
      name: "Introduction to Computer Engineering",
      resources: 15,
      difficulty: "Beginner"
    },
    {
      code: "COENGR2",
      name: "Digital Logic Design",
      resources: 23,
      difficulty: "Intermediate"
    },
    {
      code: "COENGR3",
      name: "Data Structures & Algorithms",
      resources: 31,
      difficulty: "Intermediate"
    },
    {
      code: "COENGR4",
      name: "Computer Architecture",
      resources: 18,
      difficulty: "Advanced"
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
              Academics
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-manrope)' }}>
              Your academic success is our priority. Access resources, tutorials, and mentorship to excel in your studies.
            </p>
          </section>

          {/* Resource Cards */}
          <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Link key={index} href={resource.link} className="glass-card p-6 rounded-xl hover:bg-white/10 transition-all group">
                <resource.icon className="w-12 h-12 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {resource.title}
                </h3>
                <p className="text-gray-300 text-sm" style={{ fontFamily: 'var(--font-manrope)' }}>
                  {resource.description}
                </p>
              </Link>
            ))}
          </section>

          {/* Quick Links */}
          <section className="flex justify-center gap-4 flex-wrap">
            <Link href="/academics/resources" className="glass-card px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              <span className="text-white font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                Learning Resources
              </span>
            </Link>
            <Link href="/academics/tutorials" className="glass-card px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              <span className="text-white font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                Tutorials
              </span>
            </Link>
            <Link href="/academics/projects" className="glass-card px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              <span className="text-white font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                Project Gallery
              </span>
            </Link>
            <Link href="/academics/mentorship" className="glass-card px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              <span className="text-white font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                Mentorship
              </span>
            </Link>
          </section>

          {/* Popular Courses */}
          <section className="space-y-6">
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
              Popular Course Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course, index) => (
                <div key={index} className="glass-card p-6 rounded-xl hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-green-400 font-mono text-sm" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                        {course.code}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1" style={{ fontFamily: 'var(--font-poppins)' }}>
                        {course.name}
                      </h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.difficulty === 'Beginner' ? 'bg-blue-500/20 text-blue-400' :
                      course.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`} style={{ fontFamily: 'var(--font-manrope)' }}>
                      {course.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4" style={{ fontFamily: 'var(--font-manrope)' }}>
                    {course.resources} resources available
                  </p>
                  <button className="text-green-400 hover:text-green-300 font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                    View Resources →
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Study Tips */}
          <section className="glass-card p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-8 h-8 text-yellow-400" />
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
                Study Tips from Seniors
              </h2>
            </div>
            <ul className="space-y-3 text-gray-300" style={{ fontFamily: 'var(--font-manrope)' }}>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Form study groups with classmates to discuss complex topics and share knowledge.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Practice coding problems daily on platforms like LeetCode and HackerRank.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Don&apos;t hesitate to ask questions during lectures or reach out to professors during office hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Work on personal projects to apply what you learn in class to real-world scenarios.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Join the mentorship program to get guidance from experienced seniors and alumni.</span>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
