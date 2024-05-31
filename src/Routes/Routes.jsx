import {

    createBrowserRouter
} from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Error from "../Error/Error";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../Dashboard/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/updateProfile',
                element: <UpdateProfile></UpdateProfile>
            },

        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <Dashboard></Dashboard>
            </PrivateRoute>,
        children: [
            // {
            //     path: 'Cart',
            //     element: <Cart></Cart>
            // },
            // // admin paths
            // {
            //     path: 'users',
            //     element: <AllUsers></AllUsers>
            // }
        ]
    }
]);
