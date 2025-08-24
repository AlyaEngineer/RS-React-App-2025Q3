import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { FormCard } from './FormCard';

const mockData = {
  name: 'John Doe',
  age: '30',
  gender: 'Male',
  country: 'USA',
  email: 'john@example.com',
  password: 'password123',
  confirmPassword: 'password123',
  acceptTnC: true,
  picture: 'https://example.com/pic.jpg',
};

describe('FormCard', () => {
  it('renders title and data correctly', () => {
    render(<FormCard data={mockData} title="Test Form" />);

    expect(screen.getByText('Test Form')).toBeInTheDocument();
    expect(screen.getByTestId('form-name')).toHaveTextContent('Name: John Doe');
    expect(screen.getByText('Age: 30')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Country: USA')).toBeInTheDocument();
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
  });

  it('applies highlighted class when highlighted is true', () => {
    const { container } = render(<FormCard data={mockData} title="Highlighted Form" highlighted />);

    const card = container.firstChild;
    expect(card).toHaveClass('border-green-500');
  });

  it('applies default border when not highlighted', () => {
    const { container } = render(<FormCard data={mockData} title="Normal Form" />);

    const card = container.firstChild;
    expect(card).toHaveClass('border-gray-300');
  });

  it('renders image if picture is provided', () => {
    render(<FormCard data={mockData} title="Form With Image" />);
    const img = screen.getByAltText('preview');
    expect(img).toHaveAttribute('src', 'https://example.com/pic.jpg');
  });

  it('does not render image if picture is not provided', () => {
    const dataWithoutPicture = { ...mockData, picture: '' };
    render(<FormCard data={dataWithoutPicture} title="Form Without Image" />);
    const img = screen.queryByAltText('preview');
    expect(img).toBeNull();
  });
});
