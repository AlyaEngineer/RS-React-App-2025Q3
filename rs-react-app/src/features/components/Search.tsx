import { Component } from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import { SearchProps, SearchState } from '../types/componentTypes';

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const savedQuery = localStorage.getItem('searchQuery') ?? '';
    this.state = { query: savedQuery };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    const trimmed = this.state.query.trim();
    localStorage.setItem('searchQuery', trimmed);
    this.props.onSearch(trimmed);
  };

  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.handleSearch();
        }}
        className="flex w-full items-center justify-center gap-3 rounded-[80px] max-md:flex-col"
      >
        <SearchInput value={this.state.query} onChange={this.handleInputChange} />
        <SearchButton onClick={this.handleSearch} />
      </form>
    );
  }
}

export default Search;
