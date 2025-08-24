import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .nonempty('Name is required')
      .refine((val) => /^[A-Za-z\s]+$/.test(val), {
        message: 'Name must contain only Latin letters',
      })
      .refine((val) => /^[A-Z]/.test(val), {
        message: 'Name must start with an uppercase letter',
      }),

    age: z.preprocess(
      (val) => {
        if (val === '' || val == null) return undefined;
        return Number(val);
      },
      z
        .number()
        .nonnegative('Age must be a positive number')
        .refine((val) => val !== undefined, { message: 'Age is required' })
    ),

    email: z
      .email('Invalid email')
      .regex(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        'Email must use only Latin letters'
      ),

    password: z
      .string()
      .min(1, 'Password is required')
      .refine((val) => /[0-9]/.test(val), 'Password must contain a number')
      .refine((val) => /[A-Z]/.test(val), 'Password must contain an uppercase letter')
      .refine((val) => /[a-z]/.test(val), 'Password must contain a lowercase letter')
      .refine((val) => /[^a-zA-Z0-9]/.test(val), 'Password must contain a special character')
      .refine(
        (val) => /^[A-Za-z0-9!@#$%^&*()_+\-=<>?{}[\]|:;'",.~`]+$/.test(val),
        'Password must contain only Latin characters'
      ),

    confirmPassword: z.string(),

    gender: z.string().refine((val) => ['male', 'female'].includes(val), {
      message: 'Gender is required',
    }),

    acceptTnC: z.boolean().refine((val) => val === true, {
      message: 'You must accept terms',
    }),

    country: z.string().nonempty('Country is required'),

    picture: z
      .instanceof(File)
      .optional()
      .refine(
        (file) =>
          !file || (file instanceof File && ['image/png', 'image/jpeg'].includes(file.type)),
        {
          message: 'Only PNG or JPEG files are allowed',
        }
      )
      .refine((file) => !file || (file instanceof File && file.size <= 5_000_000), {
        message: 'File size must be less than 5MB',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
