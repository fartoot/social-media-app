import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu } from 'lucide-react';

function Nav() {
	const { accessToken, setAccessToken } = useContext(AuthContext);
	const navigate = useNavigate();
	const logout = () => {
		setAccessToken(null);
		navigate("/");
	};

	return (
		<header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 mx-auto max-w-screen-3xl">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="lg:hidden">
						<Menu className="h-6 w-6" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<Link to="/" className="font-mono tracking-wider mx-auto lg:hidden">
					socialMedia
				</Link>
				<SheetContent side="left">
					<Link to="#" className="mr-6 hidden lg:flex">
						<Link to="/" className="font-mono tracking-wider">
							socialMedia
						</Link>
					</Link>
					<div className="grid gap-2 py-6">
						{accessToken ? (
							<>
								<Link to="/" className="flex w-full items-center py-2 text-lg">
									Home
								</Link>
								<Link to="profile" className="flex w-full items-center py-2 text-lg">
									Profile
								</Link>
                <button onClick={logout} className="flex w-full items-center py-2 text-lg text-red-600">
									Logout
								</button>
							</>
						) : (
							<>
								<Link to="register" className="flex w-full items-center py-2 text-lg">
									Register
								</Link>
								<Link to="login" className="flex w-full items-center py-2 text-lg">
									Login
								</Link>
							</>
						)}
					</div>
				</SheetContent>
			</Sheet>
			<Link to="#" className="mr-6 hidden lg:flex">
				<Link to="/" className="font-mono tracking-wider	">
					socialMedia
				</Link>
			</Link>
			<nav className="ml-auto hidden lg:flex gap-6">
				{accessToken ? (
					<>
						<Link
							to="/"
							className="group inline-flex h-9 w-max items-center justify-center rounded-full bg-white px-4 py-2 text-gray-700 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none "
						>
							Home
						</Link>
						<Link
							to="profile"
							className="group inline-flex h-9 w-max items-center justify-center rounded-full bg-white px-4 py-2 text-gray-700 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none "
						>
							Profile
						</Link>
						<button
							onClick={logout}
							className="group shadow-sm inline-flex border border-red-200 h-9 w-max items-center justify-center rounded-full bg-red-50 px-4 py-2 text-red-500 text-sm font-medium transition-colors hover:bg-red-100 hover:text-red-900 focus:bg-red-100 focus:text-red-900 focus:outline-none"
						>
							Logout
						</button>
					</>
				) : (
					<>
						<Link
							to="register"
							className="group inline-flex h-9 w-max items-center justify-center rounded-full bg-white px-4 py-2 text-gray-700 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-gray-900 focus:text-gray-900 focus:outline-none "
						>
							Register
						</Link>
						<Link
							to="login"
							className="group shadow-md inline-flex h-9 w-max items-center justify-center rounded-full bg-gray-50 px-4 py-2 text-gray-700 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none "
						>
							Login
						</Link>
					</>
				)}
			</nav>
		</header>
	);
}

export default Nav;