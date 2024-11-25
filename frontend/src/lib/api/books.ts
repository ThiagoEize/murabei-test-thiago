import { IBook, ICreateBook, IUpdateBook } from '../types/books';
import { Api } from "./Axios";

const BASE_ROUTE: string = 'books';

export const fetchBooks = async (page = 1, pageSize = 1000): Promise<IBook[]> => {
  const { data } = await Api.get<IBook[]>(BASE_ROUTE, {
    params: { page, page_size: pageSize },
  });
  return data;
};

export const fetchBooksByAuthor = async (authorSlug: string): Promise<IBook[]> => {
  const { data } = await Api.get<IBook[]>(`${BASE_ROUTE}/author/${authorSlug}`);
  return data;
};

export const fetchBooksBySubject = async (): Promise<string[]> => {
  const response = await Api.get(`${BASE_ROUTE}/subjects`);
  return response.data;
};

export const fetchBooksBySubjectSlug = async (subjectSlug: string): Promise<IBook[]> => {
  const response = await Api.get(`${BASE_ROUTE}/subjects/${subjectSlug}`);
  return response.data;
};

export const createBook = async (data: ICreateBook): Promise<IBook> => {
  const response = await Api.post(BASE_ROUTE, data);
  return response.data;
};

export const updateBook = async (id: number, data: IUpdateBook): Promise<IBook> => {
  const response = await Api.put(`${BASE_ROUTE}/${id}`, data);
  return response.data;
};

export const deleteBook = async (id: number): Promise<IBook> => {
  const response = await Api.delete(`${BASE_ROUTE}/${id}`);
  return response.data;
};