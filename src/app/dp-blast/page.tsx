import type { Metadata } from 'next';
import DPBlast from './client';

export const metadata: Metadata = {
  title: 'ACCESS DP Blast Maker',
  description: 'Create your own custom framed pictures from ACCESS DLSU!',
  openGraph: {
    title: 'ACCESS DP Blast Maker',
    description: 'Create your own custom framed pictures from ACCESS DLSU!',
    images: [{
      url: "https://accessdlsu.com/logo/access_wordmark.png",
    }],
  },
};

export default function DPBlastPage() {
  return <DPBlast />;
}
