
import { Configuration, OpenAIApi, ChatCompletionResponseMessage } from "openai"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { ReadLine } from "readline"

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
        setChatHistory([...chatHistory, currentMessage]);
        //setChatHistory((...prev : any[]) =>[...prev, currentMessage]);
        setCurrentMessage({...currentMessage, content: ''});
        await postPrompt([...updatedConversation]);
        
    }

    //Post user request and get Assistant's response
    async function postPrompt(updatedConversation : any[]){
        try {
            const response = await openAI.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: updatedConversation
            })
            const item :any = response.data.choices.length;
            const assistantResponseMessage : ChatCompletionResponseMessage | undefined  = response.data.choices[item -1].message;
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
