'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const Feed = () => {
	const [searchText, setSearchText] = useState('');
	const [posts, setPosts] = useState([]);
	const handleSearchChange = () => {};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('/api/prompt');
			const data = await response.json();
			setPosts(data);
		};
		fetchPosts();
	}, []);

	const PromptCardList = ({ data, handleTagClick }) => {
		return (
			<div>
				{data.map((post) => {
					return (
						<PromptCard
							key={post._id}
							post={post}
							handleTagClick={handleTagClick}
						/>
					);
				})}
			</div>
		);
	};
	return (
		<section className="feed">
			<form>
				<input
					type="text"
					value={searchText}
					onChange={handleSearchChange}
					placeholder="Search for a tag or username"
					required
				/>
			</form>
			<PromptCardList data={posts} handleTagClick={() => {}} />
		</section>
	);
};
export default Feed;
