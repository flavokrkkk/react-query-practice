export interface ITodos {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  userId: string;
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
