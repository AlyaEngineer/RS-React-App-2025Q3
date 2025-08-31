type TableBaseProps = {
  selectedColumns: string[];
};

export interface TableBodyProps extends TableBaseProps {
  setSelectedColumns: (cols: string[]) => void;
  selectedYear: number;
}

export interface TableHeaderProps extends TableBaseProps {}
