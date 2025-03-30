import { forwardRef } from 'react';

const DateInput = forwardRef<HTMLButtonElement, any>((props, ref) => {
  const { value, onClick } = props;

  return (
    <button ref={ref} onClick={onClick} className="cursor-pointer">
      {value}
    </button>
  );
});

export default DateInput;
