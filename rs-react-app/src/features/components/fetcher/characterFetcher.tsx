import { Component } from 'react';
import { ApiError, Character } from '@/features/types/types';
import { fetchCharactersByName } from '@/features/api/characterApi';

type Props = {
  query: string;
  children: (data: {
    loading: boolean;
    error: ApiError | null;
    characters: Character[];
  }) => React.ReactNode;
};

type State = {
  loading: boolean;
  error: ApiError | null;
  characters: Character[];
};

class CharacterFetcher extends Component<Props, State> {
  constructor(props: Props) {
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

  componentDidUpdate(prevProps: Props) {
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
