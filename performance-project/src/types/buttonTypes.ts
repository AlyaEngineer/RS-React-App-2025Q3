export type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  variant: 'add' | 'cancel' | 'ok' | 'search' | 'sort';
  className?: string;
  type?: 'submit' | 'reset' | 'button';
};
