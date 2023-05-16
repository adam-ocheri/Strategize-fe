import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
  } from "eventsource-parser";
  
  export interface OpenAIStreamPayload {
    model: string;
    messages: Array<{ role: string; content: string }>;
    temperature: number;
    presence_penalty: number;
    max_tokens: number;
    stream: boolean;
  }
  
  export async function OpenAIStream(payload: OpenAIStreamPayload) {
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
        function onParse(event: ParsedEvent | ReconnectInterval) {
          console.log('ASYNC onParse Fired')
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
            } catch (e) {
              // maybe parse error
              controller.error(e);
            }
          }
        }
  
        // stream response (SSE) from OpenAI may be fragmented into multiple chunks
        // this ensures we properly read chunks and invoke an event for each SSE event stream
        const parser = createParser(onParse);
        // https://web.dev/streams/#asynchronous-iteration
        for await (const chunk of res.body as any) {
          console.log('ASYNC LOOP running...: ', chunk)
          parser.feed(decoder.decode(chunk));
        }
      },
    });
  
    return stream;
  }