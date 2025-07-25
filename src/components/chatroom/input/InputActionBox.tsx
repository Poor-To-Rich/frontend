import SubActionButton from '@/components/button/SubActionButton';

interface Props {
  placeholder: string;
  buttonLabel?: string;
  onSubmit?: () => void;
}

const InputActionBox = ({ placeholder, buttonLabel, onSubmit }: Props) => {
  return (
    <div className="flex w-full gap-2.5 h-13">
      <input
        className="bg-strokeGray placeholder-defaultGrey rounded-lg px-3 focus:outline-none w-full h-full"
        placeholder={placeholder}
        autoComplete="off"
      />
      {buttonLabel && <SubActionButton type="submit" label={buttonLabel} onSubmit={onSubmit} />}
    </div>
  );
};

export default InputActionBox;
