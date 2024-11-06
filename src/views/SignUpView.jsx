import { useState } from "react";

export default function SignUpView() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [newsletterOptIn, setNewsletterOptIn] = useState(false);

    return (
        <main className="flex justify-center items-center w-screen h-screen px-4">
            <div id="signup-form-container" className="user-form-container">
                <h1 className="text-2xl text-center font-semibold mb-2">Create an account</h1>
                <p className="text-center text-lg mb-4">Already have an account? <a href="/users/login" className="text-blue-400 hover:underline visited:text-purple-500">Log in</a></p>
                <form action="http://127.0.0.1:5262/api/users/signup" method="post" id="signup-form">
                    <div className="input-container">
                        <label htmlFor="Email" className="input-label">Email</label>
                        <input type="email" name="Email" id="Email" placeholder="someone@example.com" className="form-input" required/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="UserName" className="input-label">Username</label>
                        <input type="text" name="UserName" id="UserName" placeholder="sneaky_capybara_100" className="form-input" required/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="Password" className="input-label">
                            Password
                            <button type="button" aria-label="Show password" className="px-1" onClick={() => { setPasswordVisible(!passwordVisible); }}>
                                <i className={"bi bi-eye-fill hover:text-blue-400 " + (passwordVisible ? "text-blue-500" : "text-neutral-500")}></i>
                            </button>
                        </label>
                        <input type={passwordVisible ? "text" : "password"} name="Password" id="Password" placeholder="Create a password" className="form-input" required/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="ConfirmPassword" className="input-label">
                            Confirm password
                            <button type="button" aria-label="Show confirm password" className="px-1" onClick={() => { setConfirmPasswordVisible(!confirmPasswordVisible) }}>
                                <i className={"bi bi-eye-fill hover:text-blue-400 " + (confirmPasswordVisible ? "text-blue-500" : "text-neutral-500")}></i>
                            </button>
                        </label>
                        <input type={confirmPasswordVisible ? "text" : "password"} name="ConfirmPassword" id="ConfirmPassword" placeholder="Type your password again" className="form-input" required/>
                    </div>
                    <div className="input-container">
                        <div className="flex items-center gap-4">
                            <label htmlFor="NewsletterOptIn" className="w-4 aspect-square h-4 border border-neutral-400 flex justify-center items-center hover:outline hover:outline-1 hover:outline-blue-400 duration-150">
                                <i className={"bi bi-check text-lg flex justify-center items-center text-blue-500 duration-150 " + (newsletterOptIn ? "scale-100" : "scale-0")}></i>
                                <input type="checkbox" name="NewsletterOptIn" id="NewsletterOptIn" className="hidden" onInput={() => { setNewsletterOptIn(!newsletterOptIn); }}/>
                            </label>
                            <label htmlFor="NewsletterOptIn">Sign me up for Whisper&apos;s newsletter</label>
                        </div>
                    </div>
                    <div className="input-container">
                        <input type="submit" value="Sign up" className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded text-lg py-1 duration-150"/>
                    </div>
                </form>
            </div>
        </main>
    );
}
