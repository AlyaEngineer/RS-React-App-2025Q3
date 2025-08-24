import { useState, useRef } from 'react';

import { useFormStore } from '../store/useFormDataStore';

import Modal from './Modal';

type FormContentProps = {
  onClose: () => void;
  uncontrolled?: boolean;
};

export const FormContent = ({ onClose, uncontrolled }: FormContentProps) => {
  const countries = ['USA', 'UK', 'Germany', 'France', 'Canada'];
  const [preview, setPreview] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    acceptTnC: false,
    country: '',
    picture: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, type, value, checked, files } = target;

    let fieldValue: string | boolean | File | null = value;

    if (type === 'checkbox') {
      fieldValue = checked;
    } else if (type === 'file') {
      fieldValue = files?.[0] ?? null;

      if (fieldValue) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(fieldValue);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const file = uncontrolled ? pictureRef.current?.files?.[0] : formData.picture;

    const saveForm = (pictureBase64: string | null) => {
      if (uncontrolled) {
        useFormStore.getState().setUncontrolledForm({
          name: nameRef.current?.value || '',
          age: ageRef.current?.value || '',
          email: emailRef.current?.value || '',
          password: passwordRef.current?.value || '',
          confirmPassword: confirmPasswordRef.current?.value || '',
          gender: genderRef.current?.value || '',
          acceptTnC: termsRef.current?.checked || false,
          country: countryRef.current?.value || '',
          picture: pictureBase64,
        });
      } else {
        useFormStore.getState().setHookForm({
          ...formData,
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

  const inputClass = `w-full border rounded p-1 focus:outline-none bg-input-background/50 border-input-background border-1 ${
    uncontrolled ? 'focus:border-button-background' : 'focus:border-button-reload'
  }`;

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h2 className="mb-4 text-xl font-semibold">
        {uncontrolled ? 'Uncontrolled Form' : 'Hook Form'}
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="name" className="block font-medium">
          <input
            id="name"
            name="name"
            placeholder="Name"
            autoComplete="name"
            {...(uncontrolled
              ? { ref: nameRef }
              : { name: 'name', value: formData.name, onChange: handleChange })}
            className={inputClass}
          />
        </label>

        <label htmlFor="age" className="block font-medium">
          <input
            id="age"
            name="age"
            type="number"
            placeholder="Age"
            autoComplete="bday"
            {...(uncontrolled
              ? { ref: ageRef }
              : { name: 'age', value: formData.age, onChange: handleChange })}
            className={inputClass}
          />
        </label>

        <label htmlFor="gender" className="block font-medium">
          <select
            id="gender"
            name="gender"
            autoComplete="sex"
            {...(uncontrolled
              ? { ref: genderRef, defaultValue: '' }
              : { name: 'gender', value: formData.gender, onChange: handleChange })}
            className={inputClass}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label htmlFor="country" className="block font-medium">
          <select
            id="country"
            name="country"
            autoComplete="country-name"
            {...(uncontrolled
              ? { ref: countryRef, defaultValue: '' }
              : { name: 'country', value: formData.country, onChange: handleChange })}
            className={inputClass}
          >
            <option value="">Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="email" className="block font-medium">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...(uncontrolled
              ? { ref: emailRef }
              : { name: 'email', value: formData.email, onChange: handleChange })}
            className={inputClass}
          />
        </label>

        <label htmlFor="password" className="block font-medium">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            {...(uncontrolled
              ? { ref: passwordRef }
              : { name: 'password', value: formData.password, onChange: handleChange })}
            className={inputClass}
          />
        </label>

        <label htmlFor="confirmPassword" className="block font-medium">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            autoComplete={uncontrolled ? undefined : 'new-password'}
            {...(uncontrolled
              ? { ref: confirmPasswordRef }
              : {
                  name: 'confirmPassword',
                  value: formData.confirmPassword,
                  onChange: handleChange,
                })}
            className={inputClass}
          />
        </label>

        <label htmlFor="picture" className="block font-medium">
          <input
            id="picture"
            name="picture"
            type="file"
            accept="image/png, image/jpeg"
            {...(uncontrolled ? { ref: pictureRef } : { name: 'picture', onChange: handleChange })}
            className="block cursor-pointer"
          />
          {preview && <img src={preview} alt="preview" className="mt-2 h-20 w-20 rounded" />}
        </label>

        <label htmlFor="terms" className="flex items-center gap-2">
          <input
            id="terms"
            name="acceptTnC"
            type="checkbox"
            {...(uncontrolled
              ? { ref: termsRef }
              : { name: 'acceptTnC', checked: formData.acceptTnC, onChange: handleChange })}
            className="cursor-pointer"
          />
          Accept Terms & Conditions
        </label>

        <button
          type="submit"
          className={`flex cursor-pointer justify-self-end-safe rounded px-4 py-2 ${
            uncontrolled
              ? 'bg-button-background hover:bg-button-background-hover'
              : 'bg-button-reload hover:bg-button-reload-hover'
          } text-white`}
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};
