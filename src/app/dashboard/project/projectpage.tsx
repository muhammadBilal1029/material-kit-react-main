'use client';
import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// import { DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
// import { dummyRows } from "@/components/dashboard/Projects/dummyprojectsrows";
import { ProjectFilters } from "@/components/dashboard/Projects/project-filters";
import { Customer, ProjectTable } from "@/components/dashboard/Projects/project-table";

// import type { Customer } from '@/components/dashboard/Projects/project-table';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/use-user';

export default function Page(): React.JSX.Element {

    const router = useRouter();
	const page = 0;
	const rowsPerPage = 5;

	//  const paginatedCustomers = applyPagination(ProjectTable, page, rowsPerPage);
 const [projects, setprojects] = React.useState<Customer[]>([]);
  const [loading, setLoading] = React.useState(true);
const { checkSession } = useUser();

   React.useEffect(() => {
	const fetchData = async () => {
	  // Replace this with your real API call
	  const token = localStorage.getItem("auth-token");
	  const user = JSON.parse(localStorage.getItem("user") || "{}");
	  console.log(!user?.email);
	  if (!token || !user?.email) {
		console.error('No auth token found');
		setLoading(false);
		await checkSession?.();
		router.refresh();
		return;
	  }
	  try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${user.email}`, {
		  headers: {
			Authorization: `Bearer ${token}`,
		  },
		});
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

		setprojects(data);
		setLoading(false);
	  } catch (err) {
		console.error('Failed to fetch leads:', err);
		setLoading(false);
	  }
	};

	fetchData();
  }, [router]);

	return (
		<Stack spacing={3}>
			<Stack direction="row" spacing={3}>
				<Stack spacing={1} sx={{ flex: "1 1 auto" }}>
					<Typography variant="h4">Projects</Typography>
				</Stack>
				<div>
					<Button
					onClick={() => router.push('/dashboard/project/addproject')}
						startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
						variant="contained"
					>
						Add
					</Button>
				</div>
			</Stack>
			<ProjectFilters />
			  {loading ? (
			  <div className="dots-loader">
				<span></span>
				<span></span>
				<span></span>
			  </div>
			  )  : !Array.isArray(projects) || projects.length === 0 ? (
			  <Typography variant="subtitle1" sx={{ textAlign: 'center', mt: 4 }}>
				No data found
			  </Typography>
			) : (
			<ProjectTable count={projects.length} page={page} rows={projects} rowsPerPage={rowsPerPage}/>
			)}
		</Stack>
	);
}

// function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }
