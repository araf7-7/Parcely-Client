import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdDirectionsBike } from "react-icons/md";
import { Helmet } from "react-helmet";

const AllDeliveryMan = () => {
    const axiosSecure = useAxiosSecure()
    const { data: delivery = [] } = useQuery({
        queryKey: ['delivery'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/u/delivery`);
            return data;
        },
    });
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcel'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/parcel`);
            return data;
        },
    });
    // Calculate the number of delivered parcels for each delivery man
    const deliveredCounts = delivery.map(deliver => {
        const count = parcels.filter(parcel => parcel.status === 'Delivered' && parcel.deliveryManId === deliver._id).length;
        return { ...deliver, deliveredCount: count };
    });
    return (
        <div className="mx-10">
            <Helmet>
                <title>All Delivery Man</title>
            </Helmet>
            <div>
                <h1 className="text-4xl my-10 flex gap-2 items-center"> <MdDirectionsBike /> All Delivery Man</h1>
            </div>
            <div className="overflow-x-auto text-xl">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Number Of Parcel Delivered</th>
                            <th>Average Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deliveredCounts.map((deliver, index) =>
                                <tr key={deliver._id}>
                                    <th>{index + 1}</th>
                                    <td>{deliver.name}</td>
                                    <td>{deliver.phoneNumber}</td>
                                    <td>{deliver.deliveredCount}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default AllDeliveryMan;