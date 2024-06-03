import { Helmet } from "react-helmet";
import UseAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


const MyProfile = () => {
    const { user } = UseAuth()
    const axiosPublic = useAxiosPublic()
    console.log(user);
    const { data: User = [], } = useQuery({
        queryKey: ['Users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`)
            return res.data
        }
    })
    console.log(User);
    return (
        <div className='flex justify-center items-center h-screen'>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className='bg-white shadow-lg rounded-2xl w-3/5'>
                <img
                    alt='profile'
                    src='https://i.ibb.co/rkjKsJT/abstract-sky-blue-paper-texture-backgrounds-with-dark-blue-fibers-available-for-text-and-quotes-suit.jpg'
                    className='w-full mb-4 rounded-t-lg h-36'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a className='relative block'>
                        <img
                            alt='profile'
                            src={user.photoURL}
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />
                    </a>

                    <p className='p-2 px-4 text-xs text-white bg-sky-400 rounded-full'>
                        {User.role}
                    </p>
                    <p className='mt-2 text-xl font-medium text-gray-800 '>
                        User Id: {user.uid}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                            <p className='flex flex-col'>
                                Name
                                <span className='font-bold text-black '>
                                    {user.displayName}
                                </span>
                            </p>
                            <p className='flex flex-col'>
                                Email
                                <span className='font-bold text-black '>{user.email}</span>
                            </p>

                            <div>
                                <Link to='/dashboard/updateUser'>
                                    <button className='bg-sky-400 btn px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-sky-300 block mb-1'>
                                        Update Profile
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;