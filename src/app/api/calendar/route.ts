import { NextResponse } from 'next/server';

interface Calendar {
  name: string,
  date: Date
}

const calendarData: Calendar[] = [
  { name: 'Git in Action', date: new Date(2025, 6-1, 4) },
  { name: 'Behind the Sheets: Automate with Apps Script', date: new Date(2025, 6-1, 11) },
  { name: 'TeXcellence', date: new Date(2025, 6-1, 18) },
  { name: 'LEAP 2025: Rank Up!', date: new Date(2025, 6-1, 20) },
  { name: 'Back to FireBASE-ics: Develop Your Backend with Firebase', date: new Date(2025, 6-1, 25) },
  { name: 'ACCESS the Matrix: An AIoT Workshop', date: new Date(2025, 7-1, 9) },
  { name: 'Full Throttle: ACCESS Grand Prix', date: new Date(2025, 7-1, 9) },
  { name: 'Ctrl + Alt + Dispose: Learning E-waste Disposal', date: new Date(2025, 7-1, 16) },
  { name: 'ACCESS Election 2025', date: new Date(2025, 7-1, 16) },
  { name: 'Debugging the Self', date: new Date(2025, 7-1, 19) },
  { name: 'BYTE: Beyond Your Technical Expertise 2025', date: new Date(2025, 7-1, 23) },
]

export async function GET() {
  return NextResponse.json(calendarData);
}
