import * as React from 'react';
import type { Metadata } from 'next';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { dummyLeads } from '@/components/dashboard/Leads/dummyleadsrows';
import { config } from '@/config';
import { LeadsFilters } from '@/components/dashboard/Leads/leads-filters';
import { LeadsTable } from '@/components/dashboard/Leads/leads-table';
import dummyLeadsRows from '@/components/dashboard/Leads/dummyleadsrows';
// import type { Customer } from '@/components/dashboard/Projects/project-table';

export const metadata = { title: `Leads | Dashboard | ${config.site.name}` } satisfies Metadata;


export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;
// 
  // const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">All Leads</Typography>
        
        </Stack>
        
      </Stack>
      <LeadsFilters />
      <LeadsTable
        count={dummyLeads.length}
        page={page}
        rows={dummyLeads}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

// function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }
