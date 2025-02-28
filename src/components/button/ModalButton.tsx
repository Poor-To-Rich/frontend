interface Props {
  label: string;
  onClick?: () => void;
}

const ModalButton = ({ label, onClick }: Props) => {
  return (
    <button
      className="w-[9rem] h-[3rem] rounded-lg text-md bg-pastelLime text-oliveGreen"
      type="button"
      onClick={onClick}>
      {label}
    </button>
  );
};

export default ModalButton;
