import { useState } from "react";

export default function LogInView() {

    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <main className="flex justify-center items-center w-screen h-screen px-4">
            <div id="login-form-container" className="user-form-container">
                <h1 className="text-2xl text-center font-semibold mb-2">Log into your account</h1>
                <p className="text-center text-lg mb-4">Don&apos;t have an account? <a href="/users/signup" className="text-blue-400 hover:underline visited:text-purple-500">Create one</a></p>
                <form action="http://127.0.0.1:5262/api/users/signup" method="post" id="signup-form">
                    <div className="input-container">
                        <label htmlFor="user-email" className="input-label">Username or email</label>
                        <input type="text" name="user-email" id="user-email" placeholder="The one you signed up with" className="form-input" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password" className="input-label">
                            Password
                            <button type="button" aria-label="Show password" className="px-1" onClick={()=>{ setPasswordVisible(!passwordVisible); }}>
                                <i className={"bi bi-eye-fill hover:text-blue-400 " + (passwordVisible ? "text-blue-500" : "text-neutral-500")}></i>
                            </button>
                        </label>
                        <input type={passwordVisible ? "text" : "password"} name="password" id="password" placeholder="Type your password" className="form-input"/>
                    </div>
                    <div className="input-container">
                        <input type="submit" value="Log in" className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded text-lg py-1 duration-150"/>
                    </div>
                </form>
            </div>
        </main>

    );
}