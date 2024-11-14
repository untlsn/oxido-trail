// index.ts
import * as fs from "node:fs/promises";
import OpenAI from "openai";
import"dotenv/config";
async function readPlainArticle() {
  let content = undefined;
  try {
    content = await fs.readFile("./plain-article.txt", "utf-8");
  } catch (e) {
    if (e?.message != "No such file or directory")
      throw e;
  }
  if (!content)
    throw new Error("Please add plain-article.txt file with article content to project root");
  return content;
}
function createSimpleChat() {
  const apiKey = process.env.OPEN_AI_KEY;
  if (!apiKey)
    throw Error("OPEN_AI_KEY must be present in env variables");
  const openai = new OpenAI({ apiKey });
  return async (content) => {
    const { choices } = await openai.chat.completions.create({
      model: process.env.OPEN_AI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "user", content }
      ]
    });
    const aiResponse = choices[0].message.content;
    if (!aiResponse)
      throw new Error("OpenAI don\'t return any response");
    return aiResponse;
  };
}
function trimHtml(html) {
  return html.replace(/(^.*<body>\n?)|(\n?<\/body>.*$)/, "");
}
async function main() {
  console.log("Generowanie, prosze czeka\u0107...");
  const chat = createSimpleChat();
  const prompt = 'Give html with good SEO and semantic. Add images in figure with comprehensive description in figcaption, src="image_placeholder.jpg" and alt that can be used to generate graphics by AI. Everything in polish. Return only body:';
  const articleText = await readPlainArticle();
  const content = trimHtml(await chat(`${prompt}\n\n${articleText}`));
  await fs.writeFile("./artykul.html", content, "utf-8");
  console.log(`

Plik zosta\u0142 wygenerowany do ./artykul.html`);
  if (!process.argv.includes("--with-template"))
    return;
  const template = await fs.readFile("./szablon.html", "utf-8");
  await fs.writeFile("./podglad.html", template.replace("<!--APP-->", content), "utf-8");
  console.log("Podgl\u0105d pliku zosta\u0142 wygenerowany do ./podglad.html");
}
await main();
