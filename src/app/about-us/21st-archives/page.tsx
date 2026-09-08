import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Star } from 'lucide-react';
import Image from 'next/image';

function Slide({ src, label }: { src: string; label: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-black/20">
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <Text variant="caption" className="text-gray-400 mt-2 text-center">
        {label}
      </Text>
    </div>
  );
}


function CreditBlock({ role, names }: { role: string; names: string[] }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 break-inside-avoid mb-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
        <Text
          variant="body"
          className="uppercase tracking-[0.15em] text-green-400 font-bold text-sm"
        >
          {role}
        </Text>
      </div>
      <div className="space-y-2">
        {names.map((name) => (
          <Text key={name} variant="body" className="text-gray-300 text-sm hover:text-white transition-colors cursor-default">
            {name}
          </Text>
        ))}
      </div>
    </div>
  );
}

const EXECUTIVE_BOARD = [
  { role: 'President', name: 'Angelica Gregorio' },
  { role: 'EVP for Internals', name: 'Elishah Angeline Antonio' },
  { role: 'EVP for Externals', name: 'Ron John Galvez' },
  { role: 'EVP for Operations', name: 'Christian John Alado' },
  { role: 'VP for Academics', name: 'Sophia Danielle Chua' },
  { role: 'VP for Affiliations', name: 'Russell Ian Eleydo' },
  { role: 'VP for Alliances', name: 'Raina Liane Zoleta' },
  { role: 'VP for Documentations', name: 'Alexander Gabriel Guinto' },
  { role: 'VP for Events', name: 'Zach Nathan Tonducan' },
  { role: 'VP for Finance', name: 'Josh Angelo Ty' },
  { role: 'VP for Human Resources', name: 'Johann Huang' },
  { role: 'VP for Logistics', name: 'Elijah Gabriel Yu' },
  { role: 'VP for Promotions', name: 'Xhane Paulei Batiller' },
];

const COMMITTEES = [
  {
    role: 'Promotions',
    names: ['Gabrielle Calma', 'Sophia Lansangan', 'Justine Lumilan', 'Charles Mercado', 'Justin Pallasigui', 'Yohann Rigo', 'Martin Valdez'],
  },
  {
    role: 'Finance',
    names: ['Johanna Alquitran', 'Alessandre Balmes', 'Evangeline Espiritu', 'Katrina Li Gao', 'Margaret Ramos', 'Ramon Recalde'],
  },
  {
    role: 'Logistics',
    names: ['Hanns Angsanto', 'Emmanuel Edreisa', 'Rilen Gawat', 'Jared Lofamia', 'Jaekel Pangan', 'Jules Reyes', 'Rogelio Sebua Jr.'],
  },
  {
    role: 'Documentations',
    names: ['Joshua Bout', 'Shamelle Mangubat', 'Mark Prieto', 'Eliseo Quinsaat IV', 'Carl Tafalla'],
  },
  {
    role: 'Alliances',
    names: ['Marc Lim', 'Aldrich Lotas', 'John Roa', 'Wayne Tolentino', 'Zamanttha Sahidulla'],
  },
  {
    role: 'Affiliations',
    names: ['Miguel Cabangon', 'Luis Cantor', 'Khyler Chua', 'Kirsten Cudo', 'Cyrill Dasalla', 'Miguel Lirazan', 'Ysabella Santos'],
  },
  {
    role: 'Events',
    names: ['Joshua Balingit', 'Caeljan Cristobal', 'Raizen Jocson', 'Janine Nobleza', 'John Politan'],
  },
  {
    role: 'Academics',
    names: ['Miguel Abad', 'Nathanael Bajamunde', 'Ryan So', 'Aaron Tristan', 'Ian Vahlois'],
  },
  {
    role: 'Human Resources',
    names: ['Jerome Cruz', 'Aaron Dionisio', 'Wendell Go', 'Evan Punzalan'],
  },
];

export default function Archives21stPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="space-y-12">
          <PageHeader
            title="21st ACCESS Accomplishments"
            description="Celebrating the milestones and achievements of our 21st year."
          />

          {/* Detailed Archives */}
          <Card size="full" className="p-8 mt-12">
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-8 h-8 text-yellow-400" />
              <Text variant="h2">
                The 21st Year in Review
              </Text>
            </div>

            <div className="space-y-8">
              {/* 1. General Assembly (SOCIAL ENGAGEMENTS) — 2 slides */}
              <div className="border-l-2 border-green-500/30 pl-6 pb-8 relative">
                <div className="absolute w-4 h-4 rounded-full bg-green-500 -left-[9px] top-1 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <Text variant="h3" className="mb-2">General Assembly</Text>
                <Text variant="body-relaxed" className="text-gray-400 mb-4">
                  Highlighting the start of the year with our General Assembly, bringing
                  together the entire ACCESS community.
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Slide src="/21st-archives/general-assembly/social-engagements-1.jpg" label="Social Engagements — ACCESS 21st Debut, ACe is Dating the Gangster, ACCESSChella" />
                  <Slide src="/21st-archives/general-assembly/social-engagements-2.jpg" label="Social Engagements — ACCESS Pantasya: CpE Month Culmination Night" />
                </div>
              </div>

              {/* 2. Seminars — 9 slides */}
              <div className="border-l-2 border-green-500/30 pl-6 pb-8 relative">
                <div className="absolute w-4 h-4 rounded-full bg-green-500 -left-[9px] top-1 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <Text variant="h3" className="mb-2">Seminars</Text>
                <Text variant="body-relaxed" className="text-gray-400 mb-4">
                  Empowering our members with industry-leading knowledge through various
                  technical and professional seminars.
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Slide src="/21st-archives/seminars/dungeons-and-datasets.jpg" label="Dungeons & Datasets: The Intelligence Behind the Machine" />
                  <Slide src="/21st-archives/seminars/startup-shooting-for-the-stars.jpg" label="Startup: Shooting for the Stars and Up" />
                  <Slide src="/21st-archives/seminars/tea-tactics-tech.jpg" label="Tea, Tactics, & Tech: A Beginner's Guide to Freelance Programming" />
                  <Slide src="/21st-archives/seminars/print-the-future.jpg" label="Print the Future: Introduction to 3D Modeling and Fabrication" />
                  <Slide src="/21st-archives/seminars/iteach-arduino.jpg" label="iTeach Arduino: The Future Starts with Those Who Dare to Learn" />
                  <Slide src="/21st-archives/seminars/ai-accessing-intelligence.jpg" label="AI: ACCESSing Intelligence Bridging Academe, Industry, and Society" />
                  <Slide src="/21st-archives/seminars/leap2026-hivemind.jpg" label="LEAP 2026: Hive Mind - Revolutionizing the Harvest with Swarm Robotics" />
                  <Slide src="/21st-archives/seminars/byte2026.jpg" label="ACCESS BYTE: Beyond Your Technical Expertise 2026" />
                  <Slide src="/21st-archives/seminars/ctrl-alt-delete.jpg" label="Ctrl + Alt + Delete: Control Your Stress, Alter the Mind, Delete Negativity" />
                </div>
              </div>

              {/* 3. Informative Materials — 1 slide */}
              <div className="border-l-2 border-green-500/30 pl-6 pb-8 relative">
                <div className="absolute w-4 h-4 rounded-full bg-green-500 -left-[9px] top-1 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <Text variant="h3" className="mb-2">Informative Materials</Text>
                <Text variant="body-relaxed" className="text-gray-400 mb-4">
                  Bite-sized, shareable content that made technical concepts easier to digest
                  for the ACCESS community.
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Slide src="/21st-archives/informative-materials/informative-materials.jpg" label="Informative Materials — Gotta Code Them All, ACE Your Debugging Skills, MythBugs, Trivia Bytes, CPE 7D's" />
                </div>
              </div>

              {/* 4. Academic Support / Reviewers — 2 slides */}
              <div className="border-l-2 border-green-500/30 pl-6 pb-8 relative">
                <div className="absolute w-4 h-4 rounded-full bg-green-500 -left-[9px] top-1 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <Text variant="h3" className="mb-2">Academic Support: Reviewers</Text>
                <Text variant="body-relaxed" className="text-gray-400 mb-4">
                  Providing comprehensive academic resources, reviewers, and study sessions to
                  help Computer Engineering students excel — &quot;ACCESSing Reviewers&quot; covered long
                  quizzes across the CpE curriculum this academic year.
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Slide src="/21st-archives/reviewers/academic-support.jpg" label="Academic Support — This Academic Year" />
                  <Slide src="/21st-archives/reviewers/reviewers.jpg" label="ACCESSing Reviewers" />
                </div>
              </div>

              {/* 5. Collaboration with the Department — 3 slides */}
              <div className="border-l-2 border-green-500/30 pl-6 pb-8 relative">
                <div className="absolute w-4 h-4 rounded-full bg-green-500 -left-[9px] top-1 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <Text variant="h3" className="mb-2">Collab with Department</Text>
                <Text variant="body-relaxed" className="text-gray-400 mb-4">
                  Working hand-in-hand with the DLSU Computer Engineering Department to align
                  goals and improve the student experience.
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Slide src="/21st-archives/collab-department/frosh-convocation.jpg" label="Collab with Department: Frosh Convocation" />
                  <Slide src="/21st-archives/collab-department/icpep2026-delegation.jpg" label="Collab with Department: ICPEP 2026 Delegation" />
                  <Slide src="/21st-archives/collab-department/greening2026.jpg" label="Collab with Department: Greening 2026" />
                </div>
              </div>

              {/* 6. ICpEP.se-NCR Involvement — 1 slide */}
              <div className="border-l-2 border-green-500/30 pl-6 pb-8 relative">
                <div className="absolute w-4 h-4 rounded-full bg-green-500 -left-[9px] top-1 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <Text variant="h3" className="mb-2">ICpEP.se NCR Involvement</Text>
                <Text variant="body-relaxed" className="text-gray-400 mb-4">
                  Actively participating and representing the university in the Institute of
                  Computer Engineers of the Philippines Student Edition - National Capital
                  Region (ICpEP.se-NCR).
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 max-w-2xl">
                  <Slide src="/21st-archives/icpep-ncr/icpep-ncr-involvement.jpg" label="ICpEP.se NCR Involvement" />
                </div>
              </div>

              {/* 7. Partnerships Established — 5 slides */}
              <div className="border-l-2 border-transparent pl-6 pb-2 relative">
                <div className="absolute w-4 h-4 rounded-full bg-green-500 -left-[9px] top-1 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <Text variant="h3" className="mb-2">Partnerships Established</Text>
                <Text variant="body-relaxed" className="text-gray-400 mb-4">
                  Forging strong ties with industry leaders, tech companies, and other student
                  organizations to create more opportunities.
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Slide src="/21st-archives/partnerships/animo-christmas.jpg" label="Partnerships Established — ANIMO Christmas, Arduino Day 2026, Baylayn 2026" />
                  <Slide src="/21st-archives/partnerships/community-partners.jpg" label="Partnerships Established — Community Partner Highlights, DataCamp Donates" />
                  <Slide src="/21st-archives/partnerships/dlsu-libraries.jpg" label="Partnerships Established — DLSU Libraries" />
                  <Slide src="/21st-archives/partnerships/sqz28-delegation.jpg" label="Partnerships Established — SQZ 28 Delegation and Partnership" />
                  <Slide src="/21st-archives/partnerships/leap2026-website.jpg" label="Partnerships Established — LEAP 2026 Website x CSO" />
                </div>
              </div>
            </div>
          </Card>

          {/* Credits */}
          <Card size="full" className="p-8 md:p-12 lg:p-16 bg-black/40">
            <div className="w-full mx-auto">
              <Text
                variant="h2"
                className="text-center uppercase tracking-[0.3em] mb-2 text-white"
              >
                21st Year Credits
              </Text>
              <Text variant="body-relaxed" className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                In recognition of the officers who made this year possible
              </Text>

              <Text
                variant="body"
                className="uppercase tracking-[0.25em] text-yellow-400 font-semibold text-center mb-10"
              >
                Executive Board
              </Text>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
                {EXECUTIVE_BOARD.map((eb) => (
                  <div key={eb.role} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-green-500/50 transition-all duration-300 text-center backdrop-blur-sm">
                    <Text variant="caption" className="uppercase tracking-[0.1em] text-green-400 font-semibold text-[10px] mb-1 block">
                      {eb.role}
                    </Text>
                    <Text variant="body" className="text-gray-200 font-medium text-sm">
                      {eb.name}
                    </Text>
                  </div>
                ))}
              </div>

              <Text
                variant="body"
                className="uppercase tracking-[0.25em] text-yellow-400 font-semibold text-center mb-10"
              >
                Committee Officers
              </Text>
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                {COMMITTEES.map((committee) => (
                  <CreditBlock key={committee.role} role={committee.role} names={committee.names} />
                ))}
              </div>

              <div className="border-t border-white/10 pt-10 mt-12 text-center">
                <Text variant="body-relaxed" className="text-gray-400 max-w-2xl mx-auto">
                  This year&apos;s accomplishments were made possible on behalf of the
                  tireless efforts of our Executive Board and all our committee officers.
                  To the entire ACCESS community — thank you for another year of growth,
                  collaboration, and achievement. Here&apos;s to the 22nd year ahead!
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}