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
      <span className="absolute left-0 header-item-common">{leftButton}</span>
      <div className="text-center">{label}</div>
      <span className="absolute right-0 header-item-common">{rightButton}</span>
    </header>
  );
};

export default DefaultHeader;
