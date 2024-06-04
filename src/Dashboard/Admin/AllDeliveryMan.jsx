import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdDirectionsBike } from "react-icons/md";

const AllDeliveryMan = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/u/delivery`);
            return data;
        },
    });
    return (
        <div className="mx-10">
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
                            users.map((user, index) => <tr key={user._id} className="bg-sky-200">
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.phoneNumber}</td>
                                <td></td>
                                <td></td>
                            </tr>)
                        }

                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default AllDeliveryMan;