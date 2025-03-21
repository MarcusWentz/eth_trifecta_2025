"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { cn } from "@/lib/utils";

const Navbar = () => {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="bg-black w-full px-4 py-3 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				{/* Logo */}
				<Link href="/" className="flex items-center">
					<div className="text-[28px] md:text-[32px] text-white font-serif">
						Zkads
					</div>
				</Link>

				{/* Desktop Search Bar - hidden on mobile */}
				<div className="flex items-center">
					<div>
						<ConnectButton />
					</div>
				</div>

				{/* Mobile Menu Button - visible only on mobile */}
				<div className="md:hidden flex items-center">
					<button
						onClick={toggleMenu}
						className="text-white text-2xl focus:outline-none"
					>
						{isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
					</button>
				</div>
			</div>

			{/* Mobile Menu - slides down when menu is open */}
			<div
				className={cn(
					"md:hidden absolute left-0 right-0 bg-black transition-all duration-300 ease-in-out overflow-hidden",
					isMenuOpen ? "max-h-[500px] py-4" : "max-h-0"
				)}
			>
				{/* Mobile Search Bar */}
				<div className="flex mx-4 my-3 items-center bg-[#363840] rounded-lg">
					
					<div className="py-2">
						<ConnectButton />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
