"use client";

import * as React from "react";
import { Box, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
// import Checkbox from '@mui/material/Checkbox';
import Divider from "@mui/material/Divider";
// import CircularProgress from '@mui/material/CircularProgress';
// import DotLoader from 'react-spinners/DotLoader';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
// import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
// import CircularProgress from '@mui/material/CircularProgress';
import { FaFacebook, FaInstagram, FaLinkedin, FaRegStar, FaStar, FaStarHalfAlt, FaYoutube } from "react-icons/fa"; // at the top

// import dayjs from 'dayjs';
// import { useSelection } from '@/hooks/use-selection';
// import { Url } from 'next/dist/shared/lib/router/router';

function noop(): void {
	// do nothing
}
export interface Customer {
	_id: string;
	storeName: string;
	email: string;
	address: string;
	category: string;
	projectCategory: string;
	phone: number;
	googleUrl: string;
	ratingText: string;
	stars: string;
	numberOfReviews: string;
	about: string;
	bizWebsite: string;
	socialLinks: {
		youtube: string;
		instagram: string;
		facebook: string;
		linkedin: string;
	};
	logoUrl: string;
	imageUrl: string;
	[key: string]: any;
}

interface CustomersTableProps {
	count?: number;
	page?: number;
	rows?: Customer[];
	rowsPerPage?: number;
	onPageChange: (_: any, newPage: number) => void;
	onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	rowsPerPageOptions?: Array<number | { label: string; value: number }>;
	loading?: boolean;
}

export function LeadsTable({
	count = 0,
	rows = [],
	page = 0,
	rowsPerPage = 0,
	onPageChange,
	onRowsPerPageChange,
	rowsPerPageOptions = [10, 25, 50, 100],
	loading = false,
}: CustomersTableProps): React.JSX.Element {
	//   const rowIds = React.useMemo(() => {
	//     return rows.map((customer) => customer.id);
	//   }, [rows]);

	let index = 1;
	const renderStars = (rating: number) => {
		const stars = [];

		for (let i = 1; i <= 5; i++) {
			if (rating >= i) {
				stars.push(<FaStar key={i} color="rgba(40, 39, 39, 0.87)" size={16} />);
			} else if (rating >= i - 0.5) {
				stars.push(<FaStarHalfAlt key={i} color="rgba(40, 39, 39, 0.87)" size={16} />);
			} else {
				stars.push(<FaRegStar key={i} color="rgba(40, 39, 39, 0.87)" size={16} />);
			}
		}

		return stars;
	};

	return (
		<Card>
			<TableContainer
				component={Paper}
				sx={{
					maxHeight: "50vh", // Set your desired height here
					overflow: "auto",
				}}
			>
				<Table sx={{ minWidth: "800px" }} stickyHeader>
					<TableHead>
						<TableRow>
							
							<TableCell >ID</TableCell>

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
						</TableRow>
					</TableHead>
					<TableBody>
						{Array.isArray(rows) && rows.length > 0 ? (
							rows.map((row) => {
								return (
									<TableRow hover key={index}>
										
										<TableCell>{index++}</TableCell>
										<TableCell>
											<Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
												<Typography variant="subtitle2">{row.storeName?(
                        row.storeName
                        ):("No Name")}</Typography>
											</Stack>
										</TableCell>
										<TableCell>{row.email?(
                      row.email
                    ):("No Email")}</TableCell>
										<TableCell>
											{row.address ? (
												<Tooltip title={row.address}>
													<Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
														{row.address.length > 50 ? row.address.slice(0, 50) + "..." : row.address}
													</Typography>
												</Tooltip>
											) : (
												"No Address"
											)}
										</TableCell>
										<TableCell>{row.category?(
                      row.category
                    ):("No Category")}</TableCell>
										<TableCell>{row.projectCategory?(
                      row.projectCategory
                    ):("No Project Category")}</TableCell>
										<TableCell>{row.phone ? <a style={{ color: "rgba(40, 39, 39, 0.87)",textDecoration:"none" }} href={`tel:${row.phone}`}>{row.phone}</a> : "No Phone"}</TableCell>
										<TableCell>
											{row.googleUrl ? (
												<a href={row.googleUrl} target="_blank" rel="noopener noreferrer">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="30"
														height="30"
														fill="rgba(40, 39, 39, 0.87)"
														className="bi bi-geo-alt-fill"
														viewBox="0 0 16 16"
													>
														<path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
													</svg>
												</a>
											) : (
												"No Image"
											)}
										</TableCell>

										<TableCell>{row.ratingText}</TableCell>
										<TableCell>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													width: "100%", // ensure full width for centering
												}}
											>
												{renderStars(Number(row.stars))}
											</Box>
										</TableCell>
										<TableCell>{row.numberOfReviews}</TableCell>
										<TableCell>{row.about?(
                        <Tooltip title={row.about}>
                          <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                            {row.about.length > 50 ? row.about.slice(0, 50) + "..." : row.about}
                          </Typography>
                        </Tooltip>
                      ):(
                        "No About"
                      )}</TableCell>
										<TableCell>
											{" "}
											{row.bizWebsite ? (
												<Tooltip title={row.bizWebsite}>
													<a href={row.bizWebsite} target="_blank" rel="noopener noreferrer">
														<Box
															component="img"
															src={`https://www.google.com/s2/favicons?sz=64&domain_url=${row.bizWebsite}`}
															alt="Website Logo"
															sx={{ width: 24, height: 24, fontSize: "40px" }}
														/>
													</a>
												</Tooltip>
											) : (
												"No Website"
											)}
										</TableCell>
										<TableCell>
											{row.socialLinks?.facebook ? (
												<a href={row.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
													<FaFacebook color="rgba(40, 39, 39, 0.87)" size={30} />
												</a>
											) : (
												"No Image"
											)}
										</TableCell>
										<TableCell>
											{row.socialLinks?.linkedin ? (
												<a href={row.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
													<FaLinkedin color="rgba(40, 39, 39, 0.87)" size={30} />
												</a>
											) : (
												"No Image"
											)}
										</TableCell>
										<TableCell>
											{row.socialLinks?.instagram ? (
												<a href={row.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
													<FaInstagram color="rgba(40, 39, 39, 0.87)" size={30} />
												</a>
											) : (
												"No Image"
											)}
										</TableCell>
										<TableCell>
											{row.socialLinks?.youtube ? (
												<a href={row.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
													<FaYoutube color="rgba(40, 39, 39, 0.87)" size={30} />
												</a>
											) : (
												"No Image"
											)}
										</TableCell>
										<TableCell>
											{row.logoUrl ? (
												<Tooltip title={row.logoUrl}>
													<a href={row.logoUrl} target="_blank" rel="noopener noreferrer">
														<Box
															component="img"
															src={`https://www.google.com/s2/favicons?sz=64&domain_url=${row.logoUrl}`}
															alt="logo"
															sx={{ width: 24, height: 24 }}
														/>
													</a>
												</Tooltip>
											) : (
												"No Logo"
											)}
										</TableCell>
										<TableCell>
											{row.imageUrl ? (
												<Tooltip title={row.imageUrl}>
													<a href={row.imageUrl} target="_blank" rel="noopener noreferrer">
														<Box
															component="img"
															src={`https://www.google.com/s2/favicons?sz=64&domain_url=${row.imageUrl}`}
															alt="Image"
															sx={{ width: 24, height: 24 }}
														/>
													</a>
												</Tooltip>
											) : (
												"No Image"
											)}
										</TableCell>
									</TableRow>
								);
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
