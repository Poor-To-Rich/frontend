import PrimaryButton from '@/components/button/PrimaryButton';

const ServerErrorFallback = () => {
  return (
    <div className="w-full grow flex flex-col justify-center items-center gap-5">
      <h2 className="text-xl font-bold">서버에 문제가 발생했습니다.</h2>
      <p className="text-defaultGrey">잠시 후 다시 시도해주세요.</p>
      <PrimaryButton label="새로고침" onClick={() => window.location.reload()} color={'bg-lightBlue text-oceanBlue'} />
    </div>
  );
};

export default ServerErrorFallback;
