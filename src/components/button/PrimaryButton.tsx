import clsx from 'clsx';

interface Props {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const PrimaryButton = ({ label, isActive, onClick }: Props) => {
  return (
    <button
      className={clsx(
        'w-[12rem] h-[3.6rem] rounded-lg text-md',
        isActive ? 'bg-pastelLime text-oliveGreen' : ' text-defaultGrey bg-strokeGray',
      )}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default PrimaryButton;
