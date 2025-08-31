import { ButtonProps } from '@/types/buttonTypes';

export default function Button({
  onClick,
  children,
  variant = 'add',
  className = '',
}: ButtonProps) {
  let baseStyles =
    'rounded px-2 py-1 border text-center hover:cursor-pointer transition-all duration-300 hover:shadow-2xl';

  let variantStyles = '';
  switch (variant) {
    case 'add':
      variantStyles = 'border-blue-500 bg-blue-500 font-bold text-white hover:bg-blue-700';
      break;
    case 'cancel':
      variantStyles =
        'rounded-md border-transparent px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 hover:shadow-none';
      break;
    case 'ok':
      variantStyles =
        'rounded-md ml-2 border-transparent bg-green-600 px-4 py-2 text-sm text-white shadow-md hover:bg-green-700 focus:bg-green-700 focus:shadow-none active:bg-green-700 active:shadow-none';
      break;
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </button>
  );
}
