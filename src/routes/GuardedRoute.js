import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import AppContext from "../context/AppContext";

export default function GuardedRoute() {
    const { token } = useContext(AppContext);
    const { pathname } = useLocation();

    return token ? <Outlet /> : <Navigate to="/login" state={pathname} replace />;
}
