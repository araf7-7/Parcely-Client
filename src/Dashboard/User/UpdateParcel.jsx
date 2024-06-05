import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import UseAuth from "../../hooks/useAuth";




const UpdateParcel = () => {
    const { phoneNumber, parcelType, _id, Weight, receiverName, receiverNo, address, latitude, longitude, price } = useLoaderData()

    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, watch, setValue,  } = useForm();

    const weight = watch("Weight");

    useEffect(() => {
        if (weight) {
            let price = 0;
            if (weight <= 1) {
                price = 50;
            } else if (weight <= 2) {
                price = 100;
            } else {
                price = 150; // Updated to multiply weight by 2 for weights over 2
            }
            setValue("price", price);
        }
    }, [weight, setValue]);
    const onSubmit = async (data) => {
        data.Weight = parseFloat(data.Weight);
        data.receiverNo = parseFloat(data.receiverNo);
        data.latitude = parseFloat(data.latitude);
        data.longitude = parseFloat(data.longitude);
        data.price = parseFloat(data.price)

        const menuItem = {
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            parcelType: data.parcelType,
            Weight: data.Weight,
            receiverName: data.receiverName,
            receiverNo: data.receiverNo,
            address: data.address,
            latitude: data.latitude,
            longitude: data.longitude,
            price: data.price,

        }
        try {
            const parcelRes = await axiosSecure.patch(`/parcel/${_id}`, menuItem);
            if (parcelRes.data.modifiedCount > 0) {
                // reset()
                toast.success('Parcel Updated  Successfully');
            } else {
                toast.error('Failed to Update Parcel');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while Updating the parcel');
        }
        // Parse numeric values

    };


    return (
        <div>
            <div>
                <h1 className="text-center mt-5 font-abc text-4xl" >Update A Parcel</h1>
            </div>
            <div className="my-10 bg-sky-100 p-20 rounded-2xl mx-10">
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="name"
                            defaultValue={user?.displayName}
                            readOnly
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            {...register("name")}
                        />
                        <label
                            htmlFor="floating_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Name
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            defaultValue={user?.email}
                            readOnly
                            name="floating_email"
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            {...register("email")}
                        />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="number"
                            // Allows for float values
                            defaultValue={phoneNumber}
                            readOnly
                            {...register("phoneNumber", { valueAsNumber: true })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_phone"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Phone Number
                        </label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="parcelType"
                                id="parcelType"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                defaultValue={parcelType}
                                required
                                {...register("parcelType")}
                            />
                            <label
                                htmlFor="floating_parcelType"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Parcel Type
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="number"
                                // Allows for float values
                                name="Weight"
                                id="Weight"
                                defaultValue={Weight}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                {...register("Weight", { valueAsNumber: true })}
                            />
                            <label
                                htmlFor="floating_weight"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Parcel Weight
                            </label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="receiverName"
                                id="receiverName"
                                defaultValue={receiverName}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                {...register("receiverName")}
                            />
                            <label
                                htmlFor="floating_receiverName"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Receiver Name
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="number"
                                // Allows for float values
                                name="receiverNo"
                                defaultValue={receiverNo}
                                id="receiverNo"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                {...register("receiverNo", { valueAsNumber: true })}
                            />
                            <label
                                htmlFor="floating_receiverNo"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Receiver No.
                            </label>
                        </div>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            id="address"
                            defaultValue={address}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            {...register("address")}
                        />
                        <label
                            htmlFor="floating_address"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Address
                        </label>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="number"
                                defaultValue={latitude}
                                step="0.01"// Allows for float values
                                name="latitude"
                                id="latitude"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                {...register("latitude", { valueAsNumber: true })}
                            />
                            <label
                                htmlFor="floating_latitude"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Delivery Address Latitude
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="number"
                                step="0.01" // Allows for float values
                                name="longitude"
                                defaultValue={longitude}
                                id="longitude"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                {...register("longitude", { valueAsNumber: true })}
                            />
                            <label
                                htmlFor="floating_longitude"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Delivery Address Longitude
                            </label>
                        </div>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="number"
                            defaultValue={price}
                            // Allows for float values
                            name="price"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            readOnly
                            {...register("price", { valueAsNumber: true })}
                        />
                        <label
                            htmlFor="floating_price"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Price
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="text-white btn btn-block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateParcel;