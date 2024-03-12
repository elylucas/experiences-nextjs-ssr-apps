'use client';
import React from 'react';
import { createClient } from 'contentful';
import { ExperienceRoot, useFetchBySlug } from '@contentful/experience-builder';

const accessToken = process.env.NEXT_PUBLIC_CTFL_ACCESS_TOKEN!;
const space = process.env.NEXT_PUBLIC_CTFL_SPACE!;
const environment = process.env.NEXT_PUBLIC_CTFL_ENVIRONMENT!;
const experienceTypeId = process.env.NEXT_PUBLIC_CTFL_EXPERIENCE_TYPE!;

const localeCode = 'en-US';

const client = createClient({
  space,
  environment,
  accessToken,
});

const MyComponent: React.FC = (props) => {
  const { experience, isLoading, error } = useFetchBySlug({
    client,
    slug: 'homePage', //Could be fetched from the url,
    experienceTypeId: experienceTypeId,
    localeCode,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return <ExperienceRoot experience={experience} locale={localeCode} />;
};

export default MyComponent;
