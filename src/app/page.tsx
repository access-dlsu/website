"use client";

import { CalendarDays, BookOpen, Users, Trophy, Network, Award } from "lucide-react";
import { Hero } from "@/components/ui/hero";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";
import { StatCard } from "@/components/ui/stat-card";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="relative">
        <Hero
          title={
            <>
              Welcome to <span className="text-green-400">ACCESS</span>
            </>
          }
          subtitle="Association of Computer Engineering Students"
          description="Empowering the next generation of computer engineers at De La Salle University through innovation, collaboration, and excellence."
          actions={
            <>
              <Button href="/about-us" variant="primary">
                Learn More About ACCESS
              </Button>
              <Button href="/events" variant="secondary">
                View Events
              </Button>
            </>
          }
        />

        <SectionContainer>
          <SectionHeader title="What We Offer" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={CalendarDays}
              title="Events"
              description="Join workshops, competitions, and networking events throughout the year."
              linkText="Explore Events"
              href="/events"
            />
            <FeatureCard
              icon={BookOpen}
              title="Academics"
              description="Access learning resources, tutorials, and mentorship programs."
              linkText="View Resources"
              href="/academics"
            />
            <FeatureCard
              icon={Users}
              title="Community"
              description="Connect with fellow students, alumni, and industry professionals."
              linkText="Join Community"
              href="/members"
            />
            <FeatureCard
              icon={Trophy}
              title="Excellence"
              description="Strive for excellence in academics, leadership, and innovation."
              linkText="Learn More"
            />
          </div>
        </SectionContainer>

        <SectionContainer>
          <SectionHeader title="Our Impact" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard
              icon={Users}
              value="300+"
              title="Active Members"
              description="Dedicated students driving innovation and excellence in computer engineering."
            />
            <StatCard
              icon={CalendarDays}
              value="50+"
              title="Events Per Year"
              description="Workshops, competitions, and networking opportunities throughout the academic year."
            />
            <StatCard
              icon={Network}
              value="400+"
              title="Alumni Network"
              description="Strong connections with successful graduates in industry and academia."
            />
            <StatCard
              icon={Award}
              value="20+"
              title="Years of Excellence"
              description="Two decades of fostering innovation and leadership in computer engineering."
            />
          </div>
        </SectionContainer>
      </main>
    </div>
  );
}