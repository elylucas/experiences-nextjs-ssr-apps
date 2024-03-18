'use server';

import { fetchExperience } from '@/utils/fetchExperience';
import ExperienceSsrClient from '../../components/ExperienceSsrClient';

export default async function SsrPage() {
  const experience = await fetchExperience('homePage');
  console.log('experience from fetch', {experience})
  return (
    <main>
      <ExperienceSsrClient experienceJSON={JSON.stringify(experience)} />
    </main>
  );
}
