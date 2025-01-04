class ApiError extends Error {
  constructor(public response: Response) {
    super("Api Error" + response.status);
  }
}

export const jsonApiInstance = async <T>(
  url: string,
  init?: RequestInit
): Promise<T> => {
  const result = await fetch(`${import.meta.env.VITE_SERVER_URL}${url}`, {
    ...init,
  });

  if (result.ok) {
    throw new ApiError(result);
  }

  const data = await result.json();

  return data;
};
