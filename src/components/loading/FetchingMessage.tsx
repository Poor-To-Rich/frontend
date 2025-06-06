interface Props {
  isFetchingNextPage: boolean;
}

const FetchingMessage = ({ isFetchingNextPage }: Props) => {
  return isFetchingNextPage && <div className="text-center py-4 text-defaultGrey">불러오는 중...</div>;
};

export default FetchingMessage;
