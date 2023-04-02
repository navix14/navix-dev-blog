import { createBrowserRouter, Navigate } from "react-router-dom";

import Root from "./Root";
import GuardedRoute from "./GuardedRoute";
import { Home, Projects, Contact, Blog, BlogPost, BlogAdmin, BlogEdit, BlogNew, Login } from "../pages";

export default createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" />,
            },
            {
                path: "home",
                element: <Home />
            },
            {
                path: "projects",
                element: <Projects />
            },
            {
                path: "blog",
                element: <Blog />,
            },
            {
                path: "blog/:entry",
                element: <BlogPost />,
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                element: <GuardedRoute />,
                children: [
                    {
                        path: "blog/admin",
                        element: <BlogAdmin />
                    },
                    {
                        path: "blog/admin/edit",
                        element: <BlogEdit />
                    },
                    {
                        path: "blog/admin/new",
                        element: <BlogNew />
                    },
                ]
            },
            {
                path: "login",
                element: <Login />
            }
        ]
    }
]);