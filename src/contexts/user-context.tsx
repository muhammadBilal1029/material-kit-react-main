"use client";

import * as React from "react";

import type { User } from "@/types/user";
import { authClient } from "@/lib/auth/client";
import { logger } from "@/lib/default-logger";

export interface UserContextValue {
	user: User | null;
	error: string | null;
	isLoading: boolean;
	checkSession?: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
	children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
	const [state, setState] = React.useState<{
		user: User | null;
		error: string | null;
		isLoading: boolean;
		totalLeads: number;
		totalProjects: number;
		totalJobs: number;
	}>({
		user: null,
		error: null,
		isLoading: true,
		totalLeads: 0,
		totalProjects: 0,
		totalJobs: 0,
	});

	const checkSession = React.useCallback(async (): Promise<void> => {
		try {
			const { data, error } = await authClient.getUser();
			console.log("checkSession result:", { data, error });
			if (error) {
				logger.error(error);
				setState((prev) => ({ ...prev, user: null, error: "Something went wrong", isLoading: false }));
				return;
			}

			setState((prev) => ({ ...prev, user: data ?? null, error: null, isLoading: false }));
		} catch (error) {
			logger.error(error);
			setState((prev) => ({ ...prev, user: null, error: "Something went wrong", isLoading: false }));
		}
	}, []);

	React.useEffect(() => {
		checkSession().catch((error) => {
			logger.error(error);
			// noop
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
	}, []);

	React.useEffect(() => {
		const countTotalLeads = async () => {
			const token = localStorage.getItem("auth-token");
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allLeads`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await res.json();
				setState((prev) => ({ ...prev, totalLeads: data?.data?.length ?? 0 }));
			} catch (err) {
				console.error("Failed to fetch leads:", err);
			}
		};

		const countTotalJobs = async () => {
			// Replace this with your real API call
			const token = localStorage.getItem("auth-token");
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/scraping/get-Jobs`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await res.json();
				setState((prev) => ({ ...prev, totalJobs: data?.length ?? 0 }));
			} catch (err) {
				console.error("Failed to fetch leads:", err);
			}
		};

		const countTotalProjects = async () => {
			// Replace this with your real API call
			const token = localStorage.getItem("auth-token");
			const user = JSON.parse(localStorage.getItem("user") || "{}");
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${user.email}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await res.json();
				setState((prev) => ({ ...prev, totalProjects: data?.length ?? 0 }));
			} catch (err) {
				console.error("Failed to fetch leads:", err);
			}
		};
		countTotalLeads();
		countTotalJobs();
		countTotalProjects();
	}, []);

	return <UserContext.Provider value={{ ...state, checkSession }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
