import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleX, CloudUpload, CircleCheck  } from 'lucide-react';
import { ProfileContext } from "../context/ProfileContext";
import AsyncRequest from "../utils/request";
import cover from "../assets/cover.jpg";

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
	const { profile, setProfile } = useContext(ProfileContext);
	const [preview, setPreview] = useState();
	const [base64IMG, setBase64IMG] = useState(null);
	const [message, setMessage] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(formSchema),
	});

	const params = useParams();

	const handleImage = (e) => {
		const file = e.target.files[0];
		if (file) {
			setPreview(URL.createObjectURL(file));

			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setBase64IMG(reader.result); // Save the Base64 string
			};
		}
	};

	useEffect(() => {
		const getUser = async () => {
  		try {
        const data = await AsyncRequest(`http://127.0.0.1:8000/users/${params.id}`, "GET", accessToken);
        reset({
						firstname: data.first_name,
						lastname: data.last_name,
						username: data.username,
						bio: data.bio,
						email: data.email,
					});
				setPreview(`${data.photo}`);
      } catch (error) {
        console.error(error);
      }
		};
		getUser();
	}, [accessToken]);

	const onSubmit = async (data) => {
		try {
        const body =  JSON.stringify({
    				photo: base64IMG,
    				bio: data.bio,
    				first_name: data.firstname || null,
    				last_name: data.lastname || null,
    				username: data.username || null,
    				email: data.email || null,
    				password: data.password || null,
  			})
        const options = {"content-type": "application/json"}
        const response = await AsyncRequest('http://127.0.0.1:8000/users/', "PUT", accessToken, body,options);
        setProfile(response);
				setMessage(true);
    } catch (error) {
      setMessage(false);
      console.error(error);
    }
	};
	return (
		<>
			<div className="bg-gray-50 border rounded-3xl">
			<div className="bg-gray-200 w-full h-52 rounded-3xl bg-cover" style={{ backgroundImage: `url(${cover})` }}></div>
				<div className="py-4 px-5 text-center">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="w-full">
							<div className="relative w-44 h-44 mx-auto mb-5 rounded-circle">
								<input
									type="file"
									id="profileImage"
									className="hidden"
									onChange={handleImage}
								/>
								<label htmlFor="profileImage">
									<div className="bg-gray-100 rounded-full absolute shadow top-2.5 right-2.5 p-1.5 hover:bg-gray-200">
									   <CloudUpload size={25} className="stroke-gray-600" />
									</div>
									<img
										src={preview}
										alt=""
										className="hover:bg-gray-300 bg-gray-200 w-44 h-44 rounded-full mx-auto object-cover border-8 border- border-white -mt-20 mb-5 cursor-pointer"
									/>
								</label>
							</div>
						</div>
						{message !== null &&
							(message ? (
								<Alert variant="success" className="mb-5">
								  <CircleCheck size={32} className="stroke-emerald-300" />
									<AlertTitle>Success</AlertTitle>
									<AlertDescription>
										Profile was successfully updated.
									</AlertDescription>
								</Alert>
							) : (
								<Alert variant="error" className="mb-5">
    						  <CircleX size={32}/>
									<AlertTitle>Error</AlertTitle>
									<AlertDescription>
										An error occurred while updating profile. Please try again.
									</AlertDescription>
								</Alert>
							))}
						<div className="mb-3">
							<input
								{...register("firstname")}
								type="text"
								placeholder="First Name"
								className="border rounded-lg w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
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
								className="border rounded-lg w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
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
								className="border rounded-lg w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
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
								className="border rounded-lg w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
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
								className="border rounded-lg w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
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
								className="border rounded-lg w-full py-2 px-3 text-gray-700 mb-2 focus:outline-none focus:border-gray-400"
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
								className="bg-white border border-gray-200 hover:bg-gray-100 text-gray-600 py-2 px-6 rounded-full shadow-sm"
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
