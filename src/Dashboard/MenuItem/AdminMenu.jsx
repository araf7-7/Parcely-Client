import { SiStatista } from "react-icons/si";

import { HiMiniUserGroup } from "react-icons/hi2";
import { MdManageAccounts } from "react-icons/md";
import { RiMenuSearchLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import MenuItem from "./MenuItem";


const AdminMenu = () => {
    return (
        <div>
            <li className="">
                <MenuItem label='All Parcels' address='/dashboard/allParcel' icon={TbTruckDelivery}></MenuItem>
            </li>
            <li className="">
                <MenuItem label='All Users' address='/dashboard/allUser' icon={HiMiniUserGroup}></MenuItem>
            </li>
            <li className="">
            <MenuItem label='All Delivery Man' address='/dashboard/allDeliveryMan' icon={MdManageAccounts}></MenuItem>
            </li>
            <li className="">
            <MenuItem label='Statistics' address='/dashboard/statistic' icon={SiStatista}></MenuItem>
            </li>
            <li className="">
            <MenuItem label='Menu' address='/dashboard/menu' icon={RiMenuSearchLine}></MenuItem>
            </li>
        </div>
    );
};

export default AdminMenu;