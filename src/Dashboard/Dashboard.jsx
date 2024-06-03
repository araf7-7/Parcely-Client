
import { HiHome } from "react-icons/hi";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";

import AdminMenu from "./MenuItem/AdminMenu";
import UserMenu from "./MenuItem/UserMenu";
import DeliveryItem from "./MenuItem/DeliveryItem";

const Dashboard = () => {
    const [role, isLoading] = useRole()

    console.log(role, isLoading);
    return (
        <div className="flex">
            <div className="w-[356px] min-h-screen bg-sky-200">
                <ul className="menu p-4 text-lg font-abc text-black">
                    {role === 'Admin' && <AdminMenu></AdminMenu> }
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