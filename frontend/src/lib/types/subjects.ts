export interface ISubject {
  id: number;
  title: string;
  slug: string;
}

export interface ICreateSubject {
  title: string;
  slug: string;
}

export interface IUpdateSubject extends Partial<ICreateSubject> { }