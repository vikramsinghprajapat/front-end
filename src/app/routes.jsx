import {
    createBrowserRouter,
} from "react-router-dom";

import Layout from "../components/layout/Layout";

import Dashboard from "../pages/Dashboard";
import Courses from "../pages/Courses";
import Enrollments from "../pages/Enrollments";
import CourseDetails from "../pages/CourseDetails";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "courses",
                element: <Courses />,
            },
            {
                path: "courses/:id",
                element: <CourseDetails />,
            },
            {
                path: "enrollments",
                element: <Enrollments />,
            },

        ],
    },

    {
        path: "/login",
        element: <Login />,
    },
    {
    path: "/register",
    element: <Register />
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;