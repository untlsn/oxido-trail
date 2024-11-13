import * as fs from 'node:fs/promises';

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

console.log(await readPlainArticle())