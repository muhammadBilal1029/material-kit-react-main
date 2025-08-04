'use client';

import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
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
  storeName: string;
  email:string;
  address: string;
  category: string;
  projectCategory: string;
  phone: number;
  googleUrl:string;
  ratingText:string;
  stars:string;
  numberOfReviews:string;
  about:string;
  bizWebsite:string;
  socialLinks: {
    youtube: String,
    instagram: String,
    facebook: String,
    linkedin: String,
  },
  logoUrl: String;
  imageUrl:string;
  action:string;
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

    let index=1;
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
            
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            
              <TableCell>Location</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Search Category</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Google Map</TableCell>
              <TableCell>Ratings</TableCell>
              <TableCell>Stars</TableCell>
              <TableCell>Reviews</TableCell>
                <TableCell>About</TableCell>
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
   
      return(
        <TableRow hover key={index}>
        <TableCell>{index++}</TableCell>
       
        <TableCell>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Typography variant="subtitle2">{row.storeName}</Typography>
          </Stack>
        </TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>
          {row.address}
        </TableCell>
        <TableCell>{row.category}</TableCell>
        <TableCell>{row.projectCategory}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.googleUrl}</TableCell>
        <TableCell>{row.ratingText}</TableCell>
        <TableCell>{row.stars}</TableCell>
        <TableCell>{row.numberOfReviews}</TableCell>
        <TableCell>{row.about}</TableCell>
        <TableCell>{row.bizWebsite}</TableCell>
        <TableCell>{row.socialLinks.facebook}</TableCell>
        <TableCell>{row.socialLinks.linkedin}</TableCell>
        <TableCell>{row.socialLinks.instagram}</TableCell>
        <TableCell>{row.socialLinks.youtube}</TableCell>
        <TableCell>{row.logoUrl}</TableCell>
        <TableCell>{row.imageUrl}</TableCell>
        <TableCell>{row.action}</TableCell>
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
