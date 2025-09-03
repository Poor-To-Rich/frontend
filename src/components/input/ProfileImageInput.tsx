import CameraIcon from '@/components/icon/CameraIcon';
import { forwardRef, useEffect, useState } from 'react';
import TrashButton from '@/components/button/icon/TrashButton';
import DefaultProfileImage from '/image/default-profile-image.webp';
import toast from 'react-hot-toast';
import { compressImage } from '@/utils/image';

interface Props {
  value: string | File | undefined;
  onChange: (value: string | File | undefined) => void;
}

const ProfileImageInput = forwardRef<HTMLInputElement, Props>(({ value, onChange }, ref) => {
  const [previewUrl, setPreviewUrl] = useState<string>();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedFile = await compressImage(file);

      onChange(compressedFile);
    } catch (error) {
      console.error('압축 실패:', error);
      toast.error(error instanceof Error ? error.message : '사진 업로드 실패');
    }
    e.target.value = '';
  };

  const handleImageDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onChange(undefined);
  };

  useEffect(() => {
    if (value instanceof Blob) {
      const objectUrl = URL.createObjectURL(value);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof value === 'string') {
      setPreviewUrl(value);
    } else {
      setPreviewUrl(undefined);
    }
  }, [value]);

  return (
    <div className="relative w-[15rem] flex justify-center items-center aspect-square rounded-2xl border border-strokeGray cursor-pointer">
      {previewUrl ? (
        <img src={previewUrl} alt="프로필 이미지" className="w-full h-full rounded-2xl object-cover" />
      ) : (
        <img src={DefaultProfileImage} alt="프로필 이미지" className="w-full h-full rounded-2xl object-cover" />
      )}
      {!previewUrl && (
        <div className="profileImage-icon-common">
          <CameraIcon />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleImageChange}
        ref={ref}
      />
      {previewUrl && (
        <div className="profileImage-icon-common">
          <TrashButton onClick={handleImageDelete} />
        </div>
      )}
    </div>
  );
});

export default ProfileImageInput;
