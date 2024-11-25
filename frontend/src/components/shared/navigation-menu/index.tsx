'use client';

import { useRouter, usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function NavigationMenu() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* Navigation Menu */}
      <nav className="absolute inset-x-0 bg-white py-3 shadow z-50">
        <div className="container mx-auto">
          <ul className="flex justify-center space-x-8">
            <li>
              <button
                onClick={() => router.push('/')}
                className={clsx(
                  'text-lg font-medium transition-all duration-200',
                  pathname === '/' ? 'text-blue-500' : 'text-gray-700 hover:text-gray-900'
                )}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/books')}
                className={clsx(
                  'text-lg font-medium transition-all duration-200',
                  pathname === '/books' ? 'text-blue-500' : 'text-gray-700 hover:text-gray-900'
                )}
              >
                Books
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/authors')}
                className={clsx(
                  'text-lg font-medium transition-all duration-200',
                  pathname === '/authors' ? 'text-blue-500' : 'text-gray-700 hover:text-gray-900'
                )}
              >
                Authors
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="h-12"></div>
    </>
  );
}
