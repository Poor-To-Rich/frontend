export type SettingOptionType = {
  title: string;
  to?: string;
  modalType?: ModalType;
  externalUrl?: string;
};

export type TapBarType = 'main' | 'month-week' | 'chart' | 'chat' | 'setting';

export type ModalType = 'logout' | 'dataReset' | 'pwa' | null;

export interface SentryFallbackProps {
  error: unknown;
  componentStack?: string;
  eventId?: string;
  resetError?: () => void;
}

export type StepData = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export type DeviceConfig = {
  title: string;
  subtitle: string;
  steps: StepData[];
};
