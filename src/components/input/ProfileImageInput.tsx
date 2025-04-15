import CameraIcon from '@/components/icon/CameraIcon';
import { forwardRef, useState } from 'react';
import TrashButton from '@/components/button/icon/TrashButton';

interface Props {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

const ProfileImageInput = forwardRef<HTMLInputElement, Props>(({ value = '', onChange }, ref) => {
  const [image, setImage] = useState<string>(value);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImage(imageUrl);
        onChange(imageUrl);
      };
    }

    e.target.value = '';
  };

  const handleImageDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    setImage('');
    onChange('');
  };

  return (
    <div className="relative w-[15rem] flex justify-center items-center aspect-square rounded-2xl bg-lightGray cursor-pointer">
      {image ? <img src={image} className="w-full h-full rounded-2xl object-cover" /> : <span>비어있음</span>}
      {!image && (
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
      {image && (
        <div className="profileImage-icon-common">
          <TrashButton onClick={handleImageDelete} />
        </div>
      )}
    </div>
  );
});

export default ProfileImageInput;
