import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import Main from '@/features/pages/Main';

describe('Main Pagination', () => {
  it('disables previous button on first page', () => {
    render(
      <MemoryRouter initialEntries={['/?name=rick&page=1']}>
        <Main />
      </MemoryRouter>
    );

    const prevButton = screen.getByTestId('previous-page');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <MemoryRouter initialEntries={['/?name=rick&page=5']}>
        <Main />
      </MemoryRouter>
    );

    const nextButton = screen.getByTestId('next-page');
    expect(nextButton).toBeDisabled();
  });
});
