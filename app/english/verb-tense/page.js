'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CreateVerbTense = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const [submitting, setSubmitting] = useState(false);
	const [sentences, setSentences] = useState([]);

	useEffect(() => {
		const fetchSentences = async () => {
			const response = await fetch('/api/english');
			const data = await response.json();
			setSentences(data);
		};
		fetchSentences();
	}, []);

	const createSentence = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			const response = await fetch('/api/english/verb-tense', {
				method: 'POST',
				body: JSON.stringify({
					userId: session?.user.id,
				}),
			});
			console.log(response);
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div>
			<button onClick={createSentence}>Create sentence</button>
			{sentences &&
				sentences.map((sentence) => {
					return <p key={sentence._id}>{sentence.sentence}</p>;
				})}
		</div>
	);
};
export default CreateVerbTense;
