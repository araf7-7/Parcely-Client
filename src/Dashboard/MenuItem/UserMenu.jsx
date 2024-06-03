import MenuItem from "./MenuItem";
import { FaRegUser } from "react-icons/fa6";
import { LuPackageCheck } from "react-icons/lu";
import { MdOutlineBookmarkAdd } from "react-icons/md";

const UserMenu = () => {
    return (
        <div>
            <li className="">
                <MenuItem label='Book A Parcel' address='/dashboard/bookParcel' icon={MdOutlineBookmarkAdd }></MenuItem>
            </li>
            <li className="">
                <MenuItem label='My Parcel' address='/dashboard/myParcel' icon={LuPackageCheck}></MenuItem>
            </li>
            <li className="">
                <MenuItem label='My Profile' address='/dashboard/myProfile' icon={FaRegUser}></MenuItem>
            </li>
        </div>
    );
};

export default UserMenu;