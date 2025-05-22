export type SettingOptionType = {
  title: string;
  to?: string;
  modalType?: ModalType;
  externalUrl?: string;
};

export type TapBarType = 'main' | 'month-week' | 'chart' | 'talk' | 'setting';

export type ModalType = 'logout' | 'dataReset' | null;
