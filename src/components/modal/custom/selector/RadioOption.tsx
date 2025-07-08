import { forwardRef } from 'react';

interface Props {
  radioId: string;
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  input?: React.ReactNode;
}

const RadioOption = forwardRef<HTMLInputElement, Props>(
  ({ radioId, label, checked, input, value, onChange, ...rest }, ref) => {
    return (
      <label htmlFor={radioId} className="flex w-fit h-12 items-center gap-3.5" {...rest}>
        <input
          id={radioId}
          type="radio"
          value={value}
          className="peer hidden"
          checked={checked}
          ref={ref}
          onChange={onChange}
        />
        <div className="w-6 h-6 cursor-pointer border-2 border-defaultGrey peer-checked:bg-pastelLime peer-checked:border-oliveGreen" />
        {label}
        {input}
      </label>
    );
  },
);

export default RadioOption;
