'use client';

import { useAuthors } from '@/lib/context/authors';
import DOMPurify from 'dompurify';

interface AboutInformationsProps {
  authorSlug: string;
}

export const AboutInformations: React.FC<AboutInformationsProps> = ({ authorSlug }) => {
  const { authorsList } = useAuthors();

  const author = authorsList?.find((a) => a?.slug === authorSlug);

  if (!author) {
    return (
      <div className="text-center text-gray-500 italic">
        Author information is not available.
      </div>
    );
  }

  return (
    <div className="mb-6 p-6 border rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">
        {author.title}
      </h2>
      <div
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(author.biography || 'Biography is not available.'),
        }}
      />
    </div>
  );
};
