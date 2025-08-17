'use client';

import { ReactNode } from 'react';

import { Flyout } from './Flyout';

export default function FlyoutWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Flyout />
    </>
  );
}
