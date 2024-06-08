import { FaBoxOpen, FaUsers } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import useAxiosPublic from './../hooks/useAxiosPublic';
import { useQuery } from "@tanstack/react-query";
import CountUp from 'react-countup';

const Stat = () => {
    const axiosPublic = useAxiosPublic();
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/parcel`);
            return res.data;
        },
    });
    const { data: user = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users`);
            return res.data;
        },
    });

    // Count the delivered parcels
    const deliveredParcelsCount = parcels.filter(parcel => parcel.status === 'Delivered').length;

    return (
        <>
            <div>
                <h1 className="text-5xl font-abc mb-10 text-center">Our Statistic</h1>
            </div>
            <div className="container pl-[400px]">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure">
                            <FaBoxOpen className="text-3xl text-sky-400" />
                        </div>
                        <div className="stat-title">Parcel Booked</div>
                        <CountUp className="stat-value" end={parcels.length} />
                    </div>

                    <div className="stat">
                        <div className="stat-figure">
                            <FaTruckFast className="text-3xl text-sky-400" />
                        </div>
                        <div className="stat-title">Parcel Delivered</div>
                        <CountUp className="stat-value" end={deliveredParcelsCount} />
                    </div>

                    <div className="stat">
                        <div className="stat-figure">
                            <FaUsers className="text-3xl text-sky-400" />
                        </div>
                        <div className="stat-title">Total User</div>
                        <CountUp className="stat-value" end={user.length} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Stat;
