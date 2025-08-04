import ProfileImageField from '@/components/input/auth/ProfileImageField';
import PrimaryInput from '@/components/input/PrimaryInput';
import SelectBox from '@/components/input/SelectBox';
import TextArea from '@/components/input/TextArea';
import { ChatroomFormDataType } from '@/types/chatTypes';
import { Controller, useFormContext } from 'react-hook-form';
import RankingCheckBox from '@/components/input/RankingCheckBox';

const ChatroomField = () => {
  const form = useFormContext<ChatroomFormDataType>();
  const {
    control,
    register,
    formState: { errors },
  } = form;

  return (
    <div className="w-full flex flex-col">
      <ProfileImageField />
      <div className="flex flex-col gap-3 my-15">
        <PrimaryInput
          {...register('chatroomTitle')}
          label="채팅방 이름"
          isRequired
          errorMessage={errors.chatroomTitle?.message}
        />
        <SelectBox
          {...register('maxMemberCount')}
          label="최대인원"
          options={[{ label: 10, value: 10 }]}
          isRequired
          errorMessage={errors.maxMemberCount?.message}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              label="채팅방 소개"
              maxLength={100}
              placeholder={`- 어떤 사람과 대화하고 싶으신가요? 
- 지켜야할 규칙, 공지 사항 등을 작성해주세요.
            `}
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
            <TextArea
              label="태그"
              maxLength={50}
              placeholder="# 태그를 입력하면 관심사가 비슷한 사람에게 발견돼요"
              errorMessage={errors.hashtags?.message}
              {...field}
              value={field.value ?? ''}
            />
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

export default ChatroomField;
