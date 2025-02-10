interface Props {
  label: '인증' | '확인' | '중복확인';
  onClick?: () => void;
}

const VerifyButton = ({ label, onClick }: Props) => {
  return (
    <button className="w-fit h-[3.2rem] border border-strokeGray rounded-lg text-md px-3" onClick={onClick}>
      {label}
    </button>
  );
};

export default VerifyButton;
