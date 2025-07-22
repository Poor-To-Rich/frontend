import clsx from 'clsx';

interface Props {
  bgColor?: string;
  leftButton?: React.ReactNode;
  label?: React.ReactNode;
  rightButton?: React.ReactNode;
}

const DefaultHeader = ({ bgColor, leftButton, label, rightButton }: Props) => {
  return (
    <header className={clsx(bgColor, 'header-common')}>
      <span className="absolute h-full left-0 ">{leftButton}</span>
      <div className="text-center">{label}</div>
      <span className="absolute h-full right-0 ">{rightButton}</span>
    </header>
  );
};

export default DefaultHeader;
