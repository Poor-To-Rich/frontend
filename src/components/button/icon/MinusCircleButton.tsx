interface Props {
  onClick: () => void;
}

const MinusCircleButton = ({ onClick }: Props) => {
  return (
    <button className="w-fit h-fit cursor-pointer" onClick={onClick}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_26_553)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.99992 2.49998C5.85778 2.49998 2.49992 5.85784 2.49992 9.99998C2.49992 14.1421 5.85778 17.5 9.99992 17.5C14.1421 17.5 17.4999 14.1421 17.4999 9.99998C17.4999 5.85784 14.1421 2.49998 9.99992 2.49998ZM0.833252 9.99998C0.833252 4.93737 4.93731 0.833313 9.99992 0.833313C15.0625 0.833313 19.1666 4.93737 19.1666 9.99998C19.1666 15.0626 15.0625 19.1666 9.99992 19.1666C4.93731 19.1666 0.833252 15.0626 0.833252 9.99998Z"
            fill="#EB6060"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.83325 10C5.83325 9.53978 6.20635 9.16669 6.66659 9.16669H13.3333C13.7935 9.16669 14.1666 9.53978 14.1666 10C14.1666 10.4603 13.7935 10.8334 13.3333 10.8334H6.66659C6.20635 10.8334 5.83325 10.4603 5.83325 10Z"
            fill="#EB6060"
          />
        </g>
        <defs>
          <clipPath id="clip0_26_553">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
};

export default MinusCircleButton;
