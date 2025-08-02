import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import Main from '@/features/pages/Main';

import Pagination from './Pagination';

function LocationDisplay() {
  const location = useLocation();
  return (
    <div data-testid="location-display">
      {location.pathname}
      {location.search}
    </div>
  );
}

describe('Pagination', () => {
  it('navigates to next page and updates URL and active button', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/1']}>
          <Routes>
            <Route path="/:page" element={<Main />} />
          </Routes>
          <LocationDisplay />
      </MemoryRouter>
    );

    const page1 = await screen.findByTestId('pagination-page-1');
    expect(page1).toBeDisabled();

    const nextButton = screen.getByTestId('next-page');
    await user.click(nextButton);

    const page2 = await screen.findByTestId('pagination-page-2');
    expect(page2).toBeInTheDocument();
    expect(page2).toBeDisabled();

    const locationDisplay = screen.getByTestId('location-display');
    expect(locationDisplay.textContent).toContain('/2');
  });

  it('disables previous and next buttons and renders only page 1 when totalPages is 1', () => {
    render(
      <MemoryRouter>
        <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
      </MemoryRouter>
    );

    const prevButton = screen.getByTestId('previous-page');
    const nextButton = screen.getByTestId('next-page');
    const pageButton = screen.getByTestId('pagination-page-1');

    void expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();

    expect(pageButton).toBeInTheDocument();
    expect(pageButton).toHaveTextContent('1');
  });

  it('does not show pagination when characters is null', async () => {
    render(
      <MemoryRouter initialEntries={['/?name=empty&page=1']}>
        <Main />
      </MemoryRouter>
    );

    const noResults = await screen.findByText(/Nothing found/i);
    expect(noResults).toBeInTheDocument();

    expect(screen.queryByTestId('previous-page')).toBeNull();
    expect(screen.queryByTestId('next-page')).toBeNull();
  });

  it('shows error message on API error', async () => {
    render(
      <MemoryRouter initialEntries={['/?name=error&page=1']}>
        <Main />
      </MemoryRouter>
    );

    const errorMsg = await screen.findByText(/Something went wrong/i);
    expect(errorMsg).toBeInTheDocument();
  });

  it('calls onPageChange with correct page number when a page button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnPageChange = vi.fn();

    render(
      <MemoryRouter>
        <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />
      </MemoryRouter>
    );

    const page3Button = screen.getByTestId('pagination-page-3');
    await user.click(page3Button);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with currentPage - 1 when clicking previous button', async () => {
    const user = userEvent.setup();
    const mockOnPageChange = vi.fn();

    render(
      <MemoryRouter>
        <Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />
      </MemoryRouter>
    );

    const prevButton = screen.getByTestId('previous-page');
    await user.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with currentPage + 1 when clicking next button', async () => {
    const user = userEvent.setup();
    const mockOnPageChange = vi.fn();

    render(
      <MemoryRouter>
        <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />
      </MemoryRouter>
    );

    const nextButton = screen.getByTestId('next-page');
    await user.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('does not call onPageChange when clicking disabled buttons', async () => {
    const user = userEvent.setup();
    const mockOnPageChange = vi.fn();

    render(
      <MemoryRouter>
        <Pagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange} />
      </MemoryRouter>
    );

    await user.click(screen.getByTestId('previous-page'));
    await user.click(screen.getByTestId('next-page'));
    await user.click(screen.getByTestId('pagination-page-1'));

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
