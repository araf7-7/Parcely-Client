
import { FaBoxOpen } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";

const Cards = ({ user }) => {
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])
    const { name, img } = user || {}
    return (
        <div>
            <div data-aos='fade-up' className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={img} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body ">
                    <h1 className="text-2xl text-black">Name: {name}</h1>
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
                </div>
            </div>
        </div>
    );
};

export default Cards;