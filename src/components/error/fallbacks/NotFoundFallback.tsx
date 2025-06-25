const NotFoundFallback = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <h2 className="text-lg font-bold">404 NotFound</h2>
      <p className="text-defaultGrey">요청하신 리소스를 찾을 수 없습니다.</p>
    </div>
  );
};

export default NotFoundFallback;
