interface Props {
  openModal: () => void;
}

const DeleteUserButton = ({ openModal }: Props) => {
  return (
    <button className="text-sunsetRose cursor-pointer" onClick={openModal} type="button">
      회원탈퇴
    </button>
  );
};

export default DeleteUserButton;
