import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import { FiStar } from "react-icons/fi";
import { MdPayment } from "react-icons/md";

const MyParcel = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: parcel = [], refetch } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel/${user.email}`);
            return res.data;
        }
    });

    const handleDeleteParcel = (parcels) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcel/${parcels._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // Format: dd/mm/yyyy
    };

    return (
        <div className="m-5">
            <div>
                <h1 className="text-4xl my-10 text-center "> My Parcels </h1>
            </div>
            {parcel.length > 0 ? (
                <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-xs">
                            <colgroup>
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col className="w-24" />
                            </colgroup>
                            <thead className="dark:bg-gray-300">
                                <tr className="text-left">
                                    <th className="p-3">Parcel type</th>
                                    <th className="p-3">Requested Delivery Date</th>
                                    <th className="p-3">Approximate Delivery Date</th>
                                    <th className="p-3">Booking Date</th>
                                    <th className="p-3">Delivery Men ID</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Delete</th>
                                    <th className="p-3">Update</th>
                                    <th className="p-3">Review</th>
                                    <th className="p-3">Pay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parcel.map((parcel) => (
                                    <tr key={parcel._id}>
                                        <td className="p-3 uppercase">{parcel.parcelType}</td>
                                        <td className="p-3">{formatDate(parcel.deliveryDate)}</td>
                                        <td className="p-3">{formatDate(parcel.approximateDate)}</td>
                                        <td className="p-3">{parcel.bookingDate}</td>
                                        <td className="p-3">{parcel.deliveryManId}</td>
                                        <td className="p-3 ml-4">
                                            <span className="font-bold rounded-md">{parcel.status}</span>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteParcel(parcel)} disabled={parcel.status === 'On The Way'} className="btn text-white bg-red-600">
                                                <RiDeleteBin2Fill />
                                            </button>
                                        </td>
                                        <td>
                                            <Link to={`/dashboard/updateParcel/${parcel._id}`}>
                                                <button className={`btn ml-2 ${parcel.status === 'On The Way' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'}`} disabled={parcel.status === 'On The Way'}>
                                                    <GrUpdate />
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                disabled={['Cancelled', 'pending', 'On The Way'].includes(parcel.status)}
                                                className="btn ml-2 bg-yellow-400"><FiStar /></button>
                                        </td>
                                        <td>
                                            <Link to={`/dashboard/payment/${parcel._id}`}>
                                                <button
                                                    disabled={['Cancelled', 'pending', 'On The Way'].includes(parcel.status)}
                                                    className="btn ml-2 bg-orange-500"
                                                >
                                                    <MdPayment />
                                                </button>
                                            </Link>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="">
                    <h1 className="text-4xl mt-10 mb-10 font-reddit text-center">There Is No Parcel That You Booked</h1>
                    <img className="w-[500px] flex items-center justify-center container mx-auto" src="https://www.nuwire.co/img/undraw_cost.svg" alt="No Parcel" />
                </div>
            )}
        </div>
    );
};

export default MyParcel;
