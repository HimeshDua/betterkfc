'use client';

import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useState} from 'react';

type SignInData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm<SignInData>();

  const [signedIn, setSignedIn] = useState(false);

  const onSubmit = async (data: SignInData) => {
    console.log('Sign In Data:', data);
    setSignedIn(true);
    setTimeout(() => setSignedIn(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border shadow-md rounded-xl bg-background">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        Sign In
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>

        {signedIn && (
          <p className="text-sm text-green-600 dark:text-green-400 text-center mt-2">
            Signed in successfully!
          </p>
        )}
      </form>
    </div>
  );
}
