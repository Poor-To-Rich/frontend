import LoadingSpinner from '../loading/LoadingSpinner';

interface Props {
  label: string;
  isPending?: boolean;
  onClick?: () => void;
}

const ModalButton = ({ label, isPending, onClick }: Props) => {
  return (
    <button
      className="flex justify-center items-center w-fit min-w-[9rem] h-[3.5rem] px-8 rounded-lg text-md bg-pastelLime text-oliveGreen cursor-pointer"
      type="button"
      disabled={isPending}
      onClick={onClick}>
      {isPending ? <LoadingSpinner size={15} /> : label}
    </button>
  );
};

export default ModalButton;
