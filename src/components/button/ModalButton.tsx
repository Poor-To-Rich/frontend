import LoadingSpinner from '../loading/LoadingSpinner';

interface Props {
  label: string;
  disabled?: boolean;
  isPending?: boolean;
  onClick?: () => void;
}

const ModalButton = ({ label, disabled, isPending, onClick, ...rest }: Props) => {
  return (
    <button
      className="flex justify-center items-center w-fit min-w-[9rem] h-[3.5rem] px-8 rounded-lg text-md bg-pastelLime text-oliveGreen cursor-pointer relative"
      type="button"
      disabled={isPending || disabled}
      onClick={onClick}
      {...rest}>
      <span className={isPending ? 'invisible' : 'visible'}>{label}</span>
      {isPending && (
        <span className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size={20} />
        </span>
      )}
    </button>
  );
};

export default ModalButton;
