interface Props {
  label: string;
}

const ChatroomBadge = ({ label }: Props) => {
  return (
    <div className="flex flex-shrink-0 items-center justify-center w-[10rem] h-11 bg-pastelLime rounded-3xl text-oliveGreen text-md whitespace-nowrap">
      {label}
    </div>
  );
};

export default ChatroomBadge;
