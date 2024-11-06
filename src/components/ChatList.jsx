import ChatListItem from "./ChatListItem";

export default function ChatList() {
    return (
        <aside id="chat-list" className="h-screen max-w-sm 2xl:max-w-md px-4 border-r border-neutral-400 overflow-y-auto">
            <h1 className="bg-white text-3xl font-semibold sticky top-0 py-4">Chats</h1>
            <div id="chat-list-grid" className="flex flex-col gap-2 my-4">
                <ChatListItem/>
            </div>
        </aside>
    );
}