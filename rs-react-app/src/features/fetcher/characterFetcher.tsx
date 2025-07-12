import { Component } from 'react';
import { Character } from '@/features/types';
import { fetchCharactersByName } from '@/features/api/character';

type Props = {
  query: string;
  children: (data: {
    loading: boolean;
    error: string | null;
    characters: Character[];
  }) => React.ReactNode;
};

type State = {
  loading: boolean;
  error: string | null;
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
    } catch {
      this.setState({ error: 'Failed to load data', loading: false });
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
