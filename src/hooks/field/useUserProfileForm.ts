import { useEffect } from 'react';
import { useFormContext, UseFormSetError } from 'react-hook-form';
import { useNicknameFieldStore } from '@/stores/fields/useNicknameFieldStore';
import { ProfileFormData } from '@/types/authTypes';
import { createFormData } from '@/utils/form/createFormData';

type UseUserProfileFormParams = {
  getHook: () => { data?: ProfileFormData; isPending: boolean };
  updateHook: (setError: UseFormSetError<ProfileFormData>) => { mutate: (data: FormData) => void; isPending?: boolean };
  checkChanged?: boolean;
};

export const useUserProfileForm = ({ getHook, updateHook, checkChanged }: UseUserProfileFormParams) => {
  const {
    reset,
    handleSubmit,
    setError,
    formState: { isValid, dirtyFields },
  } = useFormContext<ProfileFormData>();
  const { data, isPending } = getHook();
  const { mutate, isPending: isMutating } = updateHook(setError);

  const { nicknameStatus } = useNicknameFieldStore();
  const isNicknameChanged = Boolean((dirtyFields as any).nickname);
  const isChanged = Object.keys(dirtyFields).length > 0;

  const isDisabled = !isValid || (checkChanged && !isChanged) || (isNicknameChanged && !nicknameStatus.isVerify);

  useEffect(() => {
    if (data) {
      const sanitized = {
        ...data,
        profileImage: (data as any).profileImage ?? undefined,
      };
      reset(sanitized);
    }
  }, [data, reset]);

  const onSubmit = (formData: ProfileFormData) => {
    const isImageDirty = dirtyFields.profileImage === true;
    const body = createFormData(formData, isImageDirty, 'profileImage');
    mutate(body);
  };

  return {
    isPending,
    isMutating,
    handleSubmit: handleSubmit(onSubmit),
    isDisabled,
  };
};
