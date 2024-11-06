import PropTypes from "prop-types";

export default function ChatListItem({username, profile, lastMessage, lastMessageTime}) {
    return (
        <div className="flex items-center gap-6 p-2 hover:bg-neutral-200 duration-150 rounded-lg">
            <div className="flex justify-center items-center w-16 h-auto aspect-square rounded-full overflow-hidden">
                <img src={profile} alt={username + "'s profile"} className="w-full h-full"/>
            </div>
            <div className="flex-1">
                <div className="flex justify-between">
                    <h2 className="line-clamp-1 text-xl">{username}</h2>
                    <span className="text-neutral-400">{lastMessageTime}</span>
                </div>
                <div>
                    <p className="line-clamp-1">{lastMessage}</p>
                </div>
            </div>
        </div>
    );
}

ChatListItem.defaultProps = {
    username: "Jonathan (UTP)",
    profile: "https://via.placeholder.com/64",
    lastMessage: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit vel modi similique minus enim iste nostrum unde dolorem nihil nesciunt!",
    lastMessageTime: "2:00 PM"
}

ChatListItem.propTypes = {
    username: PropTypes.string,
    profile: PropTypes.string,
    lastMessage: PropTypes.string,
    lastMessageTime: PropTypes.string,
}