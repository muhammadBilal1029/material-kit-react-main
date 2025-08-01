'use client';

import * as React from 'react';
import { ProjectTable } from './project-table'; // adjust the path as needed

export const dummyRows = [
  {
    id: '1',
    avatar: 'https://i.pravatar.cc/40?img=1',
    name: 'John Doe',
    address: {
      city: 'Lahore',
      state: 'Punjab',
      country: 'Pakistan',
      street: '123 Main St',
    },
    category: 'E-Commerce',
    status: new Date().toISOString(),
  },
  {
    id: '2',
    avatar: 'https://i.pravatar.cc/40?img=2',
    name: 'Jane Smith',
    address: {
      city: 'Karachi',
      state: 'Sindh',
      country: 'Pakistan',
      street: '456 Park Ave',
    },
    category: 'Healthcare',
    status: new Date().toISOString(),
  },
  {
    id: '3',
    avatar: 'https://i.pravatar.cc/40?img=3',
    name: 'Ali Khan',
    address: {
      city: 'Islamabad',
      state: 'Capital Territory',
      country: 'Pakistan',
      street: '789 Blue Rd',
    },
    category: 'Finance',
    status: new Date().toISOString(),
  },
];

export default function DummyTablePage() {
  return (
    <div style={{ padding: 20 }}>
      <ProjectTable rows={dummyRows} count={dummyRows.length} page={0} rowsPerPage={5} />
    </div>
  );
}
