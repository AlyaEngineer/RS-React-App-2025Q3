import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import CharacterSkeleton from './CharacterItemSkeleton';

describe('CharacterSkeleton', () => {
  test('renders skeleton container', () => {
    render(<CharacterSkeleton />);
    const container = screen.getByRole('presentation');
    expect(container).toBeInTheDocument();
  });

  test('has role presentation and aria-label for screen readers', () => {
    render(<CharacterSkeleton />);
    const skeleton = screen.getByLabelText(/loading character preview/i);

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('role', 'presentation');
  });
});
