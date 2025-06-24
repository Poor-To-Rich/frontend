interface Props {
  isEditType: boolean;
  isIterationModified: boolean;
}

export const getUpdateOptions = ({ isEditType, isIterationModified }: Props) => {
  const content = isEditType ? '해당 가계부를 편집하시겠습니까?' : '해당 가계부를 삭제하시겠습니까?';

  const baseOptions = [
    { label: '이후 반복 내역에도 적용', value: 'THIS_AND_FUTURE' },
    { label: '모든 반복 내역에 적용', value: 'ALL' },
  ];

  const options =
    isIterationModified && isEditType
      ? baseOptions
      : [{ label: '이 반복 내역에만 적용', value: 'THIS_ONLY' }, ...baseOptions];

  return {
    content,
    options,
  };
};
