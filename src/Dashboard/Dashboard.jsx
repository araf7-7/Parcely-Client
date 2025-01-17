
import { HiHome } from "react-icons/hi";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";

import AdminMenu from "./MenuItem/AdminMenu";
import UserMenu from "./MenuItem/UserMenu";
import DeliveryItem from "./MenuItem/DeliveryItem";
import { Helmet } from "react-helmet";

const Dashboard = () => {
    const [role] = useRole()


    return (
        <div className="lg:flex grid grid-cols-1 ">

            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div className="lg:w-[356px] w-full min-h-screen bg-sky-200">
                <ul className="menu p-4 text-lg font-abc text-black">
                    {role === 'Admin' && <AdminMenu></AdminMenu>}
                    {role === 'User' && <UserMenu></UserMenu>}
                    {role === 'Delivery Man' && <DeliveryItem></DeliveryItem>}
                    <div className="divider"></div>
                    <li className="">
                        <NavLink to='/'>
                            <HiHome></HiHome>
                            Home
                        </NavLink>
                    </li>

                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;