'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setUpProviders();
	}, []);

	return (
		<nav>
			<Link className="logo-image" href="/">
				<Image
					src="/assets/images/logo.svg"
					alt="Promptopia Logo"
					width={30}
					height={30}
				/>
				<p>Promptopia</p>
			</Link>
			<div className="desktop-nav">
				{session?.user ? (
					<div className="nav-links">
						<Link href="/create-prompt">Create Post</Link>
						<button onClick={signOut} className="signout-btn">
							Sign Out
						</button>
						<Link href="/profile">
							<Image
								src={session?.user?.image}
								alt="Profile"
								height={37}
								width={37}
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => {
								return (
									<button
										key={provider.name}
										type="button"
										onClick={() => signIn(provider.id)}
									>
										Sign In
									</button>
								);
							})}
					</>
				)}
			</div>
			<div className="mobile-nav">
				{session?.user ? (
					<div className="flex">
						<Image
							src={session?.user?.image}
							alt="Profile"
							height={37}
							width={37}
							onClick={() => {
								setToggleDropdown((prev) => !prev);
							}}
						/>
						<p>{session.user.name}</p>
						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown-link"
									onClick={() => setToggleDropdown(false)}
								>
									My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown-link"
									onClick={() => setToggleDropdown(false)}
								>
									Create Post
								</Link>
								<button
									type="button"
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => {
								return (
									<button
										key={provider.name}
										type="button"
										onClick={() => signIn(provider.id)}
									>
										Sign In
									</button>
								);
							})}
					</>
				)}
			</div>
		</nav>
	);
};
export default Nav;
