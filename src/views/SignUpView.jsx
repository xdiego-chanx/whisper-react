import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpView() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();


    const handleSignup = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        try {
            const response = await fetch("https://2ru0vyjyh2.execute-api.us-east-2.amazonaws.com/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, username, password })
            });

            if (response.ok) {
                console.log("OK!");
                navigate("/login");
            } else {
                console.error(response.status);
                console.log(await response.json());
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main className="flex justify-center items-center w-screen h-screen px-4">
            <div id="signup-form-container" className="user-form-container">
                <h1 className="text-2xl text-center font-semibold mb-2">Create an account</h1>
                <p className="text-center text-lg mb-4">Already have an account? <a href="/login" className="text-blue-400 hover:underline visited:text-purple-500">Log in</a></p>
                <form id="signup-form" onSubmit={handleSignup}>
                    <div className="input-container">
                        <label htmlFor="Email" className="input-label">Email</label>
                        <input type="email" name="Email" id="Email" placeholder="someone@example.com" className="form-input" required onInput={(event) => { setEmail(event.currentTarget.value) }}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="UserName" className="input-label">Username</label>
                        <input type="text" name="UserName" id="UserName" placeholder="sneaky_capybara_100" className="form-input" required onInput={(event) => { setUsername(event.currentTarget.value) }}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="Password" className="input-label">
                            Password
                            <button type="button" aria-label="Show password" className="px-1" onClick={() => { setPasswordVisible(!passwordVisible); }}>
                                <i className={"bi bi-eye-fill hover:text-blue-400 " + (passwordVisible ? "text-blue-500" : "text-neutral-500")}></i>
                            </button>
                        </label>
                        <input type={passwordVisible ? "text" : "password"} name="Password" id="Password" placeholder="Create a password" className="form-input" required onInput={(event) => { setPassword(event.currentTarget.value) }}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="ConfirmPassword" className="input-label">
                            Confirm password
                            <button type="button" aria-label="Show confirm password" className="px-1" onClick={() => { setConfirmPasswordVisible(!confirmPasswordVisible) }}>
                                <i className={"bi bi-eye-fill hover:text-blue-400 " + (confirmPasswordVisible ? "text-blue-500" : "text-neutral-500")}></i>
                            </button>
                        </label>
                        <input type={confirmPasswordVisible ? "text" : "password"} name="ConfirmPassword" id="ConfirmPassword" placeholder="Type your password again" className="form-input" required onInput={(event) => { setConfirmPassword(event.currentTarget.value) }}/>
                    </div>
                    <div className="input-container">
                        <input type="submit" value="Sign up" className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded text-lg py-1 duration-150" />
                    </div>
                </form>
            </div>
        </main>
    );
}
