interface Props {
  photo: string;
}

const CoverProfilePhoto = ({ photo }: Props) => {
  return (
    <img
      src={photo}
      alt="채팅방 프로필 이미지"
      className={'w-full aspect-square object-cover border border-strokeGray'}
    />
  );
};

export default CoverProfilePhoto;
