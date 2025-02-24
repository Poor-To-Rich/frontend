import CameraIcon from '@/components/icon/CameraIcon';
import { useState } from 'react';

const ProfileImageInput = () => {
  const [image, setImage] = useState<string>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImage(reader.result as string);
      };
    }
  };

  return (
    <button className="relative w-[15rem] aspect-square rounded-2xl bg-lightGray cursor-pointer">
      {image ? <img src={image} className="w-full h-full rounded-2xl object-cover" /> : <span>비어있음</span>}
      <div className="absolute -right-3 -bottom-3 w-[3.2rem] h-[3.3rem] rounded-full bg-strokeGray flex items-center justify-center">
        <CameraIcon />
      </div>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleImageChange}
      />
    </button>
  );
};

export default ProfileImageInput;
