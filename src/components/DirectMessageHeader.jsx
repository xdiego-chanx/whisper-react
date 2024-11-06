import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function DirectMessageHeader({ code }) {
    const profile = "https://via.placeholder.com/64";
    const [username, setUsername] = useState("");

    useEffect( () => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
        
                if (!token) {
                    throw new Error("No token found");
                }
        
                const response = await fetch(`https://2ru0vyjyh2.execute-api.us-east-2.amazonaws.com/users/${code}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
        
                if (!response.ok) {
                    throw new Error("User not found");
                }
        
                const data = await response.json();
                setUsername(data["user_name"]);
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        }

        fetchUserData();
        
    }, [code]);

    return (
        <header className="px-4 py-2 bg-blue-200 flex items-center gap-4 sticky top-0">
            <div className="flex justify-center items-center w-12 h-auto aspect-square rounded-full overflow-hidden">
                <img src={profile} alt={username + "'s profile"} className="w-full h-full" />
            </div>
            <div>
                <h1 className="text-xl font-semibold">{username}</h1>
            </div>
        </header>
    );
}

DirectMessageHeader.propTypes = {
    code: PropTypes.string.isRequired
}