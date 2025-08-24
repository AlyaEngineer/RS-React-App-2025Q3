import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { FormContent } from './FormContent';

vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node,
  };
});

describe('FormContent', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all required fields (uncontrolled form)', () => {
    render(<FormContent onClose={onClose} uncontrolled />);

    const placeholders = ['Name', 'Age', 'Email', 'Password', 'Confirm Password'];
    placeholders.forEach((text) => {
      expect(screen.getByPlaceholderText(text)).toBeInTheDocument();
    });

    expect(screen.getByRole('combobox', { name: /Gender/i })).toBeInTheDocument();
    expect(screen.getByText(/Accept Terms & Conditions/i)).toBeInTheDocument();
    expect(screen.getByTestId('uncontrolled-submit')).toBeInTheDocument();
  });

  it('shows validation errors on empty submit (uncontrolled form)', async () => {
    const user = userEvent.setup();
    render(<FormContent onClose={onClose} uncontrolled />);

    await user.click(screen.getByTestId('uncontrolled-submit'));

    expect(
      await screen.findByText(/Name must start with an uppercase letter/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Age must be a positive number/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email must use only Latin letters/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Password must contain only Latin characters/i)
    ).toBeInTheDocument();
  });

  it('disables submit button in Hook Form if invalid', () => {
    render(<FormContent onClose={onClose} />);
    const submitBtn = screen.getByTestId('hookform-submit');
    expect(submitBtn).toBeDisabled();
  });

  it('shows error messages in Hook Form for invalid data', async () => {
    const user = userEvent.setup();
    render(<FormContent onClose={onClose} />);

    await user.type(screen.getByPlaceholderText(/Name/i), 'alice');
    await user.type(screen.getByPlaceholderText(/Age/i), '-5');
    await user.type(screen.getByPlaceholderText(/Email/i), 'invalid-email');
    const passwordFields = screen.getAllByPlaceholderText(/Password/i);
    await user.type(passwordFields[0], 'abc');
    await user.type(passwordFields[1], 'abc');

    await user.click(screen.getByRole('checkbox', { name: /Accept Terms/i }));

    await user.click(screen.getByTestId('hookform-submit'));

    expect(
      await screen.findByText(/Name must start with an uppercase letter/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Age must be a positive number/i)).toBeInTheDocument();
    expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password must contain a number/i)).toBeInTheDocument();
  });
});
