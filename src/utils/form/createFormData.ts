import { filteredData } from '@/utils/form/filteredFormData';

export const createFormData = <T extends Record<string, any>>(
  formData: T,
  isDirty?: boolean,
  imageFieldKey?: keyof T,
): FormData => {
  const postData = { ...formData } as Record<string, any>;

  if (imageFieldKey && isDirty) {
    const imageValue = formData[imageFieldKey];
    postData.isDefaultProfile = !imageValue;
  } else if (imageFieldKey) {
    delete postData[imageFieldKey as string];
  }

  const filtered = filteredData(postData);
  const form = new FormData();

  Object.entries(filtered).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => form.append(key, v));
    } else {
      form.append(key, typeof value === 'boolean' ? String(value) : value);
    }
  });

  return form;
};
