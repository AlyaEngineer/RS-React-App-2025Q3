import { cn } from '../lib/cn';
import type { FormDataType } from '../store/useFormDataStore';

type Props = {
  data: FormDataType;
  highlighted?: boolean;
  title: string;
};

export const FormCard = ({ data, highlighted, title }: Props) => {
  return (
    <div
      className={cn(
        'grid items-start gap-2 text-white text-shadow-lg/20',
        'border p-4 shadow-md transition-all duration-500',
        'mt-4 h-full w-72 max-md:w-auto',
        'bg-dark/4 shadow-3xl/20 rounded-xl backdrop-invert backdrop-opacity-5',
        highlighted ? 'border-green-500' : 'border-gray-300'
      )}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <h3 className="font-semibold">Name: {data.name}</h3>
      <p>Age: {data.age}</p>
      <p>Gender: {data.gender}</p>
      <p>Country: {data.country}</p>
      <p>Email: {data.email}</p>
      <div className="mt-2 h-24 w-24 justify-self-center-safe rounded">
        {data.picture ? (
          <img
            src={data.picture}
            alt="preview"
            className="shadow-3xl/20 h-full w-full rounded object-cover backdrop-invert backdrop-opacity-5"
          />
        ) : null}
      </div>
    </div>
  );
};
