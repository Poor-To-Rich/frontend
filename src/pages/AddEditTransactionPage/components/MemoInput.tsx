import clsx from 'clsx';
import { forwardRef } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface Props {
  value: string;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const MemoInput = forwardRef<HTMLTextAreaElement, Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ value, errorMessage, ...rest }, ref) => {
    const MAX_LENGTH = 100;

    return (
      <div className="flex flex-col gap-2.5">
        <label>메모</label>
        <textarea
          className={clsx(errorMessage && 'border-sunsetRose!', 'input-common py-2.5 aspect-[4/1] resize-none')}
          ref={ref}
          {...rest}
          value={value}
          maxLength={MAX_LENGTH}
          placeholder="메모를 입력해주세요"
        />
        <div className="w-full flex justify-between">
          {typeof errorMessage === 'string' && errorMessage && (
            <p className={clsx(errorMessage && 'text-sunsetRose', 'w-fit h-fit text-sm mt-1.5')}>{errorMessage}</p>
          )}
          <span className="flex-grow text-end text-defaultGrey text-md">
            {value.length}/{MAX_LENGTH}
          </span>
        </div>
      </div>
    );
  },
);

export default MemoInput;
