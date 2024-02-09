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

//This page serializes the experience manually and reconstructs it in the component.
//However, the ExperienceRoot currently does not show anything when passed this experience.
function SsrPage({
  experienceJSON,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const experience = JSON.parse(experienceJSON);
  
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

  const experienceJSON = JSON.stringify(experience);

  return {
    props: {
      experienceJSON,
    },
  };
};

export default SsrPage;
