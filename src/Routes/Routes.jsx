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
import AllParcel from "../Dashboard/Admin/AllParcel";
import AllUser from "../Dashboard/Admin/AllUser";
import BookParcel from "../Dashboard/User/BookParcel";
import MyParcel from "../Dashboard/User/MyParcel";
import UpdateParcel from "../Dashboard/User/UpdateParcel";
import MyProfile from "../Dashboard/User/MyProfile";
import UpdateUser from "../Dashboard/User/UpdateUser";

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
            //admin routes
            {
                path: 'allParcel',
                element: <AllParcel></AllParcel>
            },
            {
                path: 'allUser',
                element: <AllUser></AllUser>
            },
            {
                path: 'allDeliveryMan',
                element: <AllUser></AllUser>
            },
            {
                path: 'statistic',
                element: <AllUser></AllUser>
            },
            {
                path: 'menu',
                element: <AllUser></AllUser>
            },
            // user routes
            {
                path: 'bookParcel',
                element: <BookParcel></BookParcel>
            },
            {
                path: 'myParcel',
                element: <MyParcel></MyParcel>
            },
            {
                path: 'myProfile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'updateUser',
                element: <UpdateUser></UpdateUser>
            },
            {
                path: 'updateParcel/:id',
                element: <UpdateParcel></UpdateParcel>,
                loader: ({ params }) => fetch(`http://localhost:5000/parcel/g/${params.id}`)
            },

        ]
    }
]);
