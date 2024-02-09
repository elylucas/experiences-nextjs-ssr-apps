'use client';

import ExperienceClient from '@/components/ExperienceClient';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    console.log('Hello from the client side');
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <ExperienceClient />
      </div>
    </main>
  );
}
