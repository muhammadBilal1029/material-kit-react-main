'use client';

import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
// import CircularProgress from '@mui/material/CircularProgress';

import Card from '@mui/material/Card';
// import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
// import CircularProgress from '@mui/material/CircularProgress';
// import DotLoader from 'react-spinners/DotLoader';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
// import dayjs from 'dayjs';

// import { useSelection } from '@/hooks/use-selection';
// import { Url } from 'next/dist/shared/lib/router/router';

function noop(): void {
  // do nothing
}

export interface Customer {
  id: string;
  project:string;
  name: string;
  email:string;
  address: { city: string; state: string; country: string; street: string };
  category: string;
  searchcategory: string;
  phone: number;
  map:string;
  Ratings:string;
  Stars:string;
  Reviews:string;
  Website:string;
  Facebook:string;
  LinkedIn:string;
  Instagram:string;
  YouTube:string;
  Logo:string;
  Image:string;
  Action:string;
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
  loading?: boolean;
}

export function LeadsTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  loading = false,
}: CustomersTableProps): React.JSX.Element {
//   const rowIds = React.useMemo(() => {
//     return rows.map((customer) => customer.id);
//   }, [rows]);

 
  return (
    <Card >
   <TableContainer
      component={Paper}
      sx={{
        maxHeight: '50vh', // Set your desired height here
        overflow: 'auto'
      }}
    >
        <Table sx={{ minWidth: '800px'}} stickyHeader>
          <TableHead>
            <TableRow>
              
              <TableCell>ID</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            
              <TableCell>Location</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Search Category</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Map</TableCell>
              <TableCell>Ratings</TableCell>
              <TableCell>Stars</TableCell>
              <TableCell>Reviews</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Facebook</TableCell>
              <TableCell>LinkedIn</TableCell>
              <TableCell>Instagram</TableCell>
              <TableCell>YouTube</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            
            </TableRow>
          </TableHead>
<TableBody>
  {Array.isArray(rows) && rows.length > 0 ? (
    rows.map((row) => {
      let index=1;
      return(
        <TableRow hover key={index++}>
        <TableCell>{index++}</TableCell>
        <TableCell>{row.project}</TableCell>
        <TableCell>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Typography variant="subtitle2">{row.name}</Typography>
          </Stack>
        </TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>
          {row.address?.city}, {row.address?.state}, {row.address?.country}
        </TableCell>
        <TableCell>{row.category}</TableCell>
        <TableCell>{row.searchcategory}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.map}</TableCell>
        <TableCell>{row.Ratings}</TableCell>
        <TableCell>{row.Stars}</TableCell>
        <TableCell>{row.Reviews}</TableCell>
        <TableCell>{row.Website}</TableCell>
        <TableCell>{row.Facebook}</TableCell>
        <TableCell>{row.LinkedIn}</TableCell>
        <TableCell>{row.Instagram}</TableCell>
        <TableCell>{row.YouTube}</TableCell>
        <TableCell>{row.Logo}</TableCell>
        <TableCell>{row.Image}</TableCell>
        <TableCell>{row.Action}</TableCell>
      </TableRow>
      )
    })
  ) : (
    <TableRow>
      <TableCell colSpan={20} align="center">
        No data found
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </TableContainer>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
