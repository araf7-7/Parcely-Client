import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BsBoxFill } from "react-icons/bs";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";


const AllParcel = () => {
    const axiosSecure = useAxiosSecure()
    const [startDate, setStartDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel`);
            return res.data;
        },
    });
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div className="mx-10">
            <div>
                <h1 className="text-4xl my-10 flex gap-2"><BsBoxFill /> All Parcels </h1>
            </div>
            <div className="overflow-x-auto text-xl">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Booking Date</th>
                            <th>Requested Delivery Date</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id} className="bg-sky-200">
                                <th>{index + 1}</th>
                                <td>{parcel.name}</td>
                                <td>{parcel.phoneNumber}</td>
                                <td>{parcel.bookingDate}</td>
                                <td>{parcel.deliveryDate}</td>
                                <td>{parcel.price}</td>
                                <td><span className="bg-green-300 p-2 rounded-full font-medium">{parcel.status}</span></td>
                                <td><button onClick={openModal} className="btn p-1 bg-blue-500 border-0">Manage</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>

            </div>
            {
                showModal &&
                <div className="w-full h-full fixed top-0 left-0 z-[999999] bg-[#3e3e3e9c] flex justify-center items-center">
                    <form>
                        <div className=" w-auto  p-4 rounded-lg shadow-slate-950 shadow-2xl  bg-sky-300">
                            <form method="dialog">
                                <button onClick={closeModal} className="btn btn-sm btn-circle bg-sky-500 border-0 text-white absolute right-2 top-2">✕</button>
                            </form>

                            <form className="max-w-sm mx-auto">
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                <select id="deliveryMan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a Delivery Man</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="FR">France</option>
                                    <option value="DE">Germany</option>
                                </select>
                            </form>
                            <div className="grid mt-5">
                            <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Approximate Date</label>
                            <ReactDatePicker className="rounded-xl border-0" selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            <button className="btn bg-sky-400 border-0 btn-block mt-4">Assign</button>
                        </div>
                        
                    </form>
                </div>
            }
        </div>
    );
};

export default AllParcel;