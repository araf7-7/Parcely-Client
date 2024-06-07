import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BsBoxFill } from "react-icons/bs";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const AllParcel = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [startDate, setStartDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [selectedParcelId, setSelectedParcelId] = useState(null);

    const { data: parcels = [], refetch: refetchParcels } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel`);
            return res.data;
        },
    });

    const { data: delivery = [] } = useQuery({
        queryKey: ['delivery'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/u/delivery`);
            return data;
        },
    });

    const openModal = (parcelId) => {
        setSelectedParcelId(parcelId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedParcelId(null);
    };

    const selectedParcel = parcels.find(parcel => parcel._id === selectedParcelId);

    const handleAddDeliveryMan = async (event) => {
        event.preventDefault();
        const form = event.target;
        const deliveryManId = form.deliveryMan.value;
        const approximateDate = startDate.toISOString();
        const addDeliveryMan = { deliveryManId, approximateDate, status: 'On The Way' };

        if (!selectedParcelId) {
            Swal.fire({
                icon: 'error',
                title: 'No parcel selected',
                text: 'Please select a parcel to assign.',
            });
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/parcel/u/${selectedParcelId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addDeliveryMan)
            });

            const data = await res.json();
            if (res.ok) {
                toast.success('Delivery Man Assigned Successfully');
                queryClient.invalidateQueries('parcels');
                closeModal();
                refetchParcels();
            } else {
                throw new Error(data.message || 'Failed to update parcel');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Failed to update parcel',
            });
        }
    };

    return (
        <div className="mx-10">
            <Helmet>
                    <title>All Parcel</title>
                </Helmet>
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
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id} className="bg-sky-200">
                                <th>{index + 1}</th>
                                <td>{parcel.name}</td>
                                <td>{parcel.phoneNumber}</td>
                                <td>{parcel.bookingDate}</td>
                                <td>{parcel.deliveryDate}</td>
                                <td>{parcel.price}</td>
                                <td>
                                    <span className="bg-green-300 p-2 rounded-full font-medium">
                                        {parcel.status}
                                    </span>
                                </td>
                                <td>
                                    <button onClick={() => openModal(parcel._id)} className="btn p-1 bg-blue-500 border-0">
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="w-full h-full fixed top-0 left-0 z-[999999] bg-[#3e3e3e9c] flex justify-center items-center">
                    <div className="w-auto p-4 rounded-lg shadow-slate-950 shadow-2xl bg-sky-300">
                        <button onClick={closeModal} className="btn btn-sm btn-circle bg-sky-500 border-0 text-white absolute right-2 top-2">
                            ✕
                        </button>
                        {selectedParcel && (
                            <div className="mb-4">
                                <h2 className="text-xl font-bold">Parcel Details</h2>
                                <p><strong>Name:</strong> {selectedParcel.name}</p>
                                <p><strong>Delivery Date:</strong> {selectedParcel.deliveryDate}</p>
                                <p><strong>Price:</strong> {selectedParcel.price}</p>
                            </div>
                        )}
                        <form onSubmit={handleAddDeliveryMan} className="max-w-sm mx-auto">
                            <label htmlFor="deliveryMan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Select an option
                            </label>
                            <select name="deliveryMan" id="deliveryMan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>Choose a Delivery Man</option>
                                {delivery.map((man) => (
                                    <option key={man._id} value={man._id}>
                                        {man.name}
                                    </option>
                                ))}
                            </select>
                            <div className="grid mt-5">
                                <label htmlFor="approxDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Select Approximate Date
                                </label>
                                <ReactDatePicker name="approxDate" className="rounded-xl border-0" selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            <button type="submit" className="btn bg-sky-400 border-0 btn-block mt-4">Assign</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllParcel;
