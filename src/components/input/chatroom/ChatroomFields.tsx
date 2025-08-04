import PrimaryInput from '@/components/input/PrimaryInput';
import SelectBox from '@/components/input/SelectBox';
import TextArea from '@/components/input/TextArea';
import { ChatroomFormDataType } from '@/types/chatTypes';
import { Controller, useFormContext } from 'react-hook-form';
import RankingCheckBox from '@/components/input/chatroom/RankingCheckBox';
import { MAX_MEMBER_COUNT_OPTIONS } from '@/constants/options';
import ProfileImageInput from '@/components/input/ProfileImageInput';
import HashtagInput from './HashtagInput';

const ChatroomFields = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ChatroomFormDataType>();

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-center">
        <Controller name="chatroomImage" control={control} render={({ field }) => <ProfileImageInput {...field} />} />
      </div>
      <div className="flex flex-col gap-3 my-15">
        <PrimaryInput
          {...register('chatroomTitle')}
          label="채팅방 이름"
          isRequired
          errorMessage={errors.chatroomTitle?.message}
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
            <HashtagInput label="태그" maxLength={10} isRequired errorMessage={errors.hashtags?.message} {...field} />
          )}
        />
        <Controller
          name="isRankingEnabled"
          control={control}
          render={({ field }) => <RankingCheckBox checked={field.value} onChange={field.onChange} />}
        />
        <PrimaryInput {...register('chatroomPassword')} label="비밀번호" />
      </div>
    </div>
  );
};

export default ChatroomFields;
