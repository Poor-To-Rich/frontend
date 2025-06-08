const Skeleton = ({ width = 'w-full', height = 'h-4' }) => {
  return <div className={`animate-pulse bg-gray-200 rounded ${width} ${height}`} />;
};

export default Skeleton;
