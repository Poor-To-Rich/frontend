import ProfilePhoto from '@/components/photo/ProfilePhoto';
import CrownIcon from '@/components/icon/CrownIcon';
import useModal from '@/hooks/useModal';
import UserProfileModal from '@/pages/ChatroomPage/components/modal/UserProfileModal';
import { UserProfileType } from '@/types/profileType';
import PostMoreButton from '@/components/button/icon/PostMoreButton';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import NoticeDropdown from '@/components/menu/NoticeDropdown';
import { useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

interface Props {
  userProfile: UserProfileType;
  chatroomId?: string;
  noticeId?: number;
  createdAt?: string;
  hideRanking?: boolean;
  hasMoreButton?: boolean;
  hideProfileModal?: boolean;
}

const UserProfile = ({
  userProfile,
  chatroomId,
  noticeId,
  createdAt,
  hideRanking,
  hasMoreButton,
  hideProfileModal,
}: Props) => {
  const { profileImage, rankingType, nickname, isHost } = userProfile;
  const { isOpen: isUserProfile, openModal: openUserProfile, closeModal: closeUserProfile } = useModal();
  const { isOpen: isDropDown, openModal: openDropDown, closeModal: closeDropDown } = useModal();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  useClickOutside({
    refs: [dropdownRef, moreButtonRef],
    onClickOutside: closeDropDown,
  });

  return (
    <div className={'flex gap-5 items-center relative'}>
      <ProfilePhoto
        photo={profileImage}
        rankingType={rankingType}
        hideRanking={hideRanking}
        className="w-20"
        onClick={() => {
          if (!hideProfileModal) openUserProfile();
        }}
      />
      <div className="flex-grow flex justify-between items-start">
        <div className="flex flex-col items-start gap-1.5">
          <div className="flex items-center gap-2 ">
            <p>{nickname}</p>
            {isHost && <CrownIcon size={20} />}
          </div>
          {createdAt && (
            <p className="text-sm text-defaultGrey">
              {format(createdAt, 'yyyy년 MM월 dd일 a h시 mm분', { locale: ko })}
            </p>
          )}
        </div>
        {hasMoreButton && noticeId && (
          <PostMoreButton
            ref={moreButtonRef}
            isDropDown={isDropDown}
            onClick={() => {
              if (isDropDown) closeDropDown();
              else openDropDown();
            }}
          />
        )}
      </div>
      {isUserProfile && chatroomId && (
        <UserProfileModal chatroomId={chatroomId} userProfile={userProfile} closeModal={closeUserProfile} />
      )}
      {isDropDown && noticeId && chatroomId && (
        <div className="absolute right-0 top-10" ref={dropdownRef}>
          <NoticeDropdown noticeId={noticeId} chatroomId={chatroomId} />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
