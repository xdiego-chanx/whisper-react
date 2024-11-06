import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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
        const jwt = localStorage.getItem("token");

        if(!jwt) {
            setAuthenticated(false);
            return;
        }

        try {
            const token = jwtDecode(jwt);
            const isExpired = token.exp * 1000 < Date.now();

            if(isExpired) {
                setAuthenticated(false);
                localStorage.removeItem("token");
            } else {
                setAuthenticated(true);
            }
        } catch(error) {
            console.error(error);
            setAuthenticated(false);
        }
    };

    if (authenticated === null) return <LoadingSpinner/>;


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={authenticated ? <DashboardView/> : <Navigate to="/login"/>}/>
                <Route path="/login" element={<LogInView/>} />
                <Route path="/signup" element={<SignUpView/>} />
                <Route path="/conversations/:code" element={authenticated ? <DashboardView/> : <Navigate to="/login"/> } />
            </Routes>
        </BrowserRouter>
    );
}