'use client';

import React from 'react';
import { LeadsTable} from './leads-table'; // adjust path if needed

 export const dummyLeads= [
  {
    id: '1',
    project: 'Project Alpha',
    name: 'John Doe',
    email: 'john@example.com',
    address: {
      city: 'Lahore',
      state: 'Punjab',
      country: 'Pakistan',
      street: '123 Main St',
    },
    category: 'Real Estate',
    searchcategory: 'Commercial',
    phone: 123,
    map: 'https://maps.google.com/?q=24.8607,67.0011',
    Ratings: '4.5',
    Stars: '★★★★☆',
    Reviews: '120',
    Website: 'https://johndoe.com',
    Facebook: 'facebook.com/johndoe',
    LinkedIn: 'linkedin.com/in/johndoe',
    Instagram: 'instagram.com/johndoe',
    YouTube: 'youtube.com/johndoe',
    Logo: 'logo1.png',
    Image: 'image1.jpg',
    Action: 'Edit | Delete',
  },
  {
    id: '2',
    project: 'Project Beta',
    name: 'Jane Smith',
    email: 'jane@example.com',
    address: {
      city: 'Karachi',
      state: 'Sindh',
      country: 'Pakistan',
      street: '456 Park Ave',
    },
    category: 'Education',
    searchcategory: 'Schools',
    phone: 987,
    map: 'https://maps.google.com/?q=24.8607,67.0011',
    Ratings: '4.0',
    Stars: '★★★★',
    Reviews: '75',
    Website: 'https://janesmith.com',
    Facebook: 'facebook.com/janesmith',
    LinkedIn: 'linkedin.com/in/janesmith',
    Instagram: 'instagram.com/janesmith',
    YouTube: 'youtube.com/janesmith',
    Logo: 'logo2.png',
    Image: 'image2.jpg',
    Action: 'Edit | Delete',
  },
  // Add more dummy rows if needed
];

export default function dummyLeadsRows() {
  return (
    <div className="p-4">
      <LeadsTable rows={dummyLeads} count={dummyLeads.length} page={0} rowsPerPage={5} />
    </div>
  );
}
