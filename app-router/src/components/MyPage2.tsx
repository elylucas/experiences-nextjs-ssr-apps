// pages/[locale]/[slug].tsx

import React, { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

import {
  ExperienceRoot,
} from '@contentful/experience-builder'
import { createClient } from 'contentful'

// the file where components are registered. The code is provided further in this document
import '@/registerComponents';

// you can reuse existing contentful client if you already have it in your project
const client = createClient({
  // your space id
  space: process.env.CTFL_SPACE_ID,
  // your environment id
  environment: process.env.CTFL_ENV_ID,
  // Supported values: 'preview.contentful.com' or 'cdn.contentful.com',
  host: process.env.CTFL_API_HOST
  // needs to be preview token if host = 'preview.contentful.com' and delivery token if 'cdn.contentful.com'
  accessToken: process.env.CTFL_TOKEN
});

// example of the experience type id
const experienceTypeId = 'article';

const Home = () => {
  const router = useRouter();
  const hasFetched = useRef(false);

  const { slug, locale } = router;

  // configure the sdk
  const { fetchBySlug, fetchById, experience, isFetching } = useFetchExperience({ client, mode: 'preview' })

  useEffect(() => {
    const asyncFetch = async () => {
       try {
          const experience = await fetchBySlug({ slug, locale, experienceTypeId });

          if (!experience) {
             // handle 404 case
          }
       } catch (e) {
         // handle error
       }
    };

    if (!hasFetched.current) {
      asyncFetch();
      hasFetched.current = true;
    }
  }, [slug, locale]);

  if (!experience) {
    return null;
  }

  return (
    <ExperienceRoot
      experience={experience}
      locale={locale}
    />
  );
}