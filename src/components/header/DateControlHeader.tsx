import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import RightArrowButton from '@/components/button/icon/RightArrowButton';

interface Props {
  date: string;
}

const DateControlHeader = ({ date }: Props) => {
  return (
    <header className="header-common">
      <span className="absolute left-0 h-full aspect-square">
        <LeftArrowButton />
      </span>
      <span>{date}</span>
      <span className="absolute right-0 h-full aspect-square">
        <RightArrowButton />
      </span>
    </header>
  );
};

export default DateControlHeader;
