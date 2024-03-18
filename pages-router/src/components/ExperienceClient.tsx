import React, { useEffect } from 'react';
import { createClient } from 'contentful';
import {
  ExperienceRoot,
  useFetchBySlug,
} from '@contentful/experiences-sdk-react';

interface ExperienceProps extends React.PropsWithChildren {}

const accessToken = process.env.NEXT_PUBLIC_CTFL_ACCESS_TOKEN!;
const previewToken = process.env.NEXT_PUBLIC_CTFL_PREVIEW_ACCESS_TOKEN!;
const space = process.env.NEXT_PUBLIC_CTFL_SPACE!;
const environment = process.env.NEXT_PUBLIC_CTFL_ENVIRONMENT!;
const domain = process.env.NEXT_PUBLIC_CTFL_DOMAIN;
const envExperienceTypeId = process.env.NEXT_PUBLIC_CTFL_EXPERIENCE_TYPE!;
const slug = 'homePage';

const mode = 'preview';
const isPreview = mode === 'preview';
const localeCode = 'en-US';

console.log('domain', domain);

const client = createClient({
  space,
  environment,
  host: isPreview ? `preview.${domain}` : `cdn.${domain}`,
  accessToken: isPreview ? previewToken : accessToken,
});

//This component doesn't render in SSR mode for it uses hooks to fetch data
const ExperienceClient: React.FC<ExperienceProps> = (props) => {
  const { experience, isLoading, error } = useFetchBySlug({
    client,
    slug: 'homePage',
    experienceTypeId: envExperienceTypeId,
    localeCode,
  });

  return <ExperienceRoot experience={experience} locale={localeCode} />;
};

export default ExperienceClient;
