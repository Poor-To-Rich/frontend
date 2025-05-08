export const ITERATION_CYCLE = [
  { label: '반복없음', value: 'none' },
  { label: '매일', value: 'daily' },
  { label: '주중 매일 (월-금)', value: 'weekday' },
  { label: '매주', value: 'weekly' },
  { label: '매월', value: 'monthly' },
  { label: '매달 말일', value: 'endOfMonth' },
  { label: '매년', value: 'yearly' },
  { label: '사용자화', value: 'custom' },
] as const;

export const CUSTOM_ITERATION_CYCLE = [
  { label: '매일', value: 'daily' },
  { label: '매주', value: 'weekly' },
  { label: '매월', value: 'monthly' },
  { label: '매년', value: 'yearly' },
] as const;
