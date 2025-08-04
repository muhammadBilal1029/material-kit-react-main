'use client';
import * as React from 'react';
// import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { JobsCards } from '@/components/dashboard/jobs/job-cards';
import { JobsFilters } from '@/components/dashboard/jobs/jobs-filters';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
// export const metadata = { title: `Settings | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    const { checkSession } = useUser();
    const router = useRouter();
    const token = localStorage.getItem('auth-token');
    React.useEffect(() => {
        const check = async () => {
      const token = localStorage.getItem('auth-token'); // ✅ safe inside useEffect

      if (!token) {
        await checkSession?.(); // ✅ verify session or redirect
        router.refresh();       // 🔁 refresh page after session check
      }
    };
        check();
        // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
      }, []);
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Jobs</Typography>
      </div>
      <JobsCards />
      <JobsFilters />
    </Stack>
  );
}
