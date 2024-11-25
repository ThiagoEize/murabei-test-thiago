import { IBookSubject } from "../types/book-subjects";
import { Api } from "./Axios";

const BASE_ROUTE: string = 'book-subjects';

export const fetchBookSubjects = async (): Promise<IBookSubject[]> => {
  const { data } = await Api.get<IBookSubject[]>(BASE_ROUTE);
  return data;
};