import { useEffect } from 'react';
import { FieldValues, useFormContext, UseFormSetError } from 'react-hook-form';
import { useNicknameFieldStore } from '@/stores/fields/useNicknameFieldStore';
import { filteredData } from '@/utils/form/filteredFormData';
import { OnboardingFormType, ProfileFormData } from '@/types/authTypes';

type UseUserProfileFormParams<T extends FieldValues> = {
  getHook: () => { data?: T; isPending: boolean };
  updateHook: (setError: UseFormSetError<T>) => { mutate: (data: FormData) => void; isPending?: boolean };
  checkChanged?: boolean;
};

export const useUserProfileForm = <TForm extends ProfileFormData | OnboardingFormType>({
  getHook,
  updateHook,
  checkChanged,
}: UseUserProfileFormParams<TForm>) => {
  const {
    reset,
    handleSubmit,
    setError,
    formState: { isValid, dirtyFields },
  } = useFormContext<TForm>();
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

  const onSubmit = (formData: TForm) => {
    const postData: Record<string, any> = { ...formData };

    if ('profileImage' in dirtyFields) {
      if (!formData.profileImage) {
        postData.isDefaultProfile = true;
      } else {
        postData.isDefaultProfile = false;
      }
    } else {
      delete postData.profileImage;
    }

    const requestData = filteredData(postData);
    const form = new FormData();

    Object.entries(requestData).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        value = String(value);
      }
      form.append(key, value);
    });

    mutate(form);
  };

  return {
    isPending,
    isMutating,
    handleSubmit: handleSubmit(onSubmit),
    isDisabled,
  };
};
