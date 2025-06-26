export type SettingOptionType = {
  title: string;
  to?: string;
  modalType?: ModalType;
  externalUrl?: string;
};

export type TapBarType = 'main' | 'month-week' | 'chart' | 'talk' | 'setting';

export type ModalType = 'logout' | 'dataReset' | null;

export interface SentryFallbackProps {
  error: unknown;
  componentStack?: string;
  eventId?: string;
  resetError?: () => void;
}
