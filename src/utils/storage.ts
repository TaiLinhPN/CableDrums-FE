export const getAccessToken = (): string | null => {
  return localStorage.getItem("la");
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem("la", token);
};

export const clearAccessToken = (): void => {
  localStorage.removeItem("la");
};

export const clearAllStorage = (): void => {
  localStorage.clear();
};
