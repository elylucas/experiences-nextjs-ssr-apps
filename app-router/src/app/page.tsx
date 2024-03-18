// 'use client';

// import ExperienceClient from '@/components/ExperienceClient';
// import Image from 'next/image';
// import { useEffect } from 'react';

// export default function Home() {
//   return (
//     <main>
//       <div>
//         <ExperienceClient />
//       </div>
//     </main>
//   );
// }

'use server';

import { fetchExperience } from '@/utils/fetchExperience';
import ExperienceSsrClient from '../components/ExperienceSsrClient';

export default async function SsrPage() {
  const experience = await fetchExperience('homePage');
  return (
    <main>
      <ExperienceSsrClient experienceJSON={JSON.stringify(experience)} />
    </main>
  );
}
