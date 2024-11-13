import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import ChatList from "../components/ChatList";
import DirectMessage from "../components/DirectMessage";
import DirectMessageHeader from "../components/DirectMessageHeader";
import MessageBox from "../components/MessageBox";

export default function DashboardView() {
    const { code } = useParams();
    const [messages, setMessages] = useState([]);
    const ws = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found");
                return;
            }

            try {
                const response = await fetch(`https://2ru0vyjyh2.execute-api.us-east-2.amazonaws.com/conversations/${code}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });

                if (!response.ok) {
                    console.error("Failed to fetch messages");
                    return;
                }

                const data = await response.json();
                setMessages(data.messages);

            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        if (code){
            fetchMessages();
        }
    }, [code, messages]);

    useEffect(() => {
        const connectWebSocket = () => {
            if(ws.current && ws.readyState == WebSocket.OPEN) {
                console.log("WebSocket already open");
            }

            const token = localStorage.getItem("token");

            ws.current = new WebSocket(`wss://2k9ligtz1d.execute-api.us-east-2.amazonaws.com/production?code=${token}`);
            
            ws.current.onopen = () => {
                console.log("WebSocket connected");
            }

            ws.current.onmessage = (event) => {
                const response = JSON.parse(event.data);

  
                console.log("Sent and received back: " + response.message + ". Status code: " + response.statusCode);
                
                if(response.statusCode === 200) {
                    setMessages((prevMessages) => [...prevMessages, response.message]);
                }

            }

            ws.current.onclose = () => {
                console.log("WebSocket disconnected");
            }

            ws.current.onerror = (error) => {
                console.error(error);
            }
        }

        if(code) {
            connectWebSocket();
        }

        return () => {
            if(ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
        }
    }, [code]);

    const sendMessage = (message) => {
        
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return;
        }

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            console.log("WebSocket open, sending...");
            ws.current.send(JSON.stringify({
                action: "sendMessage",
                code: code,
                content: message,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }));

        } else {
            console.warn("WebSocket is not open, message not sent");
        }
    };

    return (
        <main className="w-screen h-screen overflow-hidden flex">
            <ChatList />
            {code ? (
                <div className="flex flex-1 flex-col">
                    <DirectMessageHeader code={code} />
                    <div className="p-6 flex flex-1 flex-col h-screen overflow-y-auto">
                        <DirectMessage code={code} messages={messages} />
                    </div>
                    <MessageBox code={code} sendMessage={sendMessage} />
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
