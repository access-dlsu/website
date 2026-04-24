import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { Text } from '@/components/ui/text';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="space-y-12">
          <PageHeader
            title="About ACCESS"
            description="Association of Computer Engineering Students at De La Salle University"
          />

          {/* Mission & Vision */}
          <section className="grid md:grid-cols-2 gap-8">
            <Card size="full" className="p-8">
              <Text variant="h2" className="mb-4">
                Our Mission
              </Text>
              <Text variant="body-relaxed">
                To foster a community of passionate computer engineering students dedicated to 
                innovation, collaboration, and excellence in technology. We aim to provide resources, 
                opportunities, and support for our members to thrive academically and professionally.
              </Text>
            </Card>

            <Card size="full" className="p-8">
              <Text variant="h2" className="mb-4">
                Our Vision
              </Text>
              <Text variant="body-relaxed">
                To be the leading student organization that empowers future computer engineers 
                to become industry leaders, innovators, and change-makers in the rapidly evolving 
                world of technology.
              </Text>
            </Card>
          </section>

          {/* History */}
          <Card size="full" className="p-8">
            <Text variant="h2" className="mb-6">
              Our History
            </Text>
            <Text variant="body-relaxed" className="mb-4">
              Founded at De La Salle University, ACCESS has been at the forefront of student 
              engagement in computer engineering for years. Our organization has grown from a 
              small group of passionate students to a thriving community that represents the 
              future of technology.
            </Text>
            <Text variant="body-relaxed">
              Through the years, we&apos;ve organized countless events, workshops, and competitions 
              that have helped shape the careers of hundreds of students. Our alumni network 
              spans across leading tech companies worldwide.
            </Text>
          </Card>

          {/* What We Do */}
          <section className="space-y-6">
            <SectionHeader title="What We Do" className="mb-6" />
            <div className="grid md:grid-cols-3 gap-6">
              <Card size="full" className="p-6">
                <Text variant="h3" className="mb-3">
                  Technical Workshops
                </Text>
                <Text variant="body">
                  Hands-on learning sessions covering the latest technologies and industry practices.
                </Text>
              </Card>

              <Card size="full" className="p-6">
                <Text variant="h3" className="mb-3">
                  Networking Events
                </Text>
                <Text variant="body">
                  Connect with industry professionals, alumni, and fellow students.
                </Text>
              </Card>

              <Card size="full" className="p-6">
                <Text variant="h3" className="mb-3">
                  Academic Support
                </Text>
                <Text variant="body">
                  Peer tutoring, study groups, and resource sharing for academic excellence.
                </Text>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
