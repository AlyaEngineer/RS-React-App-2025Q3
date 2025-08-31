export type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  variant: 'add' | 'cancel' | 'ok';
  className?: string;
};
