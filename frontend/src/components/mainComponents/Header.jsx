import { Search, Bell, Heart, ShoppingCart, ChevronDown } from "lucide-react";
import Button from "../commonComponents/Button";
import { PiGraduationCap } from "react-icons/pi";

const Header = () => {
	return (
		<header className="bg-white border-b">
			<div className=" mx-auto px-6">
				<div className="flex items-center h-16">
					{/* Left section */}
					<div className="flex items-center gap-1">
						{/* Logo */}
						<PiGraduationCap className="h-6 w-6 text-[#FF5722]" />
						<a href="/" className="flex items-center">
							<span className=" text-2xl font-bold">
								Edu<span className="text-[#FF5722]">Eden</span>
							</span>
						</a>
					</div>
					{/* Search Bar */}
					<div className="flex-1 max-w-sm mx-4">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
							<input
								type="text"
								placeholder="What do you want learn..."
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF5722] text-sm"
							/>
						</div>
					</div>

					<div className="flex items-center ml-auto">
						{/* Right section */}
						<div className="flex items-center gap-6">
							{/* Icons */}
							<div className="flex items-center gap-4">
								<button className="text-gray-600 hover:text-gray-900">
									<Bell className="h-5 w-5" />
								</button>
								<button className="text-gray-600 hover:text-gray-900">
									<Heart className="h-5 w-5" />
								</button>
								<button className="text-gray-600 hover:text-gray-900">
									<ShoppingCart className="h-5 w-5" />
								</button>
							</div>

							{/* Auth Buttons */}
							<div className="flex items-center gap-3">
								<button
									value="Create Account"
									className="bg-[#FFEEE8] text-[#FF5722] whitespace-nowrap p-1 px-2.5 hover:bg-[#ecd9d2]">Create Account</button>
								<Button
									text="Sign In"
									className="bg-[#FF5722] hover:bg-[#FF5722]/90"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
