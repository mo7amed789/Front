'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Enterprise-ready preferences and display controls.</p>
      </header>
      <Card className="max-w-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-medium">Theme Preference</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Persisted preference integration can be plugged in next.</p>
          </div>
          <Button variant="secondary" onClick={() => setDarkMode((value) => !value)}>
            {darkMode ? 'Dark' : 'Light'}
          </Button>
        </div>
      </Card>
    </section>
  );
}
