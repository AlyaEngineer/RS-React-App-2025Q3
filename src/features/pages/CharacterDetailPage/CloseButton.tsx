import { CircleX } from 'lucide-react';

type CloseButtonProps = {
  onClose: () => void;
  className?: string;
};

export function CloseButton({ onClose, className }: CloseButtonProps) {
  return (
    <button
      onClick={onClose}
      className={`hover:text-button-error text-white hover:cursor-pointer ${className ?? ''}`}
      aria-label="close-button"
    >
      <CircleX strokeWidth={1.25} size={32} />
    </button>
  );
}
