import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UseAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { RiDeleteBin2Fill } from "react-icons/ri";

import { Link } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";


const MyParcel = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = UseAuth()
    const { data: parcel = [], refetch } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel/${user.email}`)
            return res.data
        }
    })
    const handleDeleteParcel = parcels => {
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
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
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
                                    <th className="p-3 pl-7">Status</th>
                                    <th className="p-3">Delete</th>
                                    <th className="p-3">Update</th>
                                    <th className="p-3">Review</th>
                                    <th className="p-3">Pay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parcel.map((parcel) =>
                                    <tr key={parcel._id}>

                                        <td className="p-3 uppercase">
                                            {parcel.parcelType}
                                        </td>
                                        <td className="p-3">
                                            <p>{parcel.deliveryDate}</p>
                                        </td>
                                        <td className="p-3">
                                            <p></p>
                                        </td>
                                        <td className="p-3">
                                            <p>{parcel.bookingDate}</p>
                                        </td>
                                        <td className="p-3">
                                            
                                        </td>
                                        <td className="p-3">
                                            <span className="px-3 py-1 w-30 bg-green-400 font-semibold rounded-md">
                                                <span>{parcel.status}</span>
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteParcel(parcel)} className="btn text-white bg-red-600"><RiDeleteBin2Fill></RiDeleteBin2Fill>
                                            </button>
                                        </td>
                                        <td>
                                            <Link to={`/dashboard/updateParcel/${parcel._id}`}>
                                                <button className="btn ml-2 bg-blue-600 text-white ">
                                                    <GrUpdate />
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>)
                                }

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