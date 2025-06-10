'use client';

import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useEffect, useState} from 'react';
import {NextRequest} from 'next/server';
import {useRouter} from 'next/navigation';

type FormData = {
  name: string;
  email: string;
  password: string;
  location: string;
  phone: string;
};

// Common Pakistani cities — you can expand this
const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Hyderabad',
  'Sialkot'
];

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm<FormData>();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    // useEffect(() => {}, [data]);
    // console.log('Form submitted:', data);
    try {
      setLoading(true);
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        router.push('/');
        router.refresh();
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border shadow-md rounded-xl bg-background">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        Sign Up
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <Input
            type="text"
            placeholder="Name"
            {...register('name', {
              required: 'Name is required',
              maxLength: {
                value: 24,
                message: 'Name must be less than 24 characters'
              }
            })}
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
          />
          {errors.password && (
            <p className="text-sm text-destructive mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Location (select) */}
        <div>
          <select
            {...register('location', {
              required: 'Location is required'
            })}
            className="w-full p-2 border rounded-md text-sm bg-background"
            defaultValue=""
          >
            <option value="" disabled>
              Select Location
            </option>
            {PAKISTAN_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="text-sm text-destructive mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Phone number */}
        <div>
          <Input
            type="tel"
            placeholder="03XXXXXXXXX"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^03[0-9]{9}$/,
                message:
                  'Enter valid Pakistani mobile number (e.g. 03001234567)'
              }
            })}
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>

        {/* Success */}
        {submitted && (
          <p className="text-sm text-green-600 dark:text-green-400 text-center mt-2">
            Signed up successfully!
          </p>
        )}
      </form>
    </div>
  );
}
