export interface ITodos {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export interface IApiResponse<T> {
  data: T;
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
}
