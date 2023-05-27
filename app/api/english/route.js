import { connectToDB } from '@utils/database';
import VerbTense from '@models/verb-tense';

export const GET = async (req, res) => {
	try {
		await connectToDB();
		console.log('test');
		const sentences = await VerbTense.find({}).populate('creator');
		return new Response(JSON.stringify(sentences), { status: 201 });
	} catch (error) {
		return new Response('Failed to fetch all sentences!', { status: 500 });
	}
};
