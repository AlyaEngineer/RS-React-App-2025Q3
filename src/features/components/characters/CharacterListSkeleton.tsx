import { useState, useEffect } from 'react';

import { BREAKPOINTS, SKELETON_COUNT } from '@/config/constants';

import CharacterSkeleton from './CharacterItemSkeleton';

export default function CharacterListSkeleton() {
  const getSkeletonCount = () => {
    return window.innerWidth > BREAKPOINTS.md ? SKELETON_COUNT.lg : SKELETON_COUNT.md;
  };

  const [skeletonCount, setSkeletonCount] = useState<number>(getSkeletonCount());

  useEffect(() => {
    const handleResize = () => {
      const newCount = getSkeletonCount();
      setSkeletonCount(newCount);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const skeletons = [];
  for (let i = 0; i < skeletonCount; i++) {
    skeletons.push(
      <li key={i} aria-label="character-skeleton">
        <CharacterSkeleton />
      </li>
    );
  }

  return (
    <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">{skeletons}</ul>
  );
}
