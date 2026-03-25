import { Card } from '@/components/ui/card';

export default function DashboardOverviewPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">High-level metrics and account status at a glance.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400">Auth Status</h2>
          <p className="mt-2 text-2xl font-semibold">Healthy</p>
        </Card>
        <Card>
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400">Session</h2>
          <p className="mt-2 text-2xl font-semibold">Active</p>
        </Card>
        <Card>
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400">Security</h2>
          <p className="mt-2 text-2xl font-semibold">JWT + Refresh</p>
        </Card>
      </div>
    </section>
  );
}
