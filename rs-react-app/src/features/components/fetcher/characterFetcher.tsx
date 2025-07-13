import { Component } from 'react';
import { ApiError } from '@/features/types/componentTypes';
import { fetchCharactersByName } from '@/features/api/characterApi';
import { CharacterFetcherProps, CharacterFetcherState } from '@/features/types/componentTypes';

class CharacterFetcher extends Component<CharacterFetcherProps, CharacterFetcherState> {
  constructor(props: CharacterFetcherProps) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      characters: [],
    };
  }

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps: CharacterFetcherProps) {
    if (prevProps.query !== this.props.query) {
      this.load();
    }
  }

  async load() {
    this.setState({ loading: true, error: null });

    try {
      const characters = await fetchCharactersByName(this.props.query);
      this.setState({ characters, loading: false });
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'status' in error && 'message' in error) {
        this.setState({ error: error as ApiError, loading: false });
      } else {
        this.setState({
          error: { status: 0, message: 'Unexpected error' },
          loading: false,
        });
      }
    }
  }

  render() {
    return this.props.children({
      loading: this.state.loading,
      error: this.state.error,
      characters: this.state.characters,
    });
  }
}

export default CharacterFetcher;
