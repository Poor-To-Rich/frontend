const DefaultErrorFallback = ({ message }: { message?: string }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <h2 className="text-xl font-bold">예상하지 못한 문제가 발생했습니다.</h2>
      <p className="text-defaultGrey">
        {message ? `Error: ${message}` : '예기치 못한 오류입니다. 잠시후에 다시 시도해주십시오.'}
      </p>
    </div>
  );
};

export default DefaultErrorFallback;
