import SelectColorButton from '@/components/button/icon/SelectColorButton';
import { forwardRef, useImperativeHandle, useRef } from 'react';

const ColorInput = forwardRef<HTMLInputElement>(({ ...rest }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current!);

  return (
    <div className="w-full flex items-center justify-between">
      <label className="w-fit h-fit">색상</label>
      <div className="flex items-center gap-2.5">
        <input
          type="color"
          ref={inputRef}
          {...rest}
          className="w-[4rem] h-auto aspect-square appearance-none border-none bg-transparent custom-color-input"
        />
        <SelectColorButton onClick={() => inputRef.current?.click()} />
      </div>
    </div>
  );
});

export default ColorInput;
