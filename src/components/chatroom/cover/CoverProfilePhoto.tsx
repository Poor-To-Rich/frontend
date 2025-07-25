interface Props {
  photo: string;
}

const CoverProfilePhoto = ({ photo }: Props) => {
  return <img src={photo} className={'w-full aspect-square object-cover border border-strokeGray'} />;
};

export default CoverProfilePhoto;
