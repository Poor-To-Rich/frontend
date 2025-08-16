import { ReportReasonType } from '@/types/chatTypes';
import { SettingOptionType } from '@/types/types';

export const LOADING_OPTIONS = [{ label: '불러오는 중..', value: '불러오는 중..' }];

export const GENDER_OPTIONS = [
  { label: '여자', value: 'FEMALE' },
  { label: '남자', value: 'MALE' },
];

export const JOB_OPTIONS = [
  { label: '선택안함', value: '선택안함' },
  { label: '학생', value: '학생' },
  { label: '주부', value: '주부' },
  { label: '직장인', value: '직장인' },
  { label: '자영업자', value: '자영업자' },
  { label: '무직', value: '무직' },
  { label: '알바', value: '알바' },
];

export const INCOME_CATEGORIES = [
  { label: '용돈', value: '용돈', color: '#4A90E2' },
  { label: '월급', value: '월급', color: '#228B22' },
  { label: '보너스', value: '보너스', color: '#E5D038' },
  { label: '부수입', value: '부수입', color: '#9B51E0' },
  { label: '기타', value: '기타', color: '#BDBDBD' },
];

export const EXPENSE_CATEGORIES = [
  { label: '주거비', value: '주거비', color: '#4A90E2' },
  { label: '식비', value: '식비', color: '#7ED321' },
  { label: '교통비', value: '교통비', color: '#F5A623' },
  { label: '쇼핑', value: '쇼핑', color: '#FF6F61' },
  { label: '건강/의료', value: '건강/의료', color: '#50E3C2' },
  { label: '교육', value: '교육', color: '#4A4A8A' },
  { label: '문화/취미', value: '문화/취미', color: '#E563FF' },
  { label: '여행/숙박', value: '여행/숙박', color: '#2AB6D9' },
  { label: '선물/경조사', value: '선물/경조사', color: '#E5D038' },
  { label: '미용', value: '미용', color: '#FFB1C1' },
  { label: '술/유흥', value: '술/유흥', color: '#9B51E0' },
  { label: '카페', value: '카페', color: '#B88A69' },
  { label: '저축/투자', value: '저축/투자', color: '#228B22' },
  { label: '펫 케어', value: '펫 케어', color: '#E7CEA0' },
  { label: '기타', value: '기타', color: '#BDBDBD' },
];

export const EXPENSE_METHODS = [
  { label: '체크카드', value: '체크카드' },
  { label: '신용카드', value: '신용카드' },
  { label: '계좌이체', value: '계좌이체' },
  { label: '현금', value: '현금' },
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
  { title: '반복 수입 데이터', to: '/iteration-data?type=수입' },
  { title: '반복 지출 데이터', to: '/iteration-data?type=지출' },
  { title: '전체 데이터 초기화', modalType: 'dataReset' },
];

export const INFORMATION_OPTIONS: SettingOptionType[] = [
  { title: '앱으로 설치하기', modalType: 'pwa' },
  {
    title: '의견 보내기',
    externalUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSd-IGtKdkMbo1lLe943G7g7lGlPyIHr6iSZPSm9D0b8y1_4Kw/viewform?usp=sharing&ouid=113670142221324954659',
  },
];

export const REPORT_REASONS_OPTIONS: { label: string; value: ReportReasonType }[] = [
  { label: '욕설 / 비하', value: 'INSULT' },
  { label: '성희롱 / 불쾌한 표현', value: 'SEXUAL' },
  { label: '광고 / 스팸', value: 'SPAM' },
  { label: '도배 / 무의미한 글 반복', value: 'FLOOD' },
  { label: '정치 / 종교적 발언', value: 'POLITICAL' },
  { label: '기타 (직접 입력)', value: 'CUSTOM' },
];

export const MAX_MEMBER_COUNT_OPTIONS = (() => {
  const result = [];
  for (let i = 1; i <= 10; i++) {
    result.push({
      label: 10 * i,
      value: 10 * i,
    });
  }
  return result;
})();
