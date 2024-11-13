import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import MessageBubble from "./MessageBubble";

export default function DirectMessage({ code, messages }) {
    const [self, setSelf] = useState("");

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
                setSelf(data.self);  // Assuming self info is fetched correctly

            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [code]);

    return (
        <div className="flex-1 flex flex-col gap-4">
            {messages.length > 0 ? (
                messages.map((message, index) => (
                    <MessageBubble
                        key={index}
                        self={message["from_code"] === self}
                        message={message["content"]}
                        sendTime={message["send_time"]}
                    />
                ))
            ) : (
                <div className="text-center text-neutral-400 pointer-events-none">No messages to show...</div>
            )}
        </div>
    );
}

DirectMessage.propTypes = {
    code: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,  // Make sure this is required
};
