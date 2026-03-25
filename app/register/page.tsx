'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { authApi } from '@/api/auth';
import { Card } from '@/components/ui/card';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';
import { RegisterValues, registerSchema } from '@/features/auth/schemas';
import { formatApiError } from '@/lib/error-messages';
import { ApiError } from '@/types/auth';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterValues) => {
    try {
      const response = await authApi.register(values);
      toast.success(response.message ?? 'Registration successful');
      reset();
    } catch (error) {
      toast.error(formatApiError(error as ApiError));
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center p-4">
      <Card>
        <h1 className="mb-4 text-2xl font-semibold">Register</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput id="name" label="Name" autoComplete="name" {...register('name')} error={errors.name?.message} />

          <FormInput
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            {...register('email')}
            error={errors.email?.message}
          />

          <FormInput
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            {...register('password')}
            error={errors.password?.message}
          />

          <Button className="w-full" type="submit" isLoading={isSubmitting}>
            Create account
          </Button>
        </form>
        <div className="mt-4 text-sm">
          <Link href="/login">Back to login</Link>
        </div>
      </Card>
    </main>
  );
}
