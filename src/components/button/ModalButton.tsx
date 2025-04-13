interface Props {
  label: string;
  onClick?: () => void;
}

const ModalButton = ({ label, onClick }: Props) => {
  return (
    <button
      className="w-fit min-w-[9rem] h-[3rem] px-8 rounded-lg text-md bg-pastelLime text-oliveGreen cursor-pointer"
      type="button"
      onClick={onClick}>
      {label}
    </button>
  );
};

export default ModalButton;
