import { Helmet } from "react-helmet";
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa6";
import { useState } from "react";


const AllUser = () => {

    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users`)
            return data;
        },
    });

    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel`);
            return res.data;
        },
    });

    const handleMakeDelivery = (user) => {
        axiosSecure.patch(`/users/deliveryMan/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('User Role Updated successfully');
                }
            });
    };

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('User updated successfully');
                }
            });
    };

    const getParcelCountByUser = (email) => {
        return parcels.filter(parcel => parcel.email === email).length;
    };
    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <div>
            <div className='container mx-auto px-4 sm:px-8'>
                <Helmet>
                    <title>All Users</title>
                </Helmet>
                <div className='py-8'>
                    <div className="">
                        <h1 className="text-3xl font-abc flex gap-3">
                            <FaUser />
                            All Users: {users.length}
                        </h1>
                    </div>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal '>
                                <thead>
                                    <tr>
                                        <th scope='col' className='px-5  py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-base font-abc uppercase font-normal'>
                                            Name
                                        </th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-base font-abc uppercase font-normal'>
                                            Email
                                        </th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-base font-abc uppercase font-normal'>
                                            Phone Number
                                        </th>
                                        <th scope='col' className='px-2 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-base font-abc uppercase font-normal'>
                                            Parcel Booked
                                        </th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-base font-abc uppercase font-normal'>
                                            Role
                                        </th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-base font-abc uppercase font-normal'>
                                            Make Admin
                                        </th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-base font-abc uppercase font-normal'>
                                            Make Delivery Man
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user) => (
                                        <tr key={user._id}>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-base font-abc'>
                                                <p className='text-gray-900 whitespace-no-wrap'>{user?.name}</p>
                                            </td>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-base font-abc'>
                                                <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
                                            </td>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-base font-abc'>
                                                <p className='text-gray-900 whitespace-no-wrap'>{user?.phoneNumber}</p>
                                            </td>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-base font-abc'>
                                                <p className='text-gray-900 whitespace-no-wrap'>{getParcelCountByUser(user?.email)}</p>
                                            </td>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-base font-abc'>
                                                <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
                                            </td>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-base font-abc'>
                                                {user.role === 'Admin' ? 'Admin' : (
                                                    <button onClick={() => handleMakeAdmin(user)} className='bg-green-400 p-3 rounded-full font-abc'>
                                                        Admin
                                                    </button>
                                                )}
                                            </td>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-base font-abc'>
                                                {user.role === 'Delivery Man' ? 'Delivery Man' : (
                                                    <button onClick={() => handleMakeDelivery(user)} className='bg-blue-400 p-3 rounded-full font-abc'>
                                                        Delivery Man
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center mt-5">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handleClick(index + 1)}
                                    className={`btn mx-1 hover:bg-[black] hover:text-white ${currentPage === index + 1 ? 'btn-active hover:bg-[#D1A054] hover:text-white' : ''}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUser;
