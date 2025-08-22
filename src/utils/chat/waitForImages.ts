export const waitForImages = (container: HTMLElement) => {
  const images = Array.from(container.querySelectorAll('img')).filter(img => !img.complete);

  if (images.length === 0) return Promise.resolve();

  return new Promise<void>(resolve => {
    let loaded = 0;
    const checkDone = () => {
      loaded++;
      if (loaded === images.length) resolve();
    };

    images.forEach(img => {
      img.addEventListener('load', checkDone, { once: true });
      img.addEventListener('error', checkDone, { once: true });
    });
  });
};
