export const isIOS = (): boolean => {
  const userAgent = navigator.userAgent;
  return /iPhone|iPad|iPod/.test(userAgent) || (userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1);
};

export const isStandaloneMode = (): boolean => {
  return (navigator as any).standalone === true;
};

export const isIOSPWA = ((): boolean => {
  return isIOS() && isStandaloneMode();
})();
