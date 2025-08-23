import { NextResponse } from 'next/server';

// This is a sample data for announcements.
// After API Implementation is done, this will be replaced with data fetched from the server.
const announcements = [
  {
    title: "General Assembly 2025",
    description: "Join us for the first GA of the term! Meet the officers and learn about upcoming events.",
    date: "July 15, 2025",
    image: "/img/access.webp", // ✅ optional image
  },
  {
    title: "Project Proposal Deadline",
    description: "Submit your project ideas for the Capstone Expo by August 5.",
    date: "August 1, 2025",
    image: null, // ✅ no image
  },
];

export async function GET() {
  return NextResponse.json(announcements);
}
