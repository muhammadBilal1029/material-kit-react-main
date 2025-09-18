"use client";

import * as React from "react";
// import { useRouter } from 'next/navigation';
import Grid from "@mui/material/Grid";

import { UserContext } from "@/contexts/user-context";
// import { config } from '@/config';
import { Budget } from "@/components/dashboard/overview/budget";
import { Sales } from "@/components/dashboard/overview/sales";
import { TasksProgress } from "@/components/dashboard/overview/tasks-progress";
import { TotalCustomers } from "@/components/dashboard/overview/total-customers";
import { TotalProfit } from "@/components/dashboard/overview/total-profit";
import { Traffic } from "@/components/dashboard/overview/traffic";

// ...other imports...

export default async function OverviewPage(): Promise<React.JSX.Element> {
	const { totalLeads, totalProjects, totalJobs } = React.useContext(UserContext);
	return (
		<Grid container spacing={3}>
			<Grid
				size={{
					lg: 3,
					sm: 6,
					xs: 12,
				}}
			>
				<Budget diff={12} trend="up" sx={{ height: "100%" }} value={totalProjects} />
			</Grid>
			<Grid
				size={{
					lg: 3,
					sm: 6,
					xs: 12,
				}}
			>
				<TotalCustomers diff={16} trend="down" sx={{ height: "100%" }} value={totalLeads} />
			</Grid>
			<Grid
				size={{
					lg: 3,
					sm: 6,
					xs: 12,
				}}
			>
				<TasksProgress sx={{ height: "100%" }} value={totalJobs} />
			</Grid>
			<Grid
				size={{
					lg: 3,
					sm: 6,
					xs: 12,
				}}
			>
				<TotalProfit sx={{ height: "100%" }} value={totalJobs} />
			</Grid>
			<Grid
				size={{
					lg: 8,
					xs: 12,
				}}
			>
				<Sales
					chartSeries={[
						{ name: "This year", data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
						{ name: "Last year", data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
					]}
					sx={{ height: "100%" }}
				/>
			</Grid>
			<Grid
				size={{
					lg: 4,
					md: 6,
					xs: 12,
				}}
			>
				<Traffic
					chartSeries={[totalLeads, totalProjects, totalJobs]}
					labels={["Leads", "Projects", "Jobs"]}
					sx={{ height: "100%" }}
				/>
			</Grid>
			<Grid
				size={{
					lg: 4,
					md: 6,
					xs: 12,
				}}
			></Grid>
			<Grid
				size={{
					lg: 8,
					md: 12,
					xs: 12,
				}}
			></Grid>
		</Grid>
	);
}
