import { createParser, } from "eventsource-parser";
export async function OpenAIStream(payload) {
    console.log('ASYNC OpenAIStream Fired...');
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
        },
        method: "POST",
        body: JSON.stringify(payload),
    });
    console.log('ASYNC OpenAIStream INIT response is:', res);
    const stream = new ReadableStream({
        async start(controller) {
            // callback
            function onParse(event) {
                console.log('ASYNC onParse Fired');
                if (event.type === "event") {
                    const data = event.data;
                    if (data === "[DONE]") {
                        controller.close();
                        return;
                    }
                    try {
                        const json = JSON.parse(data);
                        const text = json.choices[0].delta.content;
                        const queue = encoder.encode(text);
                        controller.enqueue(queue);
                    }
                    catch (e) {
                        // maybe parse error
                        controller.error(e);
                    }
                }
            }
            // stream response (SSE) from OpenAI may be fragmented into multiple chunks
            // this ensures we properly read chunks and invoke an event for each SSE event stream
            const parser = createParser(onParse);
            // https://web.dev/streams/#asynchronous-iteration
            for await (const chunk of res.body) {
                console.log('ASYNC LOOP running...: ', chunk);
                parser.feed(decoder.decode(chunk));
            }
        },
    });
    return stream;
}
