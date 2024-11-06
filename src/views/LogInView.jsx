import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogInView() {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userOrEmail, setUserOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("https://2ru0vyjyh2.execute-api.us-east-2.amazonaws.com/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userOrEmail, password })
            });

            if(response.ok) {
                console.log("OK!");
                const data = await response.json();
                const token = data.token;

                localStorage.setItem("token", token);

                navigate("/");
            } else {
                console.error(response.status);
                console.log(await response.json());
            }

        } catch(error) {
            console.error(error);
        }
    }

    return (
        <main className="flex justify-center items-center w-screen h-screen px-4">
            <div id="login-form-container" className="user-form-container">
                <h1 className="text-2xl text-center font-semibold mb-2">Log into your account</h1>
                <p className="text-center text-lg mb-4">Don&apos;t have an account? <a href="/signup" className="text-blue-400 hover:underline visited:text-purple-500">Create one</a></p>
                <form id="login-form" onSubmit={handleLogin}>
                    <div className="input-container">
                        <label htmlFor="user-email" className="input-label">Username or email</label>
                        <input type="text" name="user-email" id="user-email" placeholder="The one you signed up with" className="form-input" onInput={(event) => { setUserOrEmail(event.currentTarget.value) }}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="password" className="input-label">
                            Password
                            <button type="button" aria-label="Show password" className="px-1" onClick={()=>{ setPasswordVisible(!passwordVisible); }}>
                                <i className={"bi bi-eye-fill hover:text-blue-400 " + (passwordVisible ? "text-blue-500" : "text-neutral-500")}></i>
                            </button>
                        </label>
                        <input type={passwordVisible ? "text" : "password"} name="password" id="password" placeholder="Type your password" className="form-input" onInput={(event) => { setPassword(event.currentTarget.value) }}/>
                    </div>
                    <div className="input-container">
                        <input type="submit" value="Log in" className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded text-lg py-1 duration-150"/>
                    </div>
                </form>
            </div>
        </main>

    );
}