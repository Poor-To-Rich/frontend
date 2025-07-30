export const getRandomTime = () => {
  const maxMinutesAgo = 43200; // 30일 = 43200분
  const randomMinutes = Math.floor(Math.random() * (maxMinutesAgo + 1));
  return new Date(Date.now() - randomMinutes * 60 * 1000).toISOString();
};
