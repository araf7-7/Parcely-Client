
import { FaShippingFast } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { IoIosTimer } from "react-icons/io";


const FeatureCard = () => {
    return (
        <>
          
            <div className="grid grid-cols-1 my-[130px] md:grid-cols-2 lg:grid-cols-3 gap-5 container mx-auto items-center justify-center">
                <div className="shadow-2xl">
                    <div className="flex w-auto h-52 items-center">
                        <div className="px-10 text-sky-400">
                            <GiReceiveMoney className="text-6xl " />
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div>
                            <h1 className="text-3xl font-bold">Flat Rate Fees</h1>
                            <p className="text-base text-gray-700 font-medium">Select high-quality boxes and packaging materials to withstand transit.</p>
                        </div>
                    </div>
                </div><div className="shadow-2xl ">
                    <div className="flex w-auto h-52 items-center">
                        <div className="px-10">
                            <IoIosTimer className="text-6xl text-sky-400 " />
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div>
                            <h1 className="text-3xl  font-bold">24/7 Services</h1>
                            <p className="text-base text-gray-700 font-medium">Provide customer support <br /> 24 hours a day, 7 days a week</p>
                        </div>
                    </div>
                </div>
                <div className="shadow-2xl">
                    <div className="flex w-auto h-52 items-center">
                        <div className=" px-10">
                            <FaShippingFast className="text-5xl text-sky-400" />
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div>
                            <h1 className="text-3xl font-bold">Super First Delivery</h1>
                            <p className="text-base text-gray-700 font-medium">Orders are processed immediately upon receipt to ensure quick dispatch.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeatureCard;