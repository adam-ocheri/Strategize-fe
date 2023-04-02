import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from "react";
function Message({ role, content }) {
    if (role === 'system')
        return _jsx("div", {});
    return (_jsx("div", { className: `${role === 'user' ? 'b-color-dark-2' : 'b-color-dark-3'}`, children: _jsx("p", { className: `${role === 'user' ? 'j-left' : 'j-right'} flex`, children: content }) }));
}
export default function AI_Assistant() {
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
        setChatHistory([...chatHistory, currentMessage]);
        //setChatHistory((...prev : any[]) =>[...prev, currentMessage]);
        setCurrentMessage({ ...currentMessage, content: '' });
        await postPrompt([...updatedConversation]);
    };
    //Post user request and get Assistant's response
    async function postPrompt(updatedConversation) {
        try {
            // const response = await openAI.createChatCompletion({
            //     model: 'gpt-3.5-turbo',
            //     messages: updatedConversation
            // })
            const response = await openAI.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: updatedConversation,
                stream: true,
            }, { responseType: 'stream' });
            const item = response.data.choices.length;
            const assistantResponseMessage = response.data.choices[item - 1].message;
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
