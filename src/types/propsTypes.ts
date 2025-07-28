export interface AsyncButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isPending?: boolean;
  loadingSize?: number;
  spinnerColor?: string;
  className?: string;
}

export interface DefaultButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

export type DropDownMenuOption = {
  label: string;
  onClick?: () => void;
  danger?: boolean;
};
