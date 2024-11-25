"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { IBookSubject } from "../types/book-subjects";
import { fetchBookSubjects } from "../api/book-subjects";
import { ISubject } from "../types/subjects";
import { fetchSubjects } from "../api/subjects";

type BookSubjectsDataType = IBookSubject | null;

type SubjectDataType = ISubject | null;

interface BookSubjectContext {
  bookSubjectsList: BookSubjectsDataType[];
  setBookSubjectsList: React.Dispatch<React.SetStateAction<BookSubjectsDataType[]>>;
  subjectsList: SubjectDataType[];
  setSubjectsList: React.Dispatch<React.SetStateAction<SubjectDataType[]>>;
}

const BookSubjectsContext = createContext<BookSubjectContext | null>(null);

export const BookSubjectContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookSubjectsList, setBookSubjectsList] = useState<BookSubjectsDataType[]>([]);
  const [subjectsList, setSubjectsList] = useState<SubjectDataType[]>([]);

  useEffect(() => {
    fetchBookSubjects().then((data) => {
      setBookSubjectsList(data);
    });
    fetchSubjects().then((data) => {
      setSubjectsList(data);
    });
  }, []);


  return (
    <BookSubjectsContext.Provider
      value={{
        bookSubjectsList,
        setBookSubjectsList,
        subjectsList,
        setSubjectsList,
      }}
    >
      {children}
    </BookSubjectsContext.Provider>
  );
};

export const useBookSubjects = () => {
  const context = useContext(BookSubjectsContext);

  if (!context) {
    throw new Error("context must be used inside the provider");
  }

  return context;
};
