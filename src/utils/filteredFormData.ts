export const filteredData = <T extends Record<string, unknown>>(data: T): T => {
  return Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== '' && value !== undefined)) as T;
};
