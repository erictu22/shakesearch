import { Configuration, OpenAIApi } from "openai";

export interface SearchResult {
    readonly section: string;
    readonly text: string;
    readonly key_words: string[];
    readonly explanation: string;
}

async function fetchResults(systemMessage: string, task : string): Promise<SearchResult[]> {
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: systemMessage }, { role: "user", content: task }],
        max_tokens: 1200,
        temperature: 0.9
    });
    const jsonOutput : string = completion.data.choices[0].message?.content as string;
    console.log(jsonOutput)
    const data = JSON.parse(jsonOutput)

    const output: SearchResult[] = data.map((datum : any) => {
        return {
            section: datum['section'],
            text: datum['quote'],
            key_words: datum['key_words'],
            explanation: datum['explanation']
        }
    })
    return output
}

export async function prompt(query: string, numResults : number) : Promise<SearchResult[]> {

    const systemMessage: string = `
    You are a helpful assistant who pays careful attention to instructions. 
    You are also a literature expert who has the entirety of "The Complete Works of Shakespeare" in front of you.
    `

    const task: string = `
    Given the search query "${query}",
    list 1 to ${numResults} quotes from The Complete Works of Shakespeare that are relevant to that query. 
    
    For each section, respond with:
    1. The section name - include the act / scene number if relevant
    2. The exact quote from the work
    3. A short explanation of the context and meaning behind the quote in modern English
    4. Some key words taken from the quote that are relevant to the query

    Only include the quote in your response if it's a good match. Don't include it otherwise.

    It is imperative that you ONLY respond in the following JSON format:
    [{"section": "...", "quote" : "...", "explanation" : "...", "key_words": ["...", "...", ...]}, ...]
    `
    let result : SearchResult[] = []

    try {
        result = await fetchResults(systemMessage, task);
    } catch (e: any){
        console.log(e)
    }
    return result;
}