import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePaginatedQuery } from '@/hooks/usePaginatedQuery';
import Books from '@/app/books/page';

jest.mock('@/hooks/usePaginatedQuery', () => ({
  usePaginatedQuery: jest.fn(),
}));

jest.mock('@/components/ui/spinner', () => {
  return function MockSpinner({ size, color }: { size: string; color: string }) {
    return <div data-testid="spinner">{`Spinner ${size} ${color}`}</div>;
  };
});

jest.mock('@/components/shared/book-table', () => {
  return function MockBookTable({ books }: { books: any[] }) {
    return (
      <div data-testid="book-table">
        {books.map((book, index) => (
          <div key={index} data-testid="book-row">
            {book.title}
          </div>
        ))}
      </div>
    );
  };
});

describe('Books Component', () => {
  it('renders the spinner while loading', () => {
    (usePaginatedQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      refetch: jest.fn(),
    });

    render(<Books />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('book-table')).not.toBeInTheDocument();
  });

  it('renders the BookTable with books once loading is complete', () => {
    const mockBooks = [
      { title: 'Book 1' },
      { title: 'Book 2' },
    ];

    (usePaginatedQuery as jest.Mock).mockReturnValue({
      data: mockBooks,
      isLoading: false,
      refetch: jest.fn(),
    });

    render(<Books />);

    expect(screen.getByTestId('book-table')).toBeInTheDocument();

    const rows = screen.getAllByTestId('book-row');
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveTextContent('Book 1');
    expect(rows[1]).toHaveTextContent('Book 2');
  });

  it('renders an empty BookTable when there are no books', () => {
    (usePaginatedQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      refetch: jest.fn(),
    });

    render(<Books />);

    expect(screen.getByTestId('book-table')).toBeInTheDocument();
    expect(screen.queryAllByTestId('book-row')).toHaveLength(0);
  });
});
