# Changes made
1. I threw away the .txt file and built my app on top of OpenAI's chat completion API
2. I built my app in React.js using styled-components for styling

# Why AI?
You may be thinking that this is a "hammer looking for a nail" solution. At least I did in the beginning. However, after testing various prompts on chat.openai.com, I realized that GPT3 satisfies a suprising number of important uses cases. Such as:

- Exact word searches
- Context and semantic searches (try searching for 'moments of foreshadowing' )
- Informative results : I had GPT3 include a brief explanation on why it's chosen each search result

Futhermore, this solution is relatively no-code on the backend.

# Why not AI?
I've made several trade-offs by going with this approach:

- Queries are slow
- Only 10 to 12 results can be fetched at a time due to OpenAI's token limit
- Queries are expensive: Every query costs me approx. $0.005 , which adds up over time
- Results are unpredictable and can sometimes fail: I ask GPT to only respond in JSON and it's able to follow the JSON format ~95% of the time

# Product and Design
Since queries are slow, I've made a few P&D choices to mitigate this problem

- Progress bar - I told the API to respond by streaming server-side events. This allows us to render a smooth progress bar that accurately depicts the model's progress
- Animated loading icon - Hitting enter replaces the search icon with an animated loading wheel to make the app feel more responsive

# Future work
Currently, quote explanations are generated alongside search results in the same prompt. If I had more time, I would remove quote explanations from the initial search query prompt and have them only be generated only when users click on a result. That way, I can generate and display more results in a faster timeframe.
