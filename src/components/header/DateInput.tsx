import { forwardRef } from 'react';

const DateInput = forwardRef<HTMLButtonElement, any>(({ value, onClick }, ref) => {
  return (
    <button ref={ref} onClick={onClick} className="cursor-pointer">
      {value}
    </button>
  );
});

export default DateInput;
