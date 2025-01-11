import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
	firstname: z.string().min(3).max(30),
	lastname: z.string().min(3).max(30),
	username: z.string().min(6).max(50),
	bio: z.string().max(300),
	email: z.string().email(),
	password: z
		.string()
		.optional()
		.refine((val) => !val || val.length >= 8, {
			message: "Password must be at least 8 characters long",
		}),
});

function ProfileEdit() {
	const { accessToken } = useContext(AuthContext);
	const [preview, setPreview] = useState();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(formSchema),
	});

	const params = useParams();

	useEffect(() => {
		const getUser = async () => {
			const url = `http://127.0.0.1:8000/users/${params.id}`;
			const options = {
				method: "GET",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			};

			try {
				const response = await fetch(url, options);
				const data = await response.json();
				if (response.ok) {
					reset({
						firstname: data.first_name,
						lastname: data.last_name,
						username: data.username,
						bio: data.bio,
						email: data.email,
					});
					setPreview(`data:image/jpeg;base64,${data.photo}`);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getUser();
	}, [accessToken]);

	const onSubmit = async (data) => {
		console.log("data sent");
		// const url = "http://127.0.0.1:8000/users/";
		// const options = {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		photo: "profile.png",
		// 		bio: "hello",
		// 		first_name: data.firstname,
		// 		last_name: data.lastname,
		// 		username: data.username,
		// 		email: data.email,
		// 		password: data.password,
		// 	}),
		// };

		// try {
		// 	const response = await fetch(url, options);
		// 	if (response.status === 201) {
		// 		setIsError(false);
		// 		window.location.href = "/login";
		// 	}
		// 	const responseData = await response.json();
		// 	console.log(responseData.email);
		// } catch (error) {
		// 	setIsError(true);
		// 	console.error(error);
		// }
	};
	return (
		<>
			<div className="bg-gray-50 border rounded-3xl">
				<div className="bg-gray-200 w-full h-52 rounded-3xl bg-cover bg-[url('https://img.freepik.com/free-vector/minimal-flowing-lines-background_1048-20229.jpg?t=st=1736620338~exp=1736623938~hmac=d1acc5682cb9e2e8cf8841ec63cad5458864670fb8e89402468017b447f91a3e&w=500')]"></div>
				<div className="py-4 px-5 text-center">
					<form onSubmit={handleSubmit(onSubmit)}>
						<img
							src={preview}
							className="bg-gray-200 w-44 h-44 rounded-full mx-auto border-8 border- border-white -mt-20 mb-5"
						/>
						<div className="mb-3">
							<input
								{...register("firstname")}
								type="text"
								placeholder="First Name"
								className="border rounded w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
							/>
							{errors.firstname && (
								<div className="text-red-500 text-xs italic">
									{errors.firstname.message}
								</div>
							)}
						</div>
						<div className="mb-3">
							<input
								{...register("lastname")}
								type="text"
								placeholder="Last Name"
								className="border rounded w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
							/>
							{errors.lastname && (
								<div className="text-red-500 text-xs italic">
									{errors.lastname.message}
								</div>
							)}
						</div>
						<div className="mb-3">
							<input
								{...register("username")}
								type="text"
								placeholder="Username"
								className="border rounded w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
							/>
							{errors.username && (
								<div className="text-red-500 text-xs italic">
									{errors.username.message}
								</div>
							)}
						</div>
						<div className="mb-2">
							<textarea
								{...register("bio")}
								placeholder="Bio"
								className="border rounded w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
							/>
							{errors.bio && (
								<div className="text-red-500 text-xs italic">
									{errors.bio.message}
								</div>
							)}
						</div>
						<div className="mb-3">
							<input
								{...register("email")}
								type="text"
								placeholder="Email"
								className="border rounded w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
							/>
							{errors.email && (
								<div className="text-red-500 text-xs italic">
									{errors.email.message}
								</div>
							)}
						</div>
						<div className="mb-6">
							<input
								{...register("password")}
								type="password"
								placeholder="*******"
								className="border rounded w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
							/>
							{errors.password && (
								<div className="text-red-500 text-xs italic">
									{errors.password.message}
								</div>
							)}
						</div>
						<div className="flex items-center justify-center">
							<button
								type="submit"
								className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
							>
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default ProfileEdit;
