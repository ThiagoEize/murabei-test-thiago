import { IAuthor } from "../types/authors";
import { Api } from "./Axios";

const BASE_ROUTE: string = 'authors';

export const fetchAuthors = async (): Promise<IAuthor[]> => {
  const { data } = await Api.get<IAuthor[]>(BASE_ROUTE);
  return data;
};