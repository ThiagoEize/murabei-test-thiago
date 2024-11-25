export interface IAuthor {
  id: number;
  title: string;
  slug: string;
  biography: string;
}

export interface ICreateAuthor {
  title: string;
  slug: string;
  biography?: string;
}

export interface IUpdateAuthor extends Partial<ICreateAuthor> { }