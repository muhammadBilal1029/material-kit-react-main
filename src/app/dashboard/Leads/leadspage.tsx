'use client';
import * as React from 'react';
// import type { Metadata } from 'next';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { dummyLeads } from '@/components/dashboard/Leads/dummyleadsrows';
// import { config } from '@/config';
// import { LeadsFilters } from '@/components/dashboard/Leads/leads-filters';
import { Customer, LeadsTable } from '@/components/dashboard/Leads/leads-table';
// import dummyLeadsRows from '@/components/dashboard/Leads/dummyleadsrows';
// import type { Customer } from '@/components/dashboard/Projects/project-table';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';
import { useUser } from '@/hooks/use-user';
// import { useEffect } from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
export default function Page(): React.JSX.Element {
  const router = useRouter();
  // 
  // const paginatedCustomers = applyPagination(customers, page, rowsPerPage);
  const [leads, setLeads] = React.useState<Customer[]>([]);
  const [loading, setLoading] = React.useState(true);
   const [searchTerm, setSearchTerm] = React.useState('');
     const [pages, setPages] = React.useState(0);
      const [rowsPerPages, setRowsPerPages] = React.useState(10); // You can adjust this
  const { checkSession } = useUser();

  // Filter leads when search term changes
   const exportToCSV = () => {
    const csv = Papa.unparse(leads);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(leads);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
    XLSX.writeFile(workbook, 'leads.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const columns = Object.keys(leads[0] || {});
    const rows = leads.map((lead) => columns.map((col) => lead[col as keyof Customer]));

    autoTable(doc, {
      head: [columns],
      body: rows,
    });

    doc.save('leads.pdf');
  };

   React.useEffect(() => {
    // Replace this with your real API call
    const token = localStorage.getItem("auth-token");
    if (!token) {
      console.error('No auth token found');
      setLoading(false);
      router.replace('/auth/sign-in'); // Redirect to login if no token
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allLeads`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
      const data = await res.json();

      // Check for token expiry message
      if (data?.msg === 'Token Expired. Please log in again.') {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('auth-token');
        await checkSession?.();
        router.refresh();
        setLoading(false);
        return;
      }

      if (!res.ok) {
          setLoading(false);
        return;
      }

      setLeads(data.data);
        setLoading(false);
    })
      .catch((err) => {
        console.error('Failed to fetch leads:', err);
        setLoading(false);
      });
  }, [router]);
const filteredLeads = React.useMemo(() => {
  if (!searchTerm.trim()) return leads;
  return leads.filter((lead) =>
    Object.values(lead).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
}, [searchTerm, leads]);
const paginatedProjects = React.useMemo(() => {
  const filtered = !searchTerm.trim()
    ? leads
    : leads.filter((lead) =>
        Object.values(lead).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

  return filtered.slice(pages * rowsPerPages, pages * rowsPerPages + rowsPerPages);
}, [searchTerm, leads, pages, rowsPerPages]);
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">All Leads</Typography>
        </Stack>
      </Stack>
      {/* <LeadsFilters leads={leads} /> */}
       <Card sx={{ p: 2 }}>
  <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
      <OutlinedInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        placeholder="Search by Category"
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '400px' }}
      />
    
                <Button onClick={exportToCSV}  className='sm:flex' variant="contained" sx={{ ml: 2 }}>
                  Export To CSV
                </Button>
                <Button onClick={exportToPDF} variant="contained" sx={{ ml: 2 }}>
                  Export To Pdf
                </Button>
               
                <Button onClick={exportToExcel} variant="contained" sx={{ ml: 2 }}>
                  Export To Excel
                </Button>
              </Stack>
    </Card>
     {loading ? (
  <div className="dots-loader">
    <span></span>
    <span></span>
    <span></span>
  </div>
  )  : !Array.isArray(leads) || leads.length === 0 ? (
  <Typography variant="subtitle1" sx={{ textAlign: 'center', mt: 4 }}>
    No data found
  </Typography>
) : (
  <LeadsTable
   count={leads.length}
  page={pages}
  rows={paginatedProjects}
    rowsPerPage={rowsPerPages}
     onPageChange={(_, newPage) => setPages(newPage)}
  onRowsPerPageChange={(e) => {
    setRowsPerPages(parseInt(e.target.value, 10));
    setPages(0); // reset to page 0 when page size changes
  }}
    loading={loading}
  />
)}
    </Stack>
  );
}

// function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }
