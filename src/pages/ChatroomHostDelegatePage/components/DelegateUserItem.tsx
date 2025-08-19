import SubActionButton from '@/components/button/SubActionButton';
import UserProfile from '@/components/profile/UserProfile';
import { UserProfileType } from '@/types/profileType';

interface Props {
  chatroomId: string;
  userProfile: UserProfileType;
}

const DelegateUserItem = ({ chatroomId, userProfile }: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-between">
      <UserProfile chatroomId={chatroomId} userProfile={userProfile} />
      <SubActionButton label="위임" className="py-1.5" />
    </div>
  );
};

export default DelegateUserItem;
