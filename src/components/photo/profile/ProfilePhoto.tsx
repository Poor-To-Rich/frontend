import clsx from 'clsx';

interface Props {
  photo: string;
  className?: string;
}

const ProfilePhoto = ({ photo, className }: Props) => {
  return (
    <img src={photo} className={clsx('aspect-square object-cover border border-strokeGray rounded-xl', className)} />
  );
};

export default ProfilePhoto;
