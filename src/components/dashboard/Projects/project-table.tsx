'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
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
import Button from '@mui/material/Button';
// import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
// import { useSelection } from '@/hooks/use-selection';

function noop(): void {
  // do nothing
}

export interface Customer {
   _id: string;
  projectId: string; 
  avatar: string;
  projectName: string;
  city: string;
  businessCategory: string;
   status: 'Running' | 'Finished' | string;
}

interface CustomersTableProps {
  count: number;
  page?: number;
  rows: Customer[];
  rowsPerPage?: number;
   onPageChange: (_: any, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowsPerPageOptions?: Array<number | { label: string; value: number }>;
  onCancel?: (_id: string) => void;
}

export function ProjectTable({
  rows,
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
    rowsPerPageOptions = [10, 25, 50, 100],
  onCancel
}: CustomersTableProps): React.JSX.Element {
  // const rowIds = React.useMemo(() => {
  //   return rows.map((customer) => customer.id);
  // }, [rows]);
const router = useRouter();
const handleViewLeads = async (row: Customer) => {
   router.push(`/dashboard/project/specific-leads?category=${encodeURIComponent(row.businessCategory)}`);
};

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
             
              <TableCell>Name</TableCell>
            
              <TableCell>City</TableCell>
              <TableCell>businessCategory</TableCell>
              <TableCell>Status</TableCell>
               <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
            

              return (
                <TableRow hover key={row._id} >
                 
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Avatar src={row.avatar} />
                      <Typography variant="subtitle2">{row.projectName}</Typography>
                    </Stack>
                  </TableCell>
              
                  <TableCell>
                  {row.city}
                  </TableCell>
                  <TableCell>{row.businessCategory}</TableCell>
                  <TableCell>{row.status}</TableCell>
                   <TableCell>
                {row.status === 'Running' ? (
  <Button
    variant="outlined"
    color="error"
    size="small"
    onClick={() => onCancel?.(row.projectId)}
  >
    Cancel
  </Button>
) : row.status === 'Finished' ? (
  <Button
    variant="contained"
    size="small"
    onClick={() => handleViewLeads(row)}
  >
    View Leads
  </Button>
) : row.status === 'Cancelled' ? (
  <Typography color="error" variant="body2">
    Cancelled
  </Typography>
) : (
  '-'
)}

                </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
     
     <TablePagination
  component="div"
  count={count ?? 0}
  page={page ?? 0}
  onPageChange={onPageChange}
  rowsPerPage={rowsPerPage ?? 10}
  onRowsPerPageChange={onRowsPerPageChange}
     rowsPerPageOptions={rowsPerPageOptions}
/>
    </Card>
  );
}
