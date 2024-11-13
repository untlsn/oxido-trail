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

		const aiResponse = choices[0].message.content
		if (!aiResponse) throw new Error('OpenAI don\'t return any response')
		return aiResponse;
	}
}

/**
 * Guard in case AI return more than just content of body
 */
function trimHtml(html: string) {
	return html.replace(/(^.*<body>\n?)|(\n?<\/body>.*$)/, '')
}

async function main() {
	const chat = createSimpleChat();

	const prompt = 'Give html with good SEO and semantic. Add images in figure with comprehensive description in figcaption, src="image_placeholder.jpg" and alt that can be used to generate graphics by AI. Everything in polish. Return only body:';

	const articleText = await readPlainArticle();

	const content = trimHtml(await fs.readFile('./artykul.html', 'utf-8'));

	await fs.writeFile('./artykul.html', content, 'utf-8')

	if (!process.argv.includes('--with-template')) return;

	const template = await fs.readFile('./szablon.html', 'utf-8')
	await fs.writeFile('./podglad.html', template.replace('<!--APP-->', content), 'utf-8')
}

main();