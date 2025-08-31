type TableBaseProps = {
  selectedColumns: string[];
};

export interface TableBodyProps extends TableBaseProps {
  setSelectedColumns: (cols: string[]) => void;
}

export interface TableHeaderProps extends TableBaseProps {}
