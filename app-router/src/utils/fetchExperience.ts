import {
  createExperience,
  fetchBySlug,
} from '@contentful/experiences-sdk-react';
import { createClient } from 'contentful';

const accessToken = process.env.NEXT_PUBLIC_CTFL_ACCESS_TOKEN!;
const previewToken = process.env.NEXT_PUBLIC_CTFL_PREVIEW_ACCESS_TOKEN;
const space = process.env.NEXT_PUBLIC_CTFL_SPACE!;
const environment = process.env.NEXT_PUBLIC_CTFL_ENVIRONMENT!;
const domain = process.env.NEXT_PUBLIC_CTFL_DOMAIN;
const envExperienceTypeId = process.env.NEXT_PUBLIC_CTFL_EXPERIENCE_TYPE!;

const localeCode = 'en-US';

console.log('domain', domain);

const client = createClient({
  space,
  environment,
  host: `cdn.${domain}`,
  accessToken,
});

export const fetchExperience = async (slug: string) => {
  try {
    const experience = await fetchBySlug({
      client,
      slug: slug,
      experienceTypeId: envExperienceTypeId,
      localeCode,
    });
    return experience;

    // const filter = { 'fields.slug': slug };
    // const entries = await client.getEntries({
    //   content_type: envExperienceTypeId,
    //   locale: 'en-US',
    //   ...filter,
    // });

    // const experience = createExperience({
    //   experienceEntry: entries.items[0],
    //   referencedAssets: [],
    //   referencedEntries: [],
    //   locale: 'en-US',
    // });
    // return experience;
  } catch (error) {
    console.error('Error fetching experience', error);
  }
};
