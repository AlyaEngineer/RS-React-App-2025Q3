export interface ResultsProps {
  searchQuery: string;
}

export interface SearchProps {
  onSearch: (query: string) => void;
}

export interface SearchState {
  query: string;
}

export interface SearchButtonProps {
  onClick: () => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
