import PrimaryInput from '@/components/input/PrimaryInput';
import SelectBox from '@/components/input/SelectBox';
import TextArea from '@/components/input/TextArea';
import { ChatroomFormDataType } from '@/types/chatTypes';
import { Controller, useFormContext } from 'react-hook-form';
import { MAX_MEMBER_COUNT_OPTIONS } from '@/constants/options';
import ProfileImageInput from '@/components/input/ProfileImageInput';
import HashtagInput from './HashtagInput';
import RankingCheckBox from '@/components/checkbox/RankingCheckBox';

const ChatroomFields = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ChatroomFormDataType>();

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-center">
        <Controller name="chatroomImage" control={control} render={({ field }) => <ProfileImageInput {...field} />} />
      </div>
      <div className="flex flex-col gap-3 my-15">
        <Controller
          control={control}
          name="chatroomTitle"
          render={({ field }) => (
            <PrimaryInput
              {...field}
              label="채팅방 이름"
              maxLength={30}
              isRequired
              hasCount
              errorMessage={errors.chatroomTitle?.message}
            />
          )}
        />
        <Controller
          name="maxMemberCount"
          control={control}
          render={({ field }) => (
            <SelectBox
              label="최대인원"
              options={MAX_MEMBER_COUNT_OPTIONS}
              isRequired
              errorMessage={errors.maxMemberCount?.message}
              value={field.value}
              onChange={e => field.onChange(Number(e.target.value))}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              label="채팅방 소개"
              maxLength={100}
              placeholder={`- 어떤 사람과 대화하고 싶으신가요?\n- 지켜야할 규칙, 공지 사항 등을 작성해주세요.`}
              isRequired
              errorMessage={errors.description?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="hashtags"
          control={control}
          render={({ field }) => (
            <HashtagInput label="태그" maxLength={10} errorMessage={errors.hashtags?.message} {...field} />
          )}
        />
        <Controller
          name="isRankingEnabled"
          control={control}
          render={({ field }) => <RankingCheckBox checked={field.value} onChange={field.onChange} />}
        />
        <Controller
          control={control}
          name="chatroomPassword"
          render={({ field }) => (
            <PrimaryInput
              {...field}
              label="비밀번호"
              maxLength={20}
              isRequired
              hasCount
              errorMessage={errors.chatroomPassword?.message}
            />
          )}
        />
      </div>
    </div>
  );
};

export default ChatroomFields;
