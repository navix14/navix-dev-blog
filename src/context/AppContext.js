import { createContext } from "react";

export default createContext({
    token: "",
    darkMode: false,
    toggleDarkMode: () => { },
    login: () => { },
    logout: () => { }
});
