import { SettingOptionType } from '@/types/types';

export const GENDER_OPTIONS = [
  { label: '여자', value: '여자' },
  { label: '남자', value: '남자' },
];

export const JOB_OPTIONS = [
  { label: '선택안함', value: '' },
  { label: '학생', value: '학생' },
  { label: '주부', value: '주부' },
  { label: '직장인', value: '직장인' },
  { label: '자영업자', value: '자영업자' },
  { label: '무직', value: '무직' },
  { label: '알바', value: '알바' },
];

export const INCOME_CATEGORIES = [
  { label: '용돈', value: '용돈' },
  { label: '월급', value: '월급' },
  { label: '보너스', value: '보너스' },
  { label: '부수입', value: '부수입' },
  { label: '기타', value: '기타' },
];

export const EXPENSE_CATEGORIES = [
  { label: '주거비', value: '주거비' },
  { label: '식비', value: '식비' },
  { label: '교통비', value: '교통비' },
  { label: '쇼핑', value: '쇼핑' },
  { label: '건강/의료', value: '건강/의료' },
  { label: '교육', value: '교육' },
  { label: '문화/취미', value: '문화/취미' },
  { label: '여행/숙박', value: '여행/숙박' },
  { label: '선물/경조사', value: '선물/경조사' },
  { label: '미용', value: '미용' },
  { label: '술/유흥', value: '술/유흥' },
  { label: '카페', value: '카페' },
  { label: '저축/투자', value: '저축/투자' },
  { label: '펫 케어', value: '펫 케어' },
  { label: '기타', value: '기타' },
];

export const EXPENSE_METHODS = [
  { label: '현금', value: '현금' },
  { label: '신용카드', value: '신용카드' },
  { label: '체크카드', value: '체크카드' },
  { label: '계좌이체', value: '계좌이체' },
];

export const ACCOUNT_OPTIONS: SettingOptionType[] = [
  { title: '프로필 편집', to: '/profile' },
  { title: '비밀번호 변경', to: '/update-password' },
  { title: '이메일 변경', to: '/update-email' },
  { title: '로그아웃', modalType: 'logout' },
];

export const DATA_OPTIONS: SettingOptionType[] = [
  { title: '수입 카테고리', to: '/categories?type=수입' },
  { title: '지출 카테고리', to: '/categories?type=지출' },
  { title: '반복 수입 데이터', to: '/iteration-data?type="수입' },
  { title: '반복 지출 데이터', to: '/iteration-data?type="지출' },
  { title: '전체 데이터 초기화', modalType: 'dataReset' },
];

export const INFORMATION_OPTIONS: SettingOptionType[] = [{ title: '의견 보내기', externalUrl: '/' }];
