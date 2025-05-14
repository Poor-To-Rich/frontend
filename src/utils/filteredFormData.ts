export const filteredData = <T extends Record<string, unknown>>(data: T): T => {
  return Object.fromEntries(
    Object.entries(data)
      .map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]) // 값이 문자열이면 trim 처리
      .filter(([_, value]) => value !== '' && value !== undefined), // trim 처리 후 빈 문자열이나 undefined는 제외
  ) as T;
};
