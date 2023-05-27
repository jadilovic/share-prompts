import VerbTense from '@models/verb-tense';
import { connectToDB } from '@utils/database';

const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(
	new Configuration({
		apiKey: process.env.API_KEY,
	})
);

const PROMPT =
	'Can you please create one new sentence using present simple or present perfect or present passive or past simple or past perfect or past passive and identify which verb tense was used? Desired format: Sentence: <text of the sentence> Verb tense used: <name of verb tense used>';

export const POST = async (request) => {
	const { userId } = await request.json();

	try {
		const response = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: PROMPT }],
		});
		await connectToDB();
		const newSentence = new VerbTense({
			creator: userId,
			sentence: response.data.choices[0].message.content,
			tense: 'from ai to do',
		});

		await newSentence.save();

		return new Response(JSON.stringify(newSentence), { status: 201 });
	} catch (error) {
		console.log(error.message);
		return new Response('Failed to create a new sentence', { status: 500 });
	}
};
