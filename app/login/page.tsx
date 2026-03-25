'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { authApi } from '@/api/auth';
import { Card } from '@/components/ui/card';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';
import { LoginValues, loginSchema } from '@/features/auth/schemas';
import { useAuthStore } from '@/features/auth/store';
import { formatApiError } from '@/lib/error-messages';
import { ApiError } from '@/types/auth';

export default function LoginPage() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const loadCurrentUser = useAuthStore((state) => state.loadCurrentUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      const response = await authApi.login(values);
      setToken(response.token);
      await loadCurrentUser();
      toast.success('Login successful');
      router.push('/dashboard');
    } catch (error) {
      toast.error(formatApiError(error as ApiError));
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center p-4">
      <Card>
        <h1 className="mb-4 text-2xl font-semibold">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
            autoComplete="current-password"
            {...register('password')}
            error={errors.password?.message}
          />

          <Button className="w-full" type="submit" isLoading={isSubmitting}>
            Sign in
          </Button>
        </form>
        <div className="mt-4 flex justify-between text-sm">
          <Link href="/register">Create account</Link>
          <Link href="/forgot-password">Forgot password?</Link>
        </div>
      </Card>
    </main>
  );
}
