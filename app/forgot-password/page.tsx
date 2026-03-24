'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { authApi } from '@/api/auth';
import { Card } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ForgotPasswordValues, forgotPasswordSchema } from '@/features/auth/schemas';
import { ApiError } from '@/types/auth';
import { extractMessage, formatApiError } from '@/lib/error-messages';

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    try {
      const response = await authApi.forgotPassword(values);
      toast.success(extractMessage(response));
    } catch (error) {
      toast.error(formatApiError(error as ApiError));
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center p-4">
      <Card>
        <h1 className="mb-4 text-2xl font-semibold">Forgot password</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField htmlFor="email" label="Email" error={errors.email?.message}>
            <Input id="email" type="email" autoComplete="email" {...register('email')} error={errors.email?.message} />
          </FormField>
          <Button className="w-full" type="submit" isLoading={isSubmitting}>
            Send reset link
          </Button>
        </form>
        <div className="mt-4 text-sm">
          <Link href="/login">Back to login</Link>
        </div>
      </Card>
    </main>
  );
}
