import AppContext from "./AppContext";
import { useCookies } from "react-cookie";

export default function AppProvider({ children, init }) {
    const [, , removeCookie] = useCookies();

    function login(token) {
        init.setToken(token);
    };

    function logout() {
        init.setToken("");
        removeCookie("token");
    };

    function toggleDarkMode() {
        document.documentElement.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", !init.darkMode);
        init.setDarkMode(!init.darkMode);
    }

    return (
        <AppContext.Provider value={{ token: init.token, setToken: init.setToken, login, logout, toggleDarkMode }}>
            {children}
        </AppContext.Provider>
    );
}