"use client";

import * as React from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";

import { paths } from "@/paths";
import { authClient } from "@/lib/auth/client";
import { useUser } from "@/hooks/use-user";

const schema = zod.object({
	username: zod.string().min(1, { message: "Username is required" }),
	email: zod.string().min(1, { message: "Email is required" }).email(),
	password: zod.string().min(6, { message: "Password should be at least 6 characters" }),
	phone: zod.string().min(11, { message: "Please Enter a valid phone number" }),
	otp: zod.string().optional(),
	terms: zod.boolean().refine((value) => value, "You must accept the terms and conditions"),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { username: "", email: "", password: "", phone: "", terms: false } satisfies Values;

export function SignUpForm(): React.JSX.Element {
	const router = useRouter();
	const { checkSession } = useUser();
	const [otp, setOtp] = React.useState("");
	const [otpSent, setOtpSent] = React.useState(false);
	const [isPending, setIsPending] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	const [formData, setFormData] = React.useState<Values | null>(null);
	const {
		control,
		handleSubmit,
		setError: setFormError,
		formState: { errors },
	} = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

	const onSubmit = React.useCallback(
		async (values: Values): Promise<void> => {
			setIsPending(true);

			const { error } = await authClient.SendOtp({
				...values,
				phone: Number(values.phone),
			});

			if (error) {
				setError(error || "Something went wrong");

				setIsPending(false);
				return;
			}
			setFormData(values);
			setOtpSent(true);
      setIsPending(false);
			localStorage.setItem("pendingRegisterData", JSON.stringify(values));
		},
		[router, setError]
	);
	const handleVerifyOtp = async () => {
    setIsPending(true);
		if (!otp || otp.length < 6) {
			setError("Please enter a valid OTP");
      setIsPending(false)
			// alert("Please enter a valid OTP")
			return;
		}

		try {
			const { error } = await authClient.signUp({
				...formData!,
				otp,
			});

			if (error) {
				setError(error);
				// alert(error)

				return;
			}

			localStorage.removeItem("pendingRegisterData");
			await checkSession?.();
			router.refresh();
		} catch (err) {
			console.error(err);
			setError("OTP verification failed.");
			// alert('OTP verification failed.')
		}
	};
	return (
		<Stack spacing={3}>
			{!otpSent ? (
				<>
					<Stack spacing={1}>
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
							<Typography variant="h4">Sign up</Typography>
							<Typography
								variant="h4"
								component={RouterLink}
								href={paths.auth.signUpBussiness}
								style={{ fontSize: "15px", color: "blue", cursor: "pointer" }}
							>
								Sign up as Business
							</Typography>
						</div>
						<Typography color="text.secondary" variant="body2">
							Already have an account?{" "}
							<Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
								Sign in
							</Link>
						</Typography>
					</Stack>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={2}>
							<Controller
								control={control}
								name="username"
								render={({ field }) => (
									<FormControl error={Boolean(errors.username)}>
										<InputLabel>Username</InputLabel>
										<OutlinedInput {...field} label="Username" />
										{errors.username && <FormHelperText>{errors.username.message}</FormHelperText>}
									</FormControl>
								)}
							/>
							<Controller
								control={control}
								name="email"
								render={({ field }) => (
									<FormControl error={Boolean(errors.email)}>
										<InputLabel>Email address</InputLabel>
										<OutlinedInput {...field} label="Email address" type="email" />
										{errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
									</FormControl>
								)}
							/>
							<Controller
								control={control}
								name="password"
								render={({ field }) => (
									<FormControl error={Boolean(errors.password)}>
										<InputLabel>Password</InputLabel>
										<OutlinedInput {...field} label="Password" type="password" />
										{errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
									</FormControl>
								)}
							/>
							<Controller
								control={control}
								name="phone"
								render={({ field }) => (
									<FormControl error={Boolean(errors.phone)}>
										<InputLabel>Phone</InputLabel>
										<OutlinedInput {...field} label="Phone" type="tel" />
										{errors.phone && <FormHelperText>{errors.phone.message}</FormHelperText>}
									</FormControl>
								)}
							/>
							<Controller
								control={control}
								name="terms"
								render={({ field }) => (
									<div>
										<FormControlLabel
											control={<Checkbox {...field} />}
											label={
												<>
													I accept the <Link href="#">terms and conditions</Link>
												</>
											}
										/>
										{errors.terms && <FormHelperText error>{errors.terms.message}</FormHelperText>}
									</div>
								)}
							/>
							{errors.root && <Alert severity="error">{errors.root.message}</Alert>}
							<Button disabled={isPending} type="submit" variant="contained">
								Send OTP
							</Button>
						</Stack>
					</form>
				</>
			) : (
				<>
					<Typography variant="h5">Verify OTP</Typography>
					<Typography variant="h6">OTP sent to {formData?.email}</Typography>

					<FormControl error={!!error}>
						<InputLabel>Enter OTP</InputLabel>
						<OutlinedInput value={otp} onChange={(e) => setOtp(e.target.value)} label="Enter OTP" type="text" />
						{error && <FormHelperText>{error}</FormHelperText>}
					</FormControl>
					<Button onClick={handleVerifyOtp} disabled={isPending} variant="contained">
						Verify & Register
					</Button>
				</>
			)}
		</Stack>
	);
}
