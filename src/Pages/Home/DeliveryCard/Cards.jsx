import { FaBoxOpen } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Cards = ({ user }) => {
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);
    
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/parcel`);
            return res.data;
        },
    });

    const deliveredCount = parcels.filter(parcel => parcel.status === 'Delivered' && parcel.deliveryManId === user._id).length;

    return (
        <div data-aos='fade-up' className="card w-auto md:w-96 lg:w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={user.img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h1 className="text-2xl text-black">Name: {user.name}</h1>
                <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                    <div className="flex gap-2 items-center">
                        <h1>Phone Number :</h1>
                        <h1>{user.phoneNumber}</h1>
                    </div>
                </h5>
                <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                    <div className="flex gap-2 items-center">
                        <FaBoxOpen /> Parcel Delivered :
                        <h1>{deliveredCount}</h1>
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
    );
};

export default Cards;
