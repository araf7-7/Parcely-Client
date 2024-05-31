import { Card } from "flowbite-react";
import { FaBoxOpen } from "react-icons/fa";

import { IoStarSharp } from "react-icons/io5";

const DeliveryCard = () => {
    return (
        <div>
            <Card
                className="max-w-[300px] "
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc="https://media.istockphoto.com/id/918839040/photo/delivery-guy.jpg?s=612x612&w=0&k=20&c=qYh6-ZhLfmbQyRMFpyAC3St7FCQuWu9wUuTzRYAFLz4="

            >
                <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                   Shihab
                </h5>
                <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                    <div className="flex gap-2 items-center">
                        <FaBoxOpen /> Parcel Delivered :
                        <h1>100</h1>
                    </div>
                </h5>
                <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                    <div className="flex gap-2 items-center">
                    <IoStarSharp className="text-yellow-400" /> Rating :
                        <h1>100</h1>
                    </div>
                </h5>

            </Card>
        </div>
    );
};

export default DeliveryCard;