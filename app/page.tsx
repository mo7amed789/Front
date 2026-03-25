import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-bold">LMS Auth Frontend</h1>
      <p className="text-slate-600 dark:text-slate-300">
        Start with login/register flows or run endpoint checks.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/health">Health</Link>
        <Link href="/api-test">API Test</Link>
      </div>
    </main>
  );
}
