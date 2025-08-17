import type { AuthorInfo } from './types';

const authorData: AuthorInfo[] = [
  {
    name: 'Alla Tsaiukova',
    title: 'Junior Frontend Developer',
    bio: `34 years old, currently living in Serbia.
          My background is in 3D modeling and production — I produced detailed construction documentation and created physical products based on it.
          I chose frontend development to gain the freedom of remote work, explore a new creative field, and finally say goodbye to the daily office routine.`,
    skills: `JavaScript, TypeScript, HTML, CSS, TailwindCss, shadcn/ui, Zustand, SWR, React, Git/GitHub, Vite, Webpack, Vitest, React testing library`,
    contributions: [
      'Configured and integrated the Commercetools Merchant Center',
      'Implemented the CommerceTools admin panel',
      'Developed the website header and profile page',
      'Handled data processing between frontend and backend effectively',
      'Implemented the 404 error page',
      'Developed responsive, mobile-friendly layouts',
      'Built centralized routing logic for page navigation',
      'Implemented logout functionality',
    ],
    education: [
      {
        instituteName: 'RS School, JS / Front-end Course 2024Q4',
        certificate: 'https://app.rs.school/certificate/wj6vvkn3',
      },
      {
        instituteName: 'RS School, React Course 2025Q3',
        certificate: '',
      },
    ],
    url: {
      image: '/girl.svg',
      gitHub: 'https://github.com/AlyaEngineer',
      linkedIn: 'https://www.linkedin.com/in/alla-tsaiukova-033ba92b8/',
    },
  },
];

export default authorData;
