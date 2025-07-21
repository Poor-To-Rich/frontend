export interface AsyncButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isPending?: boolean;
  loadingSize?: number;
  fullWidth?: boolean;
  className?: string;
}
