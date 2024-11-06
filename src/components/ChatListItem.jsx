import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ChatListItem({
    url,
    username,
    profile="https://via.placeholder.com/64", 
    description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit vel modi similique minus enim iste nostrum unde dolorem nihil nesciunt!", 
}) {
    return (
        <Link to={"/conversations/" + url} className="flex items-center gap-6 p-2 hover:bg-neutral-200 duration-150 rounded-lg">
            <div className="flex justify-center items-center w-16 h-auto aspect-square rounded-full overflow-hidden">
                <img src={profile} alt={username + "'s profile"} className="w-full h-full"/>
            </div>
            <div className="flex-1">
                <div className="flex justify-between">
                    <h2 className="line-clamp-1 text-xl">{username}</h2>
                </div>
                <div>
                    <p className="line-clamp-1">{description}</p>
                </div>
            </div>
        </Link>
    );
} 

ChatListItem.propTypes = {
    url: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profile: PropTypes.string,
    description: PropTypes.string,
}