import { useState, useEffect } from "react";

import ChatListItem from "./ChatListItem";

export default function ChatList() {

    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await fetch("https://2ru0vyjyh2.execute-api.us-east-2.amazonaws.com/users/all", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data.users);
            } else {
                console.error(response.status);
                console.log(await response.json());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <aside id="chat-list" className="h-screen w-96 px-4 border-r border-neutral-400 overflow-y-auto">
            <h1 className="bg-white text-3xl font-semibold sticky top-0 py-4">Chats</h1>
            <div id="chat-list-grid" className="flex flex-col gap-2 my-4">
                {
                    loading ?
                        (<div>Loading...</div>)
                        :
                        users && users.length > 0 ? (
                            users.map((user) => {
                                return <ChatListItem key={user["code"]} url={user["code"]} username={user["user_name"]} />
                            })
                        )
                            :
                            (
                                <div className="text-neutral-400">No users available</div>
                            )
                }
            </div>
        </aside>
    );
}