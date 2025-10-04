'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import PageLayout from '@/components/page-layout';

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
        style={{ paddingBottom: '6rem' }}
      >
        {children}
      </motion.div>
    </PageLayout>
  );
}
