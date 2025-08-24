import { CircleX } from 'lucide-react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.currentTarget === document.activeElement) {
        onClose();
      }
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="button"
      tabIndex={0}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
    >
      <div className="shadow-3xl relative w-full max-w-md rounded-2xl bg-white p-7">
        <button
          onClick={onClose}
          className="text-text-content hover:text-button-error absolute top-2 right-2 cursor-pointer p-2"
          aria-label="Close modal"
        >
          <CircleX strokeWidth={1.25} size={28} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
