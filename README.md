This app is built on top of OpenAI's GPT-3 model using React.js and Typescript

## 🦾 Why AI?
You may be thinking this is a "hammer looking for a nail" solution... at least I thought that way in the beginning. 

However, after testing various prompts, I realized that this tech satisfies a suprising number of use cases that users may value, including:

- Exact word search
- Context and semantic search (try searching for 'moments of foreshadowing' or 'metaphors')
- Supplemental information: I had GPT3 include a brief explanation of the quote's context and why it chose the quote. 
- Act and scene numbers are included with every result.

Futhermore, this solution is relatively no-code on the backend, which makes it easy to maintain and scale.

## 🔧 Trade-offs
I've made several trade-offs with this approach:

- Queries are slow
- Depth over breadth: only 10 to 12 results can be fetched at a time due to OpenAI's token limit
- Queries are expensive: Every query costs me approx. $0.005 , which adds up over time
- Results are unpredictable and can sometimes fail: I ask GPT to only respond in JSON and it's able to follow the format ~95% of the time

## 🎨 Product and Design
Since queries are slow, I've made a few P&D choices to mitigate this problem

- Adding an animated progress bar: I told the API to respond by streaming server-side events. This allows us to render a smooth progress bar that accurately depicts the model's progress
- Animated loading icon: The search icon gets replaced with an animated loading wheel to make the app feel more responsive
- Error messages: In the rare event that the model responds with a poorly formated JSON response, an error message is shown

## 🗺️ Future work
Currently, quote explanations are generated alongside search results in the same request. If I had more time, I would remove quote explanations and generate them only when users click on the respective result. That way, I can generate and display more initial results within a faster timeframe.
