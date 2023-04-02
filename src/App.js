import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import AppProvider from './context/AppProvider';
import router from './routes/routes';

function App() {
    const [appInitialized, setAppInitialized] = useState(false);
    const [token, setToken] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [cookies] = useCookies();

    useEffect(() => {
        if (localStorage.getItem("dark-mode") === "true") {
            document.documentElement.classList.add("dark-mode");
            setDarkMode("true");
        }

        if (cookies.token) {
            setToken(cookies.token);
        }

        setAppInitialized(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.StrictMode>
            <AppProvider init={{ token, darkMode, setToken, setDarkMode }}>
                {appInitialized ? <RouterProvider router={router} /> : null}
            </AppProvider>
        </React.StrictMode>
    );
}

export default App;