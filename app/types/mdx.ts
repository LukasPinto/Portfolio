export type Node = {
  id: string;
  name: string;
  children?: Node[];
};

export type ReadingTime = {
  text: string;
  minutes: number;
  time: number;
  words: number;
};

export type Matter = {
  title: string;
  author: string;
  date: string;
  description: string;
  image: {
    path: string;
  };
  pin: boolean;
  categories: string[];
  tags: string[];
};

export type Post = {
  source: string;
  slug: string;
  matter: Matter;
  toc: Node[];
  readingTime: ReadingTime;
};

export type PostSummary = {
  slug: string;
  matter: Matter;
};

export type BlogSearchDocument = {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  date: string;
  plainText: string;
};
