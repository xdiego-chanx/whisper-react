import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import DashboardView from "./views/DashboardView";
import LogInView from "./views/LogInView";
import SignUpView from "./views/SignUpView";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        verifyAuth();
    }, []);

    const verifyAuth = async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
        setAuthenticated(false);
    };

    if (authenticated === null) return <LoadingSpinner/>;


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={authenticated ? <DashboardView/> : <Navigate to="/login"/>}/>
                <Route path="/login" element={<LogInView/>} />
                <Route path="/signup" element={<SignUpView/>} />
            </Routes>
        </BrowserRouter>
    );
}