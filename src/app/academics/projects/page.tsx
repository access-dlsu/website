"use client";

import PageHeader from "@/components/ui/page-header";
import Placeholder from "@/components/ui/placeholder";

export default function ProjectsPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <PageHeader
        title="Project Gallery"
        description="Explore past projects and get inspiration for your own work."
      >
        <Placeholder
          icon="FolderOpen"
          title="Project Showcase"
          message="Our project gallery is under construction. Soon you'll be able to explore student projects, capstone works, and innovative solutions developed by ACCESS members."
        />
      </PageHeader>
    </main>
  );
}
