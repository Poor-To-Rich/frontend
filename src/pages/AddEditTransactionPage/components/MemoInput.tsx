import { forwardRef } from 'react';

interface Props {
  value: string | undefined;
}

const MemoInput = forwardRef<HTMLTextAreaElement, Props>(({ value = '', ...rest }, ref) => {
  const MAX_LENGTH = 100;
  return (
    <div className="flex flex-col gap-2.5">
      <label>메모</label>
      <textarea
        className="input-common py-2.5 aspect-[4/1] resize-none"
        ref={ref}
        value={value}
        {...rest}
        maxLength={MAX_LENGTH}
        placeholder="메모를 입력해주세요"
      />
      <span className="text-end text-defaultGrey text-md">
        {value.length}/{MAX_LENGTH}
      </span>
    </div>
  );
});

export default MemoInput;
