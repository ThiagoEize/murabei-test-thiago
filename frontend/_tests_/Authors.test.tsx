import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuthors } from '@/lib/context/authors';
import Authors from '@/app/authors/page';

jest.mock('@/lib/context/authors', () => ({
  useAuthors: jest.fn(),
}));

jest.mock('@/components/shared/author-table', () => {
  return function MockAuthorTable({ authors }: { authors: any[] }) {
    return (
      <div data-testid="author-table">
        {authors.map((author, index) => (
          <div key={index} data-testid="author-row">
            {author.name}
          </div>
        ))}
      </div>
    );
  };
});

describe('Authors Component', () => {
  it('renders without crashing', () => {
    (useAuthors as jest.Mock).mockReturnValue({
      authorsList: [],
    });

    render(<Authors />);

    expect(screen.getByTestId('author-table')).toBeInTheDocument();
  });

  it('renders the AuthorTable component with filtered authors', () => {
    const mockAuthors = [
      { name: 'Author 1' },
      null,
      { name: 'Author 2' },
    ];

    (useAuthors as jest.Mock).mockReturnValue({
      authorsList: mockAuthors,
    });

    render(<Authors />);

    const rows = screen.getAllByTestId('author-row');
    expect(rows).toHaveLength(2); // Filters out null values
    expect(rows[0]).toHaveTextContent('Author 1');
    expect(rows[1]).toHaveTextContent('Author 2');
  });

  it('displays an empty AuthorTable if authorsList is empty', () => {
    (useAuthors as jest.Mock).mockReturnValue({
      authorsList: [],
    });

    render(<Authors />);

    expect(screen.queryAllByTestId('author-row')).toHaveLength(0); // No authors rendered
  });
});
