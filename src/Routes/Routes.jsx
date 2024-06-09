import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Error from "../Error/Error";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../Dashboard/Dashboard";
import AllParcel from "../Dashboard/Admin/AllParcel";
import AllUser from "../Dashboard/Admin/AllUser";
import BookParcel from "../Dashboard/User/BookParcel";
import MyParcel from "../Dashboard/User/MyParcel";
import UpdateParcel from "../Dashboard/User/UpdateParcel";
import MyProfile from "../Dashboard/User/MyProfile";
import UpdateUser from "../Dashboard/User/UpdateUser";
import DeliveryList from "../Dashboard/DeliveryMan/DeliveryList";
import AllDeliveryMan from "../Dashboard/Admin/AllDeliveryMan";
import Statistic from "../Dashboard/Admin/Statistic";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";
import DeliveryPrivateRoute from "../PrivateRoute/DeliveryPrivateRoute";
import Payment from "../Dashboard/User/Payment";
import PaymentSuccess from "../Dashboard/User/PaymentSuccess";
import MyReviews from "../Dashboard/DeliveryMan/MyReviews";
import ReviewModal from "../Dashboard/DeliveryMan/ReviewModal";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    },
    {
        path: 'dashboard',
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            // admin routes
            {
                path: 'allParcel',
                element: <AdminPrivateRoute><AllParcel /></AdminPrivateRoute>
            },
            {
                path: 'allUser',
                element: <AdminPrivateRoute><AllUser /></AdminPrivateRoute>
            },
            {
                path: 'allDeliveryMan',
                element: <AdminPrivateRoute><AllDeliveryMan /></AdminPrivateRoute>
            },
            {
                path: 'statistic',
                element: <AdminPrivateRoute><Statistic /></AdminPrivateRoute>
            },
            // user routes
            {
                path: 'bookParcel',
                element: <BookParcel />
            },
            {
                path: 'myParcel',
                element: <MyParcel />
            },
            {
                path: 'myProfile',
                element: <MyProfile />
            },
            {
                path: 'updateUser',
                element: <UpdateUser />
            },
            {
                path: `payment/:id`,
                element: <Payment></Payment>,
            },
            {
                path: `payment-success`,
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path: 'updateParcel/:id',
                element: <UpdateParcel />,
                loader: ({ params }) => fetch(`http://localhost:5000/parcel/g/${params.id}`)
            },
            // delivery route
            {
                path: 'myDelivery',
                element: <DeliveryPrivateRoute><DeliveryList /></DeliveryPrivateRoute>
            },
            {
                path: 'reviews',
                element: <DeliveryPrivateRoute><MyReviews></MyReviews></DeliveryPrivateRoute>
            },
            {
                path: "reviews/:id",
                element: <ReviewModal></ReviewModal>,
                loader: ({ params }) => fetch(`http://localhost:5000/parcel/g/${params.id}`)
            },
        ]
    }
]);
