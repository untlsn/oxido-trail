import * as fs from 'node:fs/promises';
import OpenAI from 'openai';

async function readPlainArticle() {
	let content: string | undefined = undefined;
	try {
		content = await fs.readFile('./plain-article.txt', 'utf-8');
	} catch (e: any) {
		// "No such file or directory" can be better described by error below
		if (e?.message != 'No such file or directory') throw e;
	}
	if (!content) throw new Error('Please add plain-article.txt file with article content to project root');
	return content;
}

/**
 * Create simple instance of openai with limitation to one message as user and return first content
 */
function createSimpleChat() {
	const apiKey = process.env.OPEN_AI_KEY;
	const model = process.env.OPEN_AI_MODEL;
	if (!apiKey || !model) throw Error('OPEN_AI_KEY and OPEN_AI_MODEL must be present in env variables');
	const openai = new OpenAI({ apiKey });

	return async (content: string) => {
		const { choices } = await openai.chat.completions.create({
			model,
			messages: [
				{ role: "user", content },
			],
		})

		return choices[0].message.content
	}
}