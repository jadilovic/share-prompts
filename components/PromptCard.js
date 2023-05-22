import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();
	const [copied, setCopied] = useState('');

	const handleCopy = () => {
		setCopied(post.prompt);
		navigator.clipboard.writeText(post.prompt);
		setTimeout(() => setCopied(''), 3000);
	};

	return (
		<div>
			<div>
				<div>
					<Image
						width={40}
						height={40}
						alt="user image"
						src={post.creator.image}
					/>
				</div>
				<div className="creator">
					<h3>{post.creator.username}</h3>
					<p>{post.creator.email}</p>
				</div>
				<div>
					<button onClick={handleCopy} className="copy-btn">
						<Image
							alt="copy icon"
							src={
								copied === post.prompt
									? '/assets/icons/tick.svg'
									: '/assets/icons/copy.svg'
							}
							width={12}
							height={12}
						/>
					</button>
				</div>
				<p>{post.prompt}</p>
				<p onClick={() => handleTagClick && handleTagClick(post.tag)}>
					#{post.tag}
				</p>
				{session?.user.id === post.creator._id && pathName === '/profile' && (
					<div>
						<p onClick={() => handleEdit(post)}>Edit</p>
						<p onClick={() => handleDelete(post)}>Delete</p>
					</div>
				)}
			</div>
		</div>
	);
};
export default PromptCard;
