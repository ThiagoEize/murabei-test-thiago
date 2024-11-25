export interface IBook {
  id: number;
  title?: string;
  author?: string;
  author_id?: number;
  author_bio?: string;
  authors?: string;
  title_slug?: string;
  author_slug?: string;
  isbn13?: string;
  isbn10?: string;
  price?: number;
  format?: string;
  publisher?: string;
  pubdate?: string;
  edition?: string;
  subjects?: string;
  lexile?: string;
  pages?: number;
  dimensions?: string;
  overview?: string;
  excerpt?: string;
  synopsis?: string;
  toc?: string;
  editorial_review?: string;
}

export interface ICreateBook {
  title?: string;
  author?: string;
  author_id?: number;
  author_bio?: string;
  authors?: string;
  title_slug?: string;
  author_slug?: string;
  isbn13?: string;
  isbn10?: string;
  price?: number;
  format?: string;
  publisher?: string;
  pubdate?: string;
  edition?: string;
  subjects?: string;
  lexile?: string;
  pages?: number;
  dimensions?: string;
  overview?: string;
  excerpt?: string;
  synopsis?: string;
  toc?: string;
  editorial_review?: string;
}

export interface IUpdateBook extends Partial<ICreateBook> { }