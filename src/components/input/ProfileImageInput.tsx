import CameraIcon from '@/components/icon/CameraIcon';
import { forwardRef } from 'react';
import TrashButton from '@/components/button/icon/TrashButton';
import DefaultProfileImage from '/image/default-profile-image.webp';

interface Props {
  value: string | File | undefined;
  onChange: (value: File | undefined) => void;
}

const ProfileImageInput = forwardRef<HTMLInputElement, Props>(({ value, onChange }, ref) => {
  let imageSrc: string | undefined;

  if (typeof value === 'string') {
    imageSrc = value;
  } else if (value instanceof File) {
    imageSrc = URL.createObjectURL(value);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      onChange(file);
    }

    e.target.value = '';
  };

  const handleImageDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onChange(undefined);
  };

  return (
    <div className="relative w-[15rem] flex justify-center items-center aspect-square rounded-2xl border border-strokeGray cursor-pointer">
      {imageSrc ? (
        <img src={imageSrc} alt="프로필 이미지" className="w-full h-full rounded-2xl object-cover" />
      ) : (
        <img src={DefaultProfileImage} alt="프로필 이미지" className="w-full h-full rounded-2xl object-cover" />
      )}
      {!imageSrc && (
        <div className="profileImage-icon-common">
          <CameraIcon />
        </div>
      )}
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleImageChange}
        ref={ref}
      />
      {imageSrc && (
        <div className="profileImage-icon-common">
          <TrashButton onClick={handleImageDelete} />
        </div>
      )}
    </div>
  );
});

export default ProfileImageInput;
