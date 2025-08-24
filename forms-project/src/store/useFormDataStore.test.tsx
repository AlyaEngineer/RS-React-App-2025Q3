import { describe, beforeEach, it, expect } from "vitest";

import { useFormStore } from './useFormDataStore';
import type { FormDataType } from "./useFormDataStore";

const emptyForm: FormDataType = {
  name: '',
  age: '',
  gender: '',
  country: '',
  email: '',
  password: '',
  confirmPassword: '',
  picture: null,
  acceptTnC: false
};

describe('useFormStore', () => {
  beforeEach(() => {
    useFormStore.setState({
      uncontrolledForm: { ...emptyForm },
      hookForm: { ...emptyForm }
    });
  });

  it('updates uncontrolledForm on submit', () => {
    useFormStore.getState().setUncontrolledForm({
      ...emptyForm,
      name: 'Alice',
      age: '25',
      acceptTnC: true
    });

    const form = useFormStore.getState().uncontrolledForm!;
    expect(form.name).toBe('Alice');
    expect(form.age).toBe('25');
    expect(form.acceptTnC).toBe(true);
  });

  it('updates hookForm on submit', () => {
    useFormStore.getState().setHookForm({
      ...emptyForm,
      name: 'Bob',
      age: '30',
      acceptTnC: true
    });

    const form = useFormStore.getState().hookForm!;
    expect(form.name).toBe('Bob');
    expect(form.age).toBe('30');
    expect(form.acceptTnC).toBe(true);
  });
});
