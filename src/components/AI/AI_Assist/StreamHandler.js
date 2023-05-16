import { Configuration, OpenAIApi } from "openai";
import { OpenAIStream } from "./OpenAIStream";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export const config = {
    runtime: "edge",
};
const pre_prompt = `
You are a virtual assistant that helps me as user in the web app "Strategize" - an app all about keeping track of your goals and excelling !
Here is an example of how to start the conversation: 
"Hi! I am you Assistant. How can I help you strategize?"
`;
// no api calls while testing
const testing = false;
function getMessagesPrompt(chat) {
    console.log('getMessagesPrompt FIRED');
    let messages = [];
    const system = { role: "system", content: pre_prompt };
    messages.push(system);
    chat.map((message) => {
        const role = message.name == "Me" ? "user" : "assistant";
        const m = { role: role, content: message.message };
        messages.push(m);
    });
    return messages;
}
const createPrompt = async (chat) => {
    console.log('createPrompt FIRED');
    //const result = await req.json();
    //const chat = result.chat;
    //const message = chat.slice(-1)[0].message;
    const message = chat[chat.length - 1];
    // if (message.trim().length === 0) {
    //   return new Response("Need enter a valid input", { status: 400 });
    // }
    if (testing) {
        //figure out how tf to simulate a stream
        return new Response("this is a test response ");
    }
    else {
        const payload = {
            model: "gpt-3.5-turbo",
            messages: getMessagesPrompt(chat),
            temperature: 0.9,
            presence_penalty: 0.6,
            max_tokens: 100,
            stream: true,
        };
        const stream = await OpenAIStream(payload);
        console.log('CreatePrompt Executed! stream:', stream);
        return new Response(stream);
    }
};
export default createPrompt;
