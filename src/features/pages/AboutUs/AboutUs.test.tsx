import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import AboutUs from './AboutUs';
import type { AuthorInfo } from './types';

const mockAuthor: AuthorInfo = {
  name: 'Alla Tsaiukova',
  title: 'Some title',
  bio: 'Bio about the author',
  skills: 'JavaScript, TypeScript, React',
  contributions: [],
  education: [
    {
      instituteName: 'RS School, JS / Front-end Course 2024Q4',
      certificate: 'https://app.rs.school/certificate/example-cert',
    },
    {
      instituteName: 'RS School, React Course 2025Q3',
      certificate: '',
    },
  ],
  url: {
    image: 'https://example.com/image.jpg',
    gitHub: 'https://example.com/AlyaEngineer',
  },
};

describe('AboutUs page', () => {
  it('renders author information', () => {
    render(
      <MemoryRouter>
        <AboutUs author={mockAuthor} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Alla Tsaiukova/i)).toBeInTheDocument();
    expect(screen.getByText(/Bio about the author/i)).toBeInTheDocument();
  });

  it('contains link to RS School ReactJS course for 2024Q4', () => {
    render(
      <MemoryRouter>
        <AboutUs author={mockAuthor} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', {
      name: 'RS School, React Course 2025Q3',
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });

  it('renders author image with correct src and alt', () => {
    render(
      <MemoryRouter>
        <AboutUs author={mockAuthor} />
      </MemoryRouter>
    );
    const img = screen.getByAltText(mockAuthor.name);
    expect(img).toHaveAttribute('src', mockAuthor.url.image);
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
  });
});
