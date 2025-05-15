export const parseRequestBody = async <T = any>(request: Request): Promise<T> => {
  const text = await request.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Invalid JSON body');
  }
};
