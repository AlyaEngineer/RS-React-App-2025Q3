import { Component } from 'react';

import { CharacterListSkeletonState } from '../types/viewTypes';

import CharacterSkeleton from './CharacterSceleton';

class CharacterListSkeleton extends Component<object, CharacterListSkeletonState> {
  constructor(props: object) {
    super(props);
    this.state = {
      skeletonCount: this.getSkeletonCount(),
    };
  }

  getSkeletonCount = () => {
    return window.innerWidth >= 768 ? 6 : 4;
  };

  handleResize = () => {
    const newCount = this.getSkeletonCount();
    if (newCount !== this.state.skeletonCount) {
      this.setState({ skeletonCount: newCount });
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const count = this.state.skeletonCount;
    const skeletons = [];

    for (let i = 0; i < count; i++) {
      skeletons.push(
        <li key={i}>
          <CharacterSkeleton />
        </li>
      );
    }

    return (
      <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">{skeletons}</ul>
    );
  }
}

export default CharacterListSkeleton;
