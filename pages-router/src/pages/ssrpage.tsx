import { createClient } from 'contentful';
import {
  fetchBySlug,
  ExperienceRoot,
  defineComponents,
} from '@contentful/experience-builder';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

const accessToken = process.env.NEXT_PUBLIC_CTFL_ACCESS_TOKEN!;
const previewToken = process.env.NEXT_PUBLIC_CTFL_PREVIEW_ACCESS_TOKEN;
const space = process.env.NEXT_PUBLIC_CTFL_SPACE!;
const environment = process.env.NEXT_PUBLIC_CTFL_ENVIRONMENT!;
const domain = process.env.NEXT_PUBLIC_CTFL_DOMAIN;
const envExperienceTypeId = process.env.NEXT_PUBLIC_CTFL_EXPERIENCE_TYPE!;

const mode = 'preview';
const localeCode = 'en-US';

const client = createClient({
  space,
  environment,
  host: `https://api.${domain}`,
  accessToken,
});

//This page has issues with serializing experience object. 
// Presumably because of the use of Maps (and perhaps methods) in the EntityStore
function SsrPage({
  experience,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main style={{ width: '100%' }}>
      <ExperienceRoot experience={experience} locale={'en-US'} />
    </main>
  );
}

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  const experience = await fetchBySlug({
    client,
    slug: 'homePage',
    experienceTypeId: envExperienceTypeId,
    mode,
    localeCode,
  });

  return {
    props: {
      experience,
    },
  };
};

export default SsrPage;
