'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const AppInfo: React.FC = () => {
  const router = useRouter();

  const navigateToBooks = () => {
    router.push('/books');
  };

  const navigateToAuthors = () => {
    router.push('/authors');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center">
        Welcome to <span className="text-blue-600">LookingForBooks</span>
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mb-8 mt-4">
        Discover your next favorite book with <span className="text-blue-600 font-semibold">LookingForBooks</span>.
        Whether you are searching for the latest bestsellers, timeless classics, or niche genres, we offer an
        extensive collection to satisfy every reader’s taste. Start your journey into the world of literature today!
      </p>
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={navigateToBooks}
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200"
        >
          See Our Books
        </Button>
        <Button
          onClick={navigateToAuthors}
          className="px-6 py-3 bg-gray-200 text-gray-800 text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-300 transition-all duration-200"
        >
          See Our Authors
        </Button>
      </div>
    </div>
  );
};
