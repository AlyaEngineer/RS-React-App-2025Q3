import { YearData } from './dataTypes';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  yearData: YearData | null;
  onColumnsChange: (selected: string[]) => void;
};
