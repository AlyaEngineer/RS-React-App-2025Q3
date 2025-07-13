import { Component } from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';

interface SearchProps {
  onSearch: (query: string) => void;
}

interface SearchState {
  query: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const savedQuery = localStorage.getItem('searchQuery') ?? '';
    this.state = { query: savedQuery };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearchClick = () => {
    const trimmed = this.state.query.trim();
    localStorage.setItem('searchQuery', trimmed);
    this.props.onSearch(trimmed);
  };

  render() {
    return (
      <div className="flex w-full items-center justify-center gap-3 rounded-[80px] max-md:flex-col">
        <SearchInput value={this.state.query} onChange={this.handleInputChange} />
        <SearchButton onClick={this.handleSearchClick} />
      </div>
    );
  }
}

export default Search;
