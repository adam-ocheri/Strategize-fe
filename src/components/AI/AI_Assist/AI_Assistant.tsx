
import axios, { AxiosResponse } from "axios";
import { Configuration, OpenAIApi, ChatCompletionResponseMessage, CreateChatCompletionRequest, CreateChatCompletionResponse } from "openai"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { ReadLine } from "readline"
import createPrompt from "./StreamHandler";
import { OpenAIStream, OpenAIStreamPayload } from "./OpenAIStream";

export interface messageBase{
    role: string;
    content: string
}

function Message({role, content} : messageBase) {
    if(role === 'system') return <div></div>

    return (
        <div className={`${role === 'user' ? 'b-color-dark-2' : 'b-color-dark-3'}`}>
            <p className={`${role === 'user' ? 'j-left' : 'j-right'} flex`}>
                {content}
            </p>
        </div>
    )
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
    const {role, content} = currentMessage;
    const [chatHistory, setChatHistory] : any[] = useState([{role: 'system', content: 'You are a wise individual'}]);
    

    const openAI : OpenAIApi = new OpenAIApi(new Configuration({
        apiKey: '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' //process.env.OPENAI_API_KEY
    }))

    //get user input
    const updateUserInput = (e : ChangeEvent<HTMLInputElement>) => {
        setCurrentMessage({...currentMessage, content: e.target.value})
        console.log(e.target.value);
    }
    

    //process user request
    const sendPrompt = async (e : FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        let updatedConversation : any[] = [...chatHistory, currentMessage];
        //createPrompt({req : {body: JSON.stringify(updatedConversation) }})
        //const req : Request = JSON.stringify(updatedConversation);
        
        setChatHistory([...chatHistory, currentMessage]);
        setCurrentMessage({...currentMessage, content: ''});
        await postPrompt([...updatedConversation]);
        
    }

    //Post user request and get Assistant's response
    async function postPrompt(updatedConversation : any[]){
        console.log('Trying to send prompt.... : at - async function postPrompt')
        try {
            
            // const config = {
            //     headers: {
            //         cacheControl: 'no-cache',
            //         contentType: 'text/event-stream',
            //         connection: 'keep-alive',
            //         responseType: 'stream'
            //     }
            // };
            
            // const response  = await openAI.createChatCompletion({
            //     model: 'gpt-3.5-turbo',
            //     messages: updatedConversation,
            //     stream: true,
            // }, {responseType: 'stream'});


            // console.log(response);

            // const tokens = JSON.stringify(response.data).split(`\n\ndata: `);

            const response : any = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer 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`,
                },
                body: JSON.stringify({
                  model: "gpt-3.5-turbo",
                  messages: updatedConversation,
                  stream: true
                }),
            });

            console.log('response: ', response);

            const clonedResponse: Response = response.clone();
          
            //const data = await response.json();
            //resultText = data.choices[0].message.content;

            const reader : ReadableStreamDefaultReader<any> | undefined | any = clonedResponse.body?.getReader();

            const decoder = new TextDecoder("utf-8");
            let resultText = "";
            let accumulatedChunk = "";

            while (true) {
                const { done, value } = await reader?.read();
                if (done) {
                    break;
                }
                console.log('streamed value:' ,value);
                // Massage and parse the chunk of data
                const chunk = decoder.decode(value);
                accumulatedChunk += chunk;
                console.log('accumulatedChunk ', accumulatedChunk);
                const lines = accumulatedChunk.split("\\n");
                console.log('lines ', lines);
                const parsedLines = lines
                    .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
                    .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
                    .map((line) => JSON.parse(line)); // Parse the JSON string

                for (const parsedLine of parsedLines) {
                    console.log('parsedLine', parsedLine)
                    const { choices } = parsedLine;
                    const { delta } = choices[0];
                    const { content } = delta;
                    // Update the UI with the new content
                    if (content) {
                        console.log('STREAMING:', content);
                        resultText += content;
                    }
                }
                const lastLine = lines[lines.length - 1];
                accumulatedChunk = lastLine.endsWith("\\n") ? lastLine : "";
            }

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
            const assistantResponseMessage : ChatCompletionResponseMessage | undefined | any  = 0//response.data.choices[0].message;
            console.log('assistantResponseMessage is:', assistantResponseMessage);
            updatedConversation.push({...assistantResponseMessage});
            console.log('updatedConversation is:', updatedConversation)
        } catch (error) {
            console.error('COULD NOT POST Request to OpenAI:', error);
        }
        
        console.log('OPENAI LOG:');
        console.log(updatedConversation);
        setChatHistory(updatedConversation)
    }

    useEffect(() => {
        console.log('_________________________________________\nChat History updated:')
        console.log(chatHistory)
    }, [chatHistory])

  return (
    <div className="p4 m4 white font-2 b-color-dark-1 border-r3 centered flex f-dir-col">
        <h2>Virtual Assistant</h2>
        <section>
            <article>
                {chatHistory.length > 0 && 
                <div>
                    {chatHistory.map((message : messageBase, index : number)  => (
                        <div key={index}>
                            <Message role={message.role} content={message.content} />
                        </div>
                    ) )}
                </div>
                }
            </article>

            <form onSubmit={(e : FormEvent<HTMLFormElement>) => sendPrompt(e)}>
                <input 
                    className="p3 m3"
                    type="text"
                    id="content"
                    value={content}
                    name="content"
                    onChange={(e : ChangeEvent<HTMLInputElement>) => updateUserInput(e)} 
                />
                <button type="submit">{'->'}</button>
            </form>
        </section>
    </div>
  )
}
