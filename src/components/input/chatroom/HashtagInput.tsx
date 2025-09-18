import { forwardRef, useState } from 'react';
import clsx from 'clsx';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface Props {
  label: string;
  value: string[];
  maxLength: number;
  isRequired?: boolean;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  onChange: (val: string[]) => void;
}

const HashtagInput = forwardRef<HTMLInputElement, Props>(
  ({ label, value, maxLength, isRequired, errorMessage, onChange }, ref) => {
    const [input, setInput] = useState('');

    const addTag = () => {
      const raw = input.trim();
      if (!raw) return;

      const tag = raw.startsWith('#') ? raw.slice(1) : raw;

      if (tag && !value.includes(tag)) {
        onChange([...value, tag]);
      }
      setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((e.key === ' ' || e.key === 'Enter') && !(e.nativeEvent as any).isComposing) {
        e.preventDefault();
        addTag();
      } else if (e.key === 'Backspace' && input === '') {
        onChange(value.slice(0, -1));
      }
    };

    const handleCompositionEnd = () => {
      if (input.endsWith(' ')) {
        addTag();
      }
    };

    return (
      <div className="flex flex-col gap-2.5">
        <div className="relative w-fit h-fit">
          <label>{label}</label>
          {isRequired && <span className="text-sunsetRose absolute top-[-0.5rem]">*</span>}
        </div>
        <div
          className={clsx(
            'flex flex-wrap gap-2 border rounded-lg px-4 py-2 min-h-[3.2rem]',
            errorMessage ? 'border-sunsetRose' : 'border-strokeGray',
          )}>
          {value.map(tag => (
            <span
              key={tag}
              className="bg-pastelLime text-oliveGreen px-2 py-1 rounded text-md flex items-center justify-center">
              #{tag}
            </span>
          ))}
          <input
            type="text"
            className="flex-1 outline-none min-w-[6rem] bg-transparent"
            value={input}
            onChange={e => {
              if (value.length < maxLength) {
                setInput(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            onCompositionEnd={handleCompositionEnd}
            maxLength={maxLength}
            placeholder={value.length < maxLength ? '#태그를 입력하세요' : ''}
            ref={ref}
          />
        </div>
        <div className="w-full flex justify-between">
          {typeof errorMessage === 'string' && errorMessage && (
            <p className="text-sunsetRose text-sm mt-1.5">{errorMessage}</p>
          )}
          <span className="flex-grow text-end text-defaultGrey text-md">
            {value.length}/{maxLength}
          </span>
        </div>
      </div>
    );
  },
);

export default HashtagInput;
