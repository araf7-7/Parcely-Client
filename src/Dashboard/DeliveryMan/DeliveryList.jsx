import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from './../../hooks/useAuth';


const MyDeliveryList = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); // Assuming you have a context that provides the logged-in user's info

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel/delivery/${user.email}`);
            return res.data;
        }
    });

    const handleUpdateStatus = (id, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to mark this parcel as ${status}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, mark as ${status}`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/parcel/gone/${id}`, { status })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Updated!",
                                text: `Parcel status has been updated to ${status}.`,
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    return (
        <div className="lg:m-5 m-auto">
            <div className="flex justify-between">
                <h1 className="lg:text-3xl text-xl">My Delivery List</h1>
                <h1 className="lg:text-3xl text-xl">Total Parcels: {parcels.length}</h1>
            </div>
            <table className=" shadow-md border mx-auto border-gray-100 my-6">
                <thead>
                    <tr className="bg-sky-300">
                        <th className="py-3 px-2 text-left border-b">Booked User’s Name</th>
                        <th className="py-3 px-2 text-left border-b">Receivers Name</th>
                        <th className="py-3 px-2 text-left border-b">Booked User’s Phone</th>
                        <th className="py-3 px-2 text-left border-b">Requested Delivery Date</th>
                        <th className="py-3 px-2 text-left border-b">Approximate Delivery Date</th>
                        <th className="py-3 px-2 text-left border-b">Receivers Phone Number</th>
                        <th className="py-3 px-2 text-left border-b">Receivers Address</th>
                        <th className="py-3 px-2 text-left border-b">View Location</th>
                        <th className="py-3 px-2 text-left border-b">Cancel</th>
                        <th className="py-3 px-2 text-left border-b">Deliver</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr className="hover:bg-gray-50 transition duration-300" key={index}>
                            <td className="py-4 px-2 border-b">{parcel.name}</td>
                            <td className="py-4 px-2 border-b">{parcel.receiverName}</td>
                            <td className="py-4 px-2 border-b">{parcel.phoneNumber}</td>
                            <td className="py-4 px-2 border-b">{parcel.deliveryDate}</td>
                            <td className="py-4 px-2 border-b">{parcel.approximateDate}</td>
                            <td className="py-4 px-2 border-b">{parcel.receiverPhoneNumber}</td>
                            <td className="py-4 px-2 border-b">{parcel.deliveryAddress}</td>
                            <td className="py-4 px-2 border-b">
                                <a
                                    href={parcel.location}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-sm bg-sky-400 text-white"
                                >
                                    Location
                                </a>
                            </td>
                            <td className="py-4 px-2 border-b">
                                <button 
                                    onClick={() => handleUpdateStatus(parcel._id, 'Cancelled')} 
                                    className="btn btn-sm bg-sky-400 text-white"
                                    disabled={parcel.status === 'Cancelled' || parcel.status === 'Delivered'}
                                >
                                    Cancel
                                </button>
                            </td>
                            <td className="py-4 px-2 border-b">
                                <button 
                                    onClick={() => handleUpdateStatus(parcel._id, 'Delivered')} 
                                    className="btn btn-sm bg-sky-400 text-white"
                                    disabled={parcel.status === 'Cancelled' || parcel.status === 'Delivered'}
                                >
                                    Deliver
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyDeliveryList;