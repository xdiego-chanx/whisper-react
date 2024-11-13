import PropTypes from "prop-types";

import DateWrapper from "../lib/DateWrapper";

export default function MessageBubble({ self, message, sendTime }) {
    return (
        <div className={"flex w-full pointer-events-none " + (self ? "justify-end" : "justify-start")}>
            <div className={"w-fit flex flex-col max-w-lg rounded-lg"} >
                <div className={(self ? "bg-blue-300" : "bg-neutral-200") + " px-4 py-2 rounded-lg"}>

                    <div className="break-all">{message}</div>
                </div>
                <span className="text-sm text-neutral-600 self-end">{new DateWrapper(sendTime).toMessageTimeStamp()}</span>
            </div>
        </div>
    );
}

MessageBubble.propTypes = {
    self: PropTypes.bool.isRequired,
    message: PropTypes.string,
    sendTime: PropTypes.string.isRequired
}