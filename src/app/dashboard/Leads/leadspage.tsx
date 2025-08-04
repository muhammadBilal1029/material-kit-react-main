'use client';
import * as React from 'react';
// import type { Metadata } from 'next';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { dummyLeads } from '@/components/dashboard/Leads/dummyleadsrows';
// import { config } from '@/config';
import { LeadsFilters } from '@/components/dashboard/Leads/leads-filters';
import { Customer, LeadsTable } from '@/components/dashboard/Leads/leads-table';
// import dummyLeadsRows from '@/components/dashboard/Leads/dummyleadsrows';
// import type { Customer } from '@/components/dashboard/Projects/project-table';
import { useRouter } from 'next/navigation';

export default function Page(): React.JSX.Element {
  const router = useRouter();
  const page = 0;
  const rowsPerPage = 5;
  // 
  // const paginatedCustomers = applyPagination(customers, page, rowsPerPage);
  const [leads, setLeads] = React.useState<Customer[]>([]);
  const [loading, setLoading] = React.useState(true);
   React.useEffect(() => {
    // Replace this with your real API call
    const token = localStorage.getItem("auth-token");
    if (!token) {
      console.error('No auth token found');
      setLoading(false);
      router.push('/login'); // Redirect to login if no token
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allLeads`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLeads(data.data	);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch leads:', err);
        setLoading(false);
      });
  }, [router]);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">All Leads</Typography>
        </Stack>
      </Stack>
      <LeadsFilters />
     {loading ? (
  <div className="dots-loader">
    <span></span>
    <span></span>
    <span></span>
  </div>
  ) : leads.length === 0 ? (
  <Typography variant="subtitle1" sx={{ textAlign: 'center', mt: 4 }}>
    No data found
  </Typography>
) : (
  <LeadsTable
    count={leads.length}
    page={page}
    rows={leads ?? []}
    rowsPerPage={rowsPerPage}
    loading={loading}
  />
)}
    </Stack>
  );
}

// function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }
