interface Props {
  onClick?: () => void;
}

const SeeMoreButton = ({ onClick }: Props) => {
  return (
    <button className="text-md text-defaultGrey cursor-pointer" onClick={onClick}>
      더보기
    </button>
  );
};

export default SeeMoreButton;
