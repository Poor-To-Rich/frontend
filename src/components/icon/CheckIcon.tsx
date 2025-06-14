interface CheckIconProps {
  color?: string;
}

const CheckIcon = ({ color = 'black' }: CheckIconProps) => {
  return (
    <svg
      data-testid="check-icon"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.2559 4.41076C17.5814 4.7362 17.5814 5.26384 17.2559 5.58928L8.08926 14.7559C7.76382 15.0814 7.23618 15.0814 6.91074 14.7559L2.74408 10.5893C2.41864 10.2638 2.41864 9.7362 2.74408 9.41076C3.06951 9.08533 3.59715 9.08533 3.92259 9.41076L7.5 12.9882L16.0774 4.41076C16.4028 4.08533 16.9305 4.08533 17.2559 4.41076Z"
        fill={color}
      />
    </svg>
  );
};

export default CheckIcon;
