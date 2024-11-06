import ChatList from "../components/ChatList";
import DirectMessage from "../components/DirectMessage";
import DirectMessageHeader from "../components/DirectMessageHeader";
import MessageBox from "../components/MessageBox";

export default function MessageView() {
    return (
        <main className="w-screen h-screen overflow-hidden flex">
            <ChatList/>
            <div className="flex flex-1 flex-col">
                <DirectMessageHeader/>
                <div className="p-6 flex flex-1 flex-col h-screen overflow-y-auto">
                    <DirectMessage/>
                </div>
                <MessageBox/>
            </div>
        </main>
    );
}

