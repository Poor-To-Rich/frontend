export type OverviewLogType = {
  startDate: Date;
  endDate: Date;
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
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

export type ModalType = 'logout' | 'dataReset' | null;
