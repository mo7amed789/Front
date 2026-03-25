'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { authApi } from '@/api/auth';
import { Card } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ResetPasswordValues, resetPasswordSchema } from '@/features/auth/schemas';
import { ApiError } from '@/types/auth';
import { extractMessage, formatApiError } from '@/lib/error-messages';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get('token') ?? '', [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      newPassword: '',
    },
  });

  const onSubmit = async (values: ResetPasswordValues) => {
    try {
      const response = await authApi.resetPassword(values);
      toast.success(extractMessage(response));
    } catch (error) {
      toast.error(formatApiError(error as ApiError));
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center p-4">
      <Card>
        <h1 className="mb-4 text-2xl font-semibold">Reset password</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField htmlFor="token" label="" error={errors.token?.message}>
            <Input type='hidden' id="token" {...register('token')} error={errors.token?.message} />
          </FormField>

          <FormField htmlFor="newPassword" label="New password" error={errors.newPassword?.message}>
            <Input id="newPassword" type="password" {...register('newPassword')} error={errors.newPassword?.message} />
          </FormField>
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
