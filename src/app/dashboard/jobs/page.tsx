import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { JobsCards } from '@/components/dashboard/jobs/job-cards';
import { JobsFilters } from '@/components/dashboard/jobs/jobs-filters';

export const metadata = { title: `Settings | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
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
