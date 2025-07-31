import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';


import { config } from '@/config';
import { ProjectFilters } from '@/components/dashboard/Projects/project-filters';
import { ProjectTable } from '@/components/dashboard/Projects/project-table';
import type { Customer } from '@/components/dashboard/Projects/project-table';

export const metadata = { title: `Projects | Dashboard | ${config.site.name}` } satisfies Metadata;



export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  // const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Projects</Typography>
         
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <ProjectFilters />
      <ProjectTable
        // count={paginatedCustomers.length}
        page={page}
        // rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

// function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }
