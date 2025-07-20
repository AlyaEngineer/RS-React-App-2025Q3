import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ErrorBoundary from '@/features/components/errorHandling/ErrorBoundary';
import ErrorButton from '@/features/components/errorHandling/ErrorButton';
import Fallback from '@/features/components/errorHandling/Fallback';

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('catches error and displays fallback UI', async () => {
    render(
      <ErrorBoundary fallback={<Fallback />}>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', {
      name: /click me to trigger the error/i,
    });

    await userEvent.click(button);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('logs the error to console', async () => {
    const logSpy = vi.spyOn(console, 'log');

    render(
      <ErrorBoundary fallback={<Fallback />}>
        <ErrorButton />
      </ErrorBoundary>
    );

    await userEvent.click(screen.getByRole('button', { name: /click me to trigger the error/i }));

    expect(logSpy).toHaveBeenCalledWith('Error:', 'ErrorBoundary caught an error');
  });

  it('reloads page on "reload page" button click', async () => {
    const reloadMock = vi.fn();

    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        reload: reloadMock,
      },
      writable: true,
    });

    render(<Fallback />);
    const reloadButton = screen.getByRole('button', { name: /reload page/i });
    await userEvent.click(reloadButton);
    expect(reloadMock).toHaveBeenCalled();
  });
});
