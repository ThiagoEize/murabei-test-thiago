import { ISubject } from "../types/subjects";
import { Api } from "./Axios";

const BASE_ROUTE: string = 'subjects';

export const fetchSubjects = async (): Promise<ISubject[]> => {
  const { data } = await Api.get<ISubject[]>(BASE_ROUTE);
  return data;
};