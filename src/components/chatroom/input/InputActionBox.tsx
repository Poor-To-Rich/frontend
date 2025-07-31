import SubActionButton from '@/components/button/SubActionButton';

interface Props {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonLabel?: string;
  onSubmit?: () => void;
}

const InputActionBox = ({ value, onChange, placeholder, buttonLabel, onSubmit }: Props) => {
  return (
    <form
      className="flex w-full gap-2.5 h-13"
      onSubmit={e => {
        e.preventDefault();
        onSubmit?.();
      }}>
      <input
        className="bg-gray-100 placeholder:text-md placeholder-defaultGrey rounded-lg px-5 focus:outline-none w-full h-full"
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
      {buttonLabel && <SubActionButton type="submit" label={buttonLabel} />}
    </form>
  );
};

export default InputActionBox;
