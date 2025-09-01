import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File, maxSizeMB = 1, maxWidthOrHeight = 1080): Promise<File> => {
  const options = {
    maxSizeMB,
    maxWidthOrHeight,
    useWebWorker: true,
  };

  const compressedBlob = await imageCompression(file, options);

  const compressedFile = new File([compressedBlob], file.name, {
    type: compressedBlob.type,
    lastModified: Date.now(),
  });

  if (compressedFile.size > 5 * 1024 * 1024) {
    throw new Error('파일 크기가 5MB를 초과했습니다.');
  }

  return compressedFile;
};
