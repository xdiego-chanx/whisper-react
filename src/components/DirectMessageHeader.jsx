import PropTypes from "prop-types";

export default function DirectMessageHeader({ username, profile }) {
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
    username: PropTypes.string,
    profile: PropTypes.string
}

DirectMessageHeader.defaultProps = {
    username: "Jonathan (UTP)",
    profile: "https://via.placeholder.com/64"
}