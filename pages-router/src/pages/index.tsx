import ExperienceClient from '@/components/ExperienceClient';
import MyComponent from '@/components/MyComponent';
import React from 'react';

interface ExperienceProps extends React.PropsWithChildren {}

const Index: React.FC<ExperienceProps> = (props) => {

  return (
    <>    
      <MyComponent />
    </>
  );
};

export default Index;
