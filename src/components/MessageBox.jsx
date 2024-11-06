import PropTypes from "prop-types";

export default function MessageBox({code}) {
    const resizeTextbox = (event) => {
        const box = event.target;
        box.style.height = "auto";
        box.style.height = box.scrollHeight + "px";
    }
    const sendOnEnter = async (event) => {

        if (event.key == "Enter" && !event.shiftKey) {
            event.preventDefault();

            const message = event.target.value;
            if(!message.trim()) {
                return;
            }

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found");
                }

                const response = await fetch(`https://2ru0vyjyh2.execute-api.us-east-2.amazonaws.com/messages/${code}`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: message,
                        code: code,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to send message");
                }

                const data = await response.json();
                console.log("Message sent:", data);
                event.target.value = "";

            } catch(error) {
                console.error(error);
            }

            void code;
        }
    }


    return (
        <div id="message-box-container" className="w-full py-4 px-6 justify-self-end sticky bottom-0 bg-neutral-200">
            <div id="message-box-wrapper" className="w-full flex gap-4 bg-white rounded-lg px-4 py-1">
                <button aria-label="Upload..." className="text-neutral-600 transform hover:scale-110 active:scale-100 duration-150">
                    <i className="bi bi-plus-circle text-xl"></i>
                </button>
                <textarea name="message" id="message" autoComplete="off" placeholder="Type a message" rows="1" className="text-lg focus:outline-none flex-1 resize-none h-8 max-h-52 bg-transparent placeholder:text-neutral-400" onInput={resizeTextbox} onKeyDown={sendOnEnter}></textarea>
                <button aria-label="Emoji..." className="text-neutral-600 transform hover:scale-110 active:scale-100 duration-150">
                    <i className="bi bi-emoji-smile text-xl"></i>
                </button>
            </div>
        </div>

    );
}

MessageBox.propTypes = {
    code: PropTypes.string.isRequired
}