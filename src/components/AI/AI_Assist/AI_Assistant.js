import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from "react";
function Message({ role, content }) {
    if (role === 'system')
        return _jsx("div", {});
    return (_jsx("div", { className: `${role === 'user' ? 'b-color-dark-2' : 'b-color-dark-3'}`, children: _jsx("p", { className: `${role === 'user' ? 'j-left' : 'j-right'} flex`, children: content }) }));
}
export default function AI_Assistant() {
    // const [event, setEvent] = useState(new EventSource('http://localhost:4000/stream'));
    // useEffect(() => {
    //     event.addEventListener('message', message => {
    //         //console.log('Got STREAM', message);
    //     });
    // }, [])
    // useEffect(()=>{
    //     console.log('Event Event Event!')
    //     console.log(event)
    // }, [event])
    //----------------------------------------------
    const [currentMessage, setCurrentMessage] = useState({
        role: 'user',
        content: ''
    });
    const { role, content } = currentMessage;
    const [chatHistory, setChatHistory] = useState([{ role: 'system', content: 'You are a wise individual' }]);
    const openAI = new OpenAIApi(new Configuration({
        apiKey: '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' //process.env.OPENAI_API_KEY
    }));
    //get user input
    const updateUserInput = (e) => {
        setCurrentMessage({ ...currentMessage, content: e.target.value });
        console.log(e.target.value);
    };
    //process user request
    const sendPrompt = async (e) => {
        e.preventDefault();
        let updatedConversation = [...chatHistory, currentMessage];
        //createPrompt({req : {body: JSON.stringify(updatedConversation) }})
        //const req : Request = JSON.stringify(updatedConversation);
        setChatHistory([...chatHistory, currentMessage]);
        setCurrentMessage({ ...currentMessage, content: '' });
        await postPrompt([...updatedConversation]);
    };
    //Post user request and get Assistant's response
    async function postPrompt(updatedConversation) {
        console.log('Trying to send prompt.... : at - async function postPrompt');
        try {
            // const config = {
            //     headers: {
            //         cacheControl: 'no-cache',
            //         contentType: 'text/event-stream',
            //         connection: 'keep-alive',
            //         responseType: 'stream'
            //     }
            // };
            const response = await openAI.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: updatedConversation,
                stream: true,
            }, { responseType: 'stream' });
            console.log(response);
            const tokens = JSON.stringify(response.data).split(`\n\ndata: `);
            // for (let chunk in response){
            //     console.log(' Printing Chunks of the Stream...');
            //     console.log(chunk)
            // }
            // const payload: OpenAIStreamPayload = {
            //     model: "gpt-3.5-turbo",
            //     messages: updatedConversation,
            //     temperature: 0.9,
            //     presence_penalty: 0.6,
            //     max_tokens: 100,
            //     stream: true,
            // };
            // const stream = await OpenAIStream(payload);
            // console.log('CreatePrompt Executed! Stream: ');
            // const subStream = (await stream.getReader().read()).value;
            // console.log(subStream)
            // //return new Response(stream);
            // createPrompt([...updatedConversation]);
            //const item : number = response.data.choices.length;
            const assistantResponseMessage = 0; //response.data.choices[0].message;
            console.log('assistantResponseMessage is:', assistantResponseMessage);
            updatedConversation.push({ ...assistantResponseMessage });
            console.log('updatedConversation is:', updatedConversation);
        }
        catch (error) {
            console.error('COULD NOT POST Request to OpenAI:', error);
        }
        console.log('OPENAI LOG:');
        console.log(updatedConversation);
        setChatHistory(updatedConversation);
    }
    useEffect(() => {
        console.log('_________________________________________\nChat History updated:');
        console.log(chatHistory);
    }, [chatHistory]);
    return (_jsxs("div", { className: "p4 m4 white font-2 b-color-dark-1 border-r3 centered flex f-dir-col", children: [_jsx("h2", { children: "Virtual Assistant" }), _jsxs("section", { children: [_jsx("article", { children: chatHistory.length > 0 &&
                            _jsx("div", { children: chatHistory.map((message, index) => (_jsx("div", { children: _jsx(Message, { role: message.role, content: message.content }) }, index))) }) }), _jsxs("form", { onSubmit: (e) => sendPrompt(e), children: [_jsx("input", { className: "p3 m3", type: "text", id: "content", value: content, name: "content", onChange: (e) => updateUserInput(e) }), _jsx("button", { type: "submit", children: '->' })] })] })] }));
}
