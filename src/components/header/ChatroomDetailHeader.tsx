import { useNavigate } from 'react-router-dom';
import DefaultHeader from '@/components/header/DefaultHeader';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import LikeButton from '@/components/button/icon/LikeButton';
import ShareButton from '@/components/button/icon/ShareButton';
import ChatroomSettingsButton from '@/components/button/icon/ChatroomSettingsButton';
import useGetChatroomLikeStatus from '@/hooks/apis/chat/useGetChatroomLikeStatus';
import { useRef } from 'react';
import useModal from '@/hooks/useModal';
import SingleChatroomDropdown from '../menu/SingleChatroomDropdown';
import useClickOutside from '@/hooks/useClickOutside';

interface Props {
  chatroomId: string;
  openModal: () => void;
}

const ChatroomDetailHeader = ({ chatroomId, openModal }: Props) => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const { data } = useGetChatroomLikeStatus(chatroomId);
  const { isOpen: isMenuOpen, openModal: openMenu, closeModal: closeMenu } = useModal();
  useClickOutside({
    refs: [dropdownRef, settingsButtonRef],
    onClickOutside: closeMenu,
  });

  return (
    <DefaultHeader
      leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
      rightButton={
        <div className="h-full flex items-center gap-3 mr-7 relative">
          <LikeButton isLiked={data?.isLiked} />
          <ShareButton />
          <ChatroomSettingsButton
            ref={settingsButtonRef}
            isMenuOpen={isMenuOpen}
            onClick={() => {
              if (isMenuOpen) closeMenu();
              else openMenu();
            }}
          />
          {isMenuOpen && (
            <div className="absolute right-0 top-15" ref={dropdownRef}>
              <SingleChatroomDropdown openModal={openModal} />
            </div>
          )}
        </div>
      }
    />
  );
};

export default ChatroomDetailHeader;
