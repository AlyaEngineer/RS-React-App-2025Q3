import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { RefreshButton } from './RefreshButton';

describe('RefreshButton', () => {
  it('renders without animate-spin when data are not fetching', () => {
    render(<RefreshButton onRefresh={() => {}} isFetching={false} />);
    const button = screen.getByRole('button', { name: /refresh-data/i });
    expect(button).toBeEnabled();
    expect(button.querySelector('svg')).not.toHaveClass('animate-spin');
  });

  it('renders with animate-spin and when data are fetching', () => {
    render(<RefreshButton onRefresh={() => {}} isFetching={true} />);
    const button = screen.getByRole('button', { name: /refresh-data/i });
    expect(button).toBeDisabled();
    expect(button.querySelector('svg')).toHaveClass('animate-spin');
  });

  it('calls onRefresh when clicked and when fetching is false', () => {
    const mockRefresh = vi.fn();
    render(<RefreshButton onRefresh={mockRefresh} isFetching={false} />);
    fireEvent.click(screen.getByRole('button', { name: /refresh-data/i }));
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it('does not call onRefresh when fetching is true', () => {
    const mockRefresh = vi.fn();
    render(<RefreshButton onRefresh={mockRefresh} isFetching={true} />);
    fireEvent.click(screen.getByRole('button', { name: /refresh-data/i }));
    expect(mockRefresh).not.toHaveBeenCalled();
  });
});
