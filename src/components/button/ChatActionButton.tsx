import clsx from 'clsx';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import LockKeyIcon from '@/components/icon/LockKeyIcon';

interface Props {
  label: '채팅 참여하기' | '참여중인 채팅방' | '채팅방 나가기' | '채팅방 삭제 및 나가기';
  isPending?: boolean;
  hasPassword?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const ChatActionButton = ({ label, isPending, hasPassword, disabled, onClick }: Props) => {
  const { colorClass, iconColor } = (() => {
    if (label === '채팅 참여하기') {
      return { colorClass: 'bg-lightBlue text-oceanBlue', iconColor: '#81aaf6' };
    }
    if (label === '참여중인 채팅방') {
      return { colorClass: 'bg-pastelLime text-oliveGreen ', iconColor: '#a1c377' };
    }
    if (label === '채팅방 삭제 및 나가기' || label === '채팅방 나가기') {
      return { colorClass: 'bg-pinkRed text-sunsetRose', iconColor: '#eb6060' };
    }
    return { colorClass: '' };
  })();

  return (
    <button
      className={clsx(
        'w-full h-[5rem] px-4 relative flex justify-center items-center rounded-lg cursor-pointer',
        disabled ? 'bg-strokeGray text-defaultGrey' : colorClass,
      )}
      disabled={isPending || disabled}
      onClick={onClick}>
      <div className="flex items-center gap-2">
        {hasPassword && <LockKeyIcon color={iconColor} />}
        <span className={isPending ? 'invisible' : 'visible'}>{label}</span>
      </div>
      {isPending && (
        <span className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size={20} color={iconColor} />
        </span>
      )}
    </button>
  );
};

export default ChatActionButton;
