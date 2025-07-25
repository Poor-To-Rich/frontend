import SubActionButton from '@/components/button/SubActionButton';

const PasswordActionBox = () => {
  return (
    <div className="w-[20rem] h-11 flex items-center gap-2.5">
      <input className="input-common h-full" autoComplete="off" />
      <SubActionButton type="button" label="입력" />
    </div>
  );
};

export default PasswordActionBox;
