import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { AppInfo } from '@/app/(Home)/components/app-info';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AppInfo Component', () => {
  it('renders the component correctly', () => {
    render(<AppInfo />);

    // Use a function matcher for text spanning multiple elements
    expect(
      screen.getByText((content, element) => {
        const hasText = (node: Element) =>
          node.textContent === 'Welcome to LookingForBooks';
        const elementHasText = hasText(element!);
        const childrenDontHaveText = Array.from(element!.children).every(
          (child) => !hasText(child)
        );
        return elementHasText && childrenDontHaveText;
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/Discover your next favorite book/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /See Our Books/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /See Our Authors/i })).toBeInTheDocument();
  });
});