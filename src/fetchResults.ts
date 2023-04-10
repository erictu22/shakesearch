import { Configuration, OpenAIApi } from "openai";
import {SSE} from './sse'

export interface SearchResult {
    readonly section: string;
    readonly text: string;
    readonly key_words: string[];
    readonly explanation: string;
}

async function fetchResults(systemMessage: string, task : string, eventStreamHandler : (content : string, isDone: boolean) => void) {
    let source = new SSE(
        "https://api.openai.com/v1/chat/completions",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
          },
          method: "POST",
          payload: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: systemMessage }, { role: "user", content: task }],
            max_tokens: 1200,
            temperature: 0.9,
            stream: true
        }),
        }
      )

    // @ts-ignore
    source.addEventListener("message", (e : any) => {
        if (e.data == '[DONE]') {
            eventStreamHandler("", true)
            return;
        }

            const content : string = JSON.parse(e.data)['choices'][0]['delta']['content']
        if (content) {
            eventStreamHandler(content, false)
        }
        
    })

    // @ts-ignore
    source.stream();
}

export async function prompt(query: string, numResults : number, eventStreamHandler : (content : string, isDone: boolean) => void) {

    const systemMessage: string = `
    You are a helpful assistant who pays careful attention to instructions. 
    You are also a literature expert who has the "The Complete Works of Shakespeare" memorized.
    `

    const task: string = `
    Given the search query "${query}", list 1 to ${numResults} quotes from The Complete Works of Shakespeare that are relevant to that query. 
    
    For each section, respond with:
    1. The section name - include the act / scene number if relevant
    2. The exact quote from the work
    3. A short explanation of the quote's context, as well as why it is relevant to the search query
    4. Some key words from the quote that match the query

    Only include the quote in your response if it's a good match. Don't include it otherwise.

    It is imperative that you ONLY respond in the following JSON format:
    [{"section": "...", "quote" : "...", "explanation" : "...", "key_words": ["...", "...", ...]}, ...]
    `

    try {
        fetchResults(systemMessage, task, eventStreamHandler);
    } catch (e: any){
        console.log(e)
    }
}