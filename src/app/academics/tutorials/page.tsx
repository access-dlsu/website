"use client";

import PageHeader from "@/components/ui/page-header";
import Placeholder from "@/components/ui/placeholder";

export default function TutorialsPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <PageHeader
        title="Tutorials"
        description="Step-by-step guides on programming languages and tools."
      >
        <Placeholder
          icon="Video"
          title="Learning Resources"
          message="Our comprehensive tutorial library is in development. Soon you'll have access to guides covering programming, development tools, and engineering concepts."
        />
      </PageHeader>
    </main>
  );
}
