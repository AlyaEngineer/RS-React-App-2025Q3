import type { ButtonHTMLAttributes } from 'react';

import { cn } from '../lib/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className: string;
  children: React.ReactNode;
};

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'flex w-1/3 items-center justify-center gap-2.5 p-4 max-md:w-full',
        'cursor-pointer',
        'rounded-xl shadow-xl inset-shadow-sm',
        'transition delay-150 duration-300 ease-in-out',
        'text-white text-shadow-2xs dark:text-gray-600',
        'hover:shadow-xl/20 focus:border-none',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
