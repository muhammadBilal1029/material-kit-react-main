import * as React from 'react';
import type { Metadata } from 'next';
// import Grid from '@mui/material/Grid';
// import dayjs from 'dayjs';

import { config } from '@/config';
import  OverviewPage from '@/app/dashboard/overview-content';
export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
 
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <OverviewPage />
    </React.Suspense>
  );
}
