'use client';

import { useState, useEffect } from 'react';

import { BREAKPOINTS, SKELETON_COUNT } from '@/config/constants';
import { cn } from '@/libs/utils';

import CharacterSkeleton from './CharacterItemSkeleton';

interface CharacterListSkeletonProps {
  hasOutlet?: boolean;
}

export default function CharacterListSkeleton({ hasOutlet = true }: CharacterListSkeletonProps) {
  const [skeletonCount, setSkeletonCount] = useState<number>(0);

  useEffect(() => {
    const getSkeletonCount = () => {
      return window.innerWidth > BREAKPOINTS.md ? SKELETON_COUNT.lg : SKELETON_COUNT.md;
    };

    const handleResize = () => {
      setSkeletonCount(getSkeletonCount());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const skeletons = Array.from({ length: skeletonCount }, (_, i) => (
    <li key={i} aria-label="character-skeleton">
      <CharacterSkeleton />
    </li>
  ));

  return (
    <ul
      className={cn(
        'grid w-full gap-4',
        hasOutlet
          ? 'grid-cols-1 md:grid-cols-1 lg:grid-cols-2'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {skeletons}
    </ul>
  );
}
