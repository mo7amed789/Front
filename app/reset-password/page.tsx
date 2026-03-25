'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { authApi } from '@/api/auth';
import { Card } from '@/components/ui/card';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';
import { ResetPasswordValues, resetPasswordSchema } from '@/features/auth/schemas';
import { ApiError } from '@/types/auth';
import { formatApiError } from '@/lib/error-messages';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get('token') ?? '';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: tokenFromUrl,
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    setValue('token', tokenFromUrl);
  }, [setValue, tokenFromUrl]);

  const onSubmit = async (values: ResetPasswordValues) => {
    try {
      await authApi.resetPassword({
        token: values.token,
        newPassword: values.newPassword,
      });
      toast.success('Password has been reset. Please log in.');
      router.push('/login');
    } catch (error) {
      toast.error(formatApiError(error as ApiError));
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center p-4">
      <Card>
        <h1 className="mb-4 text-2xl font-semibold">Reset password</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register('token')} />

          {!tokenFromUrl && (
            <FormInput id="token" label="Reset token" {...register('token')} error={errors.token?.message} />
          )}

          <FormInput
            id="newPassword"
            label="New password"
            type="password"
            autoComplete="new-password"
            {...register('newPassword')}
            error={errors.newPassword?.message}
          />

          <FormInput
            id="confirmPassword"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <Button className="w-full" type="submit" isLoading={isSubmitting}>
            Reset password
          </Button>
        </form>
        <div className="mt-4 text-sm">
          <Link href="/login">Back to login</Link>
        </div>
      </Card>
    </main>
  );
}
