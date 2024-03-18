//in order to render, the component needs to be marked as client only, which will render this component and all children only on the client side
'use client';

import React from 'react';
import { ExperienceRoot, createExperience } from '@contentful/experiences-sdk-react';
import { create } from 'domain';

interface ExperienceProps extends React.PropsWithChildren {
  experienceJSON: string;
}

const ExperienceClient: React.FC<ExperienceProps> = (props) => {
  const { experienceJSON } = props;
  const experience = createExperience(experienceJSON);
  return (
    <>
      <ExperienceRoot experience={experience} locale={'en-US'} />
    </>
  );
};

export default ExperienceClient;

// 'use client';

// import { ExperienceRoot } from '@contentful/experience-builder';
// import { createExperience } from '@contentful/experiences-core';
// import { useMemo } from 'react';

// export const Experience = ({ experienceJSON }: { experienceJSON: string }) => {
//   const experience = useMemo(
//     () => createExperience(experienceJSON),
//     [experienceJSON]
//   );
//   return <ExperienceRoot locale="en-US" experience={experience} />;
// };
