import { Configuration, OpenAIApi } from "openai";

const SYSTEM_MESSAGE: string = `
You are a helpful assistant who pays careful attention to instructions. 
You are also a literature expert who has the entirety of The Complete Works of Shakespeare memorized word for word.
`

const TASK: string = `
Someone approaches you with the following search query "chapters where Romeo and Juliet are happy". List 5 small sections within the text of The Complete Works of Shakespeare that are most relevant to that query. 
Respond with the section name, some text from that section, 5 key words from the text that matched the query, and a short explanation on why the text is relevant to the query. 

It is imperative that you ONLY respond in the following JSON format:
[{"section": "...", "text" : "...", "key_words": "<word_1> <word_2> ...", "explanation" : "..."}, ...]
`

interface SearchResult {
    readonly section: string;
    readonly text: string;
    readonly key_words: string;
    readonly explanation: string;
}

export async function fetchResults(query: string): Promise<SearchResult[]> {
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: SYSTEM_MESSAGE }, { role: "user", content: TASK }],
        max_tokens: 1000
    });
    const jsonOutput : string = completion.data.choices[0].message?.content as string;
    const data = JSON.parse(jsonOutput)

    const output: SearchResult[] = data.map((datum : any) => {
        return {
            section: datum['section'],
            text: datum['text'],
            key_words: datum['key_words'],
            explanation: datum['explanation']
        }
    })
    return output
}