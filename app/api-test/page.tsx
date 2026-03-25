import { redirect } from 'next/navigation';

export default function LegacyApiTestRedirectPage() {
  redirect('/dashboard/api-test');
}
