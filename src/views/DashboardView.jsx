import { useParams } from "react-router-dom";

import ChatList from "../components/ChatList";
import DirectMessage from "../components/DirectMessage";
import DirectMessageHeader from "../components/DirectMessageHeader";
import MessageBox from "../components/MessageBox";

export default function DashboardView() {
    const { code } = useParams();


    return (
        <main className="w-screen h-screen overflow-hidden flex">
            <ChatList/>
            {code ? (
                <div className="flex flex-1 flex-col">
                    <DirectMessageHeader code={code}/>
                    <div className="p-6 flex flex-1 flex-col h-screen overflow-y-auto">
                        <DirectMessage code={code}/>
                    </div>
                    <MessageBox code={code}/>
                </div>
            ) : (
                <div className="flex flex-1 flex-col items-center justify-center">
                    <i className="bi bi-chat-dots-fill text-[8rem] text-neutral-400"></i>
                    <span className="text-2xl">Click on a contact to start texting</span>               
                </div>  
            )}
        </main>
    );
}

