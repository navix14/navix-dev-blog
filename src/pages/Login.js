import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

export default function Login() {
    const [loaded, setLoaded] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { token, login, logout } = useContext(AppContext);

    const prevRoute = useLocation().state;
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Login | navix.dev";
        setLoaded(true);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await (await fetch("https://api.navix.me/api/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password
            })
        })).json();

        if (res.error) {
            alert(res.message);
            return;
        }

        // Set auth information
        login(res.payload.token);

        // Ensure navigation happens after auth state has propagated
        // Otherwise, GuardedRoute component may redirect back to login route.
        setTimeout(() => navigate(prevRoute || "/home"), 0);
    };

    const handleLogout = (e) => {
        e.preventDefault();

        logout();
        navigate("/home");
    }

    return (
        <div className={`login page ${loaded ? "active" : ""}`}>
            <div className="login-wrapper">
                <div className="login-component">
                    {token ?
                        (
                            <>
                                <h1>Welcome back, Navix!</h1>
                                <button onClick={handleLogout}>Sign out</button>
                            </>
                        )
                        : (
                            <>
                                <p>Please sign in to your account</p>
                                <form onSubmit={handleLogin}>
                                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    <button type="submit">Login</button>
                                </form>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}