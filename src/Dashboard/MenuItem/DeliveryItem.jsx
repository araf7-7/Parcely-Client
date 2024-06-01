import MenuItem from "./MenuItem";
import { MdOutlineReviews } from "react-icons/md";
import { FaTruckArrowRight } from "react-icons/fa6";
const DeliveryItem = () => {
    return (
        <div>
            <li className="">
                <MenuItem label='My Delivery List' address='/dashboard/myDelivery' icon={FaTruckArrowRight}></MenuItem>
            </li>
            <li className="">
                <MenuItem label='My Review' address='/dashboard/deliveryReviews' icon={MdOutlineReviews}></MenuItem>
            </li>
        </div>
    );
};

export default DeliveryItem;