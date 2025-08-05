"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// import { Card } from "@mui/material";
import {
	Button,
	Card,
	Divider,
	InputAdornment,
	OutlinedInput,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";

// Define Customer type here or import properly
import { Customer } from "@/components/dashboard/Leads/leads-table";

export default function Page() {
    const hasFetchedRef = React.useRef(false);
	const searchParams = useSearchParams();
	const businessCategory = searchParams.get("category");

	const [specificleads, setspecificLeads] = useState<Customer[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = React.useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10); // You can adjust this

	useEffect(() => {
		if (!businessCategory || hasFetchedRef.current) return;
	    hasFetchedRef.current = true;

		const fetchLeads = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/specific-lead/${encodeURIComponent(businessCategory)}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
						},
					}
				);

				const data = await res.json();
				console.log("Specific leads data", data);

				if (!res.ok || !data.success) {
					toast.error(`Failed to fetch leads for ${businessCategory}`);
					setspecificLeads([]);
				} else if (Array.isArray(data.data) && data.data.length === 0) {
					toast.error(`No leads found for ${businessCategory}`);
					setspecificLeads([]);
				} else {
					setspecificLeads(data.data);
				}
			} catch (error) {
				toast.error("Error fetching leads");
			} finally {
				setLoading(false);
			}
		};

		fetchLeads();
	}, [businessCategory]);

	const handleBack = () => {
		window.history.back();
	};
	const filteredLeads = React.useMemo(() => {
		const filtered = !searchTerm.trim()
			? specificleads
			: specificleads.filter((lead) =>
					Object.values(lead).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
				);
		return filtered;
	}, [searchTerm, specificleads]);

	const paginatedLeads = React.useMemo(() => {
		return filteredLeads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	}, [filteredLeads, page, rowsPerPage]);
	const exportToCSV = () => {
		const csv = Papa.unparse(filteredLeads);
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "leads.csv";
		a.click();
		URL.revokeObjectURL(url);
	};

	const exportToExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(filteredLeads);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
		XLSX.writeFile(workbook, "leads.xlsx");
	};

	const exportToPDF = () => {
		const doc = new jsPDF();
		const columns = Object.keys(filteredLeads[0] || {});
		const rows = filteredLeads.map((lead) => columns.map((col) => lead[col as keyof Customer]));

		autoTable(doc, {
			head: [columns],
			body: rows,
		});

		doc.save("leads.pdf");
	};
	return (
		<Card>
			<div style={{ padding: 20, display: "flex", alignItems: "center" }}>
				<Button variant="outlined" onClick={handleBack}>
					Back to Projects
				</Button>
				<Typography variant="h6" style={{ margin: "auto" }}>
					Leads for <strong>{businessCategory}</strong>
				</Typography>
			</div>
			<Card sx={{ p: 2 }}>
				<Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ xs: "stretch", sm: "center" }}>
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
						sx={{ maxWidth: "400px" }}
					/>

					<Button onClick={exportToCSV} className="sm:flex" variant="contained" sx={{ ml: 2 }}>
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
			<Divider />
			{loading ? (
				<Typography sx={{ p: 2 }}>Loading...</Typography>
			) : (
				<>
					<TableContainer
						component={Paper}
						sx={{
							maxHeight: "50vh", // Set your desired height here
							overflow: "auto",
						}}
					>
						<Table sx={{ minWidth: 800 }}>
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
								{paginatedLeads.map((lead, index) => (
									<TableRow key={lead._id}>
										<TableCell>{page * rowsPerPage + index + 1}</TableCell>
										<TableCell>
											<Stack direction="row" spacing={2} alignItems="center">
												<Typography variant="subtitle2">{lead.storeName}</Typography>
											</Stack>
										</TableCell>
										<TableCell>{lead.email}</TableCell>
										<TableCell>{lead.address}</TableCell>
										<TableCell>{lead.category}</TableCell>
										<TableCell>{lead.projectCategory}</TableCell>
										<TableCell>{lead.phone}</TableCell>
										<TableCell>
											<a href={lead.googleUrl} target="_blank" rel="noopener noreferrer">
												Google Map
											</a>
										</TableCell>
										<TableCell>{lead.ratingText}</TableCell>
										<TableCell>{lead.stars}</TableCell>
										<TableCell>{lead.numberOfReviews}</TableCell>
										<TableCell>{lead.about}</TableCell>
										<TableCell>
											<a href={lead.bizWebsite} target="_blank" rel="noopener noreferrer">
												Website
											</a>
										</TableCell>
										<TableCell>
											<a href={lead.socialLinks?.facebook} target="_blank" rel="noopener noreferrer">
												Facebook
											</a>
										</TableCell>
										<TableCell>
											<a href={lead.socialLinks?.linkedin} target="_blank" rel="noopener noreferrer">
												LinkedIn
											</a>
										</TableCell>
										<TableCell>
											<a href={lead.socialLinks?.instagram} target="_blank" rel="noopener noreferrer">
												Instagram
											</a>
										</TableCell>
										<TableCell>
											<a href={lead.socialLinks?.youtube} target="_blank" rel="noopener noreferrer">
												YouTube
											</a>
										</TableCell>
										<TableCell>
											<img src={lead?.logoUrl} alt="logo" width={40} />
										</TableCell>
										<TableCell>
											<img src={lead?.imageUrl} alt="image" width={40} />
										</TableCell>
										<TableCell>
											<Button size="small" variant="contained" color="primary">
												View
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						component="div"
						count={filteredLeads.length}
						page={page}
						onPageChange={(_, newPage) => setPage(newPage)}
						rowsPerPage={rowsPerPage}
						onRowsPerPageChange={(e) => {
							setRowsPerPage(parseInt(e.target.value, 10));
							setPage(0);
						}}
					/>
				</>
			)}
		</Card>
	);
}
