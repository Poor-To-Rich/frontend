import clsx from 'clsx';

interface Props {
  label: '지출' | '수입';
  isClicked?: boolean;
  onClick?: () => void;
}

const IncomeExpenseButton = ({ label, isClicked, onClick }: Props) => {
  return (
    <button
      className={clsx(
        'w-[45%] h-[3rem] rounded-lg ',
        isClicked
          ? (label === '지출' && 'bg-pinkRed font-bold') || (label === '수입' && 'bg-lightBlue font-bold')
          : 'border border-strokeGray',
        label === '지출' && 'text-sunsetRose',
        label === '수입' && 'text-oceanBlue',
      )}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default IncomeExpenseButton;
