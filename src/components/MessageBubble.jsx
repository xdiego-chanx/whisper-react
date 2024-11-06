import PropTypes from "prop-types";

export default function MessageBubble({ self, message, sendTime }) {
    return (
        <div className={"flex w-full " + (self ? "justify-end" : "justify-start")}>
            <div
                className={"w-full flex flex-col max-w-lg rounded-lg"}
            >
                <div className={(self ? "bg-blue-300" : "bg-neutral-200") + " p-2 rounded-lg"}>

                    <div>{message}</div>
                </div>
                <span className="text-sm text-neutral-600 self-end">{sendTime}</span>
            </div>
        </div>
    );
}

MessageBubble.propTypes = {
    self: PropTypes.bool.isRequired,
    message: PropTypes.string,
    sendTime: PropTypes.string.isRequired
}