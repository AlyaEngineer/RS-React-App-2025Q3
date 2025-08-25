import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { useFormStore } from '../store/useFormDataStore';
import { formSchema } from '../validation/formSchema';

import Modal from './Modal';

type FormContentProps = {
  onClose: () => void;
  uncontrolled?: boolean;
};

type FormData = z.infer<typeof formSchema>;

export const FormContent = ({ onClose, uncontrolled }: FormContentProps) => {
  const countries = ['USA', 'UK', 'Germany', 'France', 'Canada'];
  const [preview, setPreview] = useState<string | null>(null);
  const [uncontrolledErrors, setUncontrolledErrors] = useState<Record<string, string>>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const onSubmit = (data: FormData) => {
    const file = data.picture;
    const saveForm = (pictureBase64: string | null) => {
      if (uncontrolled) {
        useFormStore.getState().setUncontrolledForm({
          ...data,
          age: String(data.age),
          picture: pictureBase64,
        });
      } else {
        useFormStore.getState().setHookForm({
          ...data,
          age: String(data.age),
          picture: pictureBase64,
        });
      }
      onClose();
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => saveForm(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      saveForm(null);
    }
  };

  const handleUncontrolledSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const file = pictureRef.current?.files?.[0] ?? undefined;

    const data: FormData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || -1,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      acceptTnC: termsRef.current?.checked || false,
      country: countryRef.current?.value || '',
      picture: file,
    };

    const result = formSchema.safeParse(data);
    if (!result.success) {
      const typedErrors: Partial<Record<keyof typeof data, string>> = {};

      result.error.issues.forEach((issue) => {
        if (issue.path.length > 0) {
          const key = issue.path[0] as keyof typeof data;
          typedErrors[key] = issue.message;
        } else {
          if (issue.message.includes('Passwords must match')) {
            typedErrors.confirmPassword = issue.message;
          }
        }
      });

      setUncontrolledErrors(typedErrors);
      return;
    }

    const saveForm = (pictureBase64: string | null) => {
      useFormStore.getState().setUncontrolledForm({
        ...data,
        age: String(data.age),
        picture: pictureBase64,
      });
      onClose();
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => saveForm(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      saveForm(null);
    }
  };

  const inputClass = `w-full border rounded p-1 focus:outline-none bg-input-background/50 border-input-background border-1 focus:border-button-reload`;

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h2 className="mb-4 text-xl font-semibold">
        {uncontrolled ? 'Uncontrolled Form' : 'Hook Form'}
      </h2>

      {uncontrolled ? (
        <form className="space-y-4" onSubmit={handleUncontrolledSubmit}>
          <input ref={nameRef} placeholder="Name" className={inputClass} />
          {uncontrolledErrors.name && <p className="text-red-500">{uncontrolledErrors.name}</p>}

          <input ref={ageRef} type="number" placeholder="Age" className={inputClass} />
          {uncontrolledErrors.age && <p className="text-red-500">{uncontrolledErrors.age}</p>}

          <label htmlFor="gender" className="sr-only">
            Gender
          </label>
          <select id="gender" ref={genderRef} className={inputClass}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {uncontrolledErrors.gender && <p className="text-red-500">{uncontrolledErrors.gender}</p>}

          <select ref={countryRef} className={inputClass}>
            <option value="">Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {uncontrolledErrors.country && (
            <p className="text-red-500">{uncontrolledErrors.country}</p>
          )}

          <input ref={emailRef} type="email" placeholder="Email" className={inputClass} />
          {uncontrolledErrors.email && <p className="text-red-500">{uncontrolledErrors.email}</p>}

          <input ref={passwordRef} type="password" placeholder="Password" className={inputClass} />
          {uncontrolledErrors.password && (
            <p className="text-red-500">{uncontrolledErrors.password}</p>
          )}

          <input
            ref={confirmPasswordRef}
            type="password"
            placeholder="Confirm Password"
            className={inputClass}
          />
          {uncontrolledErrors.confirmPassword && (
            <p className="text-red-500">{uncontrolledErrors.confirmPassword}</p>
          )}

          <input
            ref={pictureRef}
            type="file"
            accept="image/png, image/jpeg"
            className="block cursor-pointer"
            onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
          />
          {preview && <img src={preview} alt="preview" className="mt-2 h-20 w-20 rounded" />}
          {uncontrolledErrors.picture && (
            <p className="text-red-500">{uncontrolledErrors.picture}</p>
          )}

          <label className="flex items-center gap-2" htmlFor="acceptTnC">
            <input ref={termsRef} type="checkbox" className="cursor-pointer" id="acceptTnC" />
            Accept Terms & Conditions
          </label>
          {uncontrolledErrors.acceptTnC && (
            <p className="text-red-500">{uncontrolledErrors.acceptTnC}</p>
          )}

          <button
            type="submit"
            data-testid="uncontrolled-submit"
            className="bg-button-background hover:bg-button-background-hover flex cursor-pointer justify-self-end-safe rounded px-4 py-2 text-white"
          >
            Submit
          </button>
        </form>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
        >
          <input placeholder="Name" {...register('name')} className={inputClass} />
          {formState.errors.name && <p className="text-red-500">{formState.errors.name.message}</p>}

          <input type="number" placeholder="Age" {...register('age')} className={inputClass} />
          {formState.errors.age && <p className="text-red-500">{formState.errors.age.message}</p>}

          <select {...register('gender')} className={inputClass}>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {formState.errors.gender && (
            <p className="text-red-500">{formState.errors.gender.message}</p>
          )}

          <select {...register('country')} className={inputClass}>
            <option value="">Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {formState.errors.country && (
            <p className="text-red-500">{formState.errors.country.message}</p>
          )}

          <input type="email" placeholder="Email" {...register('email')} className={inputClass} />
          {formState.errors.email && (
            <p className="text-red-500">{formState.errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className={inputClass}
          />
          {formState.errors.password && (
            <p className="text-red-500">{formState.errors.password.message}</p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
            className={inputClass}
          />
          {formState.errors.confirmPassword && (
            <p className="text-red-500">{formState.errors.confirmPassword.message}</p>
          )}

          <input
            type="file"
            accept="image/png, image/jpeg"
            className="block cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? undefined;
              setValue('picture', file, { shouldValidate: true });
              handleFileChange(file ?? null);
            }}
          />
          {formState.errors.picture && (
            <p className="text-red-500">{formState.errors.picture.message}</p>
          )}
          {preview && <img src={preview} alt="preview" className="mt-2 h-20 w-20 rounded" />}

          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('acceptTnC')} className="cursor-pointer" />
            Accept Terms & Conditions
            {formState.errors.acceptTnC && (
              <p className="text-red-500">{formState.errors.acceptTnC.message}</p>
            )}
          </label>

          <button
            type="submit"
            data-testid="hookform-submit"
            disabled={!formState.isValid}
            className="bg-button-reload hover:bg-button-reload-hover flex cursor-pointer justify-self-end-safe rounded px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200"
          >
            Submit
          </button>
        </form>
      )}
    </Modal>
  );
};
