import SettingArrowIcon from '@/components/icon/SettingArrowIcon';
import { SettingOptionType } from '@/types/types';

interface Props {
  label: string;
  options: SettingOptionType[];
  handleClick: ({ to, modalType, externalUrl }: Omit<SettingOptionType, 'title'>) => void;
}

const LabelContainer = ({ label, options, handleClick }: Props) => {
  return (
    <div className="w-full flex flex-col gap-2.5 px-8 my-4">
      <span className="font-bold text-lg">{label}</span>
      <div className="w-full flex flex-col px-8">
        {options.map(({ title, to, modalType, externalUrl }) => (
          <div
            className="w-full flex justify-between cursor-pointer py-3.5"
            onClick={() => handleClick({ to, modalType, externalUrl })}>
            <span>{title}</span>
            {(to || externalUrl) && <SettingArrowIcon />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabelContainer;
