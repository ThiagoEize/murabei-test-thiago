export interface IBookSubject {
  id: number;
  book: number;
  sub_subject: string;
  sub_sub_subject?: string;
}

export interface ICreateBookSubject {
  book: number;
  sub_subject: string;
  sub_sub_subject?: string;
}

export interface IUpdateBookSubject extends Partial<ICreateBookSubject> { }
