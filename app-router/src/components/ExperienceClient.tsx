//in order to render, the component needs to be marked as client only, which will render this component and all children only on the client side
'use client';

import React from 'react';
import { createClient } from 'contentful';
import { ExperienceRoot, useFetchBySlug } from '@contentful/experiences-sdk-react';

interface ExperienceProps extends React.PropsWithChildren {}

const accessToken = process.env.NEXT_PUBLIC_CTFL_ACCESS_TOKEN!;
const previewToken = process.env.NEXT_PUBLIC_CTFL_PREVIEW_ACCESS_TOKEN;
const space = process.env.NEXT_PUBLIC_CTFL_SPACE!;
const environment = process.env.NEXT_PUBLIC_CTFL_ENVIRONMENT!;
const domain = process.env.NEXT_PUBLIC_CTFL_DOMAIN;
const envExperienceTypeId = process.env.NEXT_PUBLIC_CTFL_EXPERIENCE_TYPE!;

const localeCode = 'en-US';

const client = createClient({
  space,
  environment,
  host: `cdn.${domain}`,
  accessToken,
});

const ExperienceClient: React.FC<ExperienceProps> = () => {
  const { experience, isLoading, error } = useFetchBySlug({
    client,
    slug: 'homePage',
    experienceTypeId: envExperienceTypeId,
    localeCode,
  });
  return <ExperienceRoot experience={experience} locale={localeCode} />;
};

export default ExperienceClient;
