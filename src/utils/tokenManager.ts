export const tokenManager = (() => {
  let accessToken: string | null = null;

  return {
    setToken: (token: string) => {
      accessToken = token;
    },
    getToken: () => accessToken,
    clearToken: () => {
      accessToken = null;
    },
  };
})();
