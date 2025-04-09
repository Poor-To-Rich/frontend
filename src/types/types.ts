export type OverviewLogType = {
  startDate: Date;
  endDate: Date;
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
};

export type SelectOptionsType = {
  label: string;
  value: string;
};

export type BaseCategoriesType = {
  color: string;
  name: string;
};

export type DefaultCategoriesType = BaseCategoriesType & {
  visibility: boolean;
};

export type UserCategoriesType = BaseCategoriesType & {
  id: number;
};

export type SettingOptionType = {
  title: string;
  to?: string;
  modalType?: ModalType;
  externalUrl?: string;
};

export type TapBarType = 'main' | 'month-week' | 'chart' | 'talk' | 'setting';

export type VerifyButtonType = '인증' | '확인' | '중복확인';

export type ModalType = 'logout' | 'dataReset' | null;
