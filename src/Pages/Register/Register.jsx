
import { useForm } from 'react-hook-form';

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import RegImg from './register.json'
import useAxiosPublic from '../../hooks/useAxiosPublic';






const Register = () => {
    const axiosPublic = useAxiosPublic()
    const { googleLogin } = useAuth()
    const { createUser, user, updateUserProfile, saveUser } = useAuth();
    const navigate = useNavigate()
    useEffect(() => {
        if (user?.photoURL) navigate("/")
    }, [navigate, user]
    )
    const location = useLocation()
    const from = location?.state || "/"
    const {
        register, handleSubmit, formState: { errors },
    } = useForm()

    const onSubmit = data => {
        const { email, password, FullName, image, phoneNumber } = data
        const capital = /[A-Z]/;
        const lower = /[a-z]/;

        if (password.length < 6) {
            return toast.error("Password Should Be 6 Character", {
                description: "Password Should Be 6 Character"
            })
        }
        if (!lower.test(password)) {
            return toast.error("Please use a lower in your password", {
                description: "Please use a lower in your password"
            })
        }
        if (!capital.test(password)) {
            return toast.error("Please use a capital in your password", {
                description: "Please use a capital in your password"
            })
        }
        createUser(email, password)
            .then(() => {
                updateUserProfile(FullName, image)
                    .then(() => {
                        const userInfo = {
                            name: FullName,
                            email: email,
                        }

                        axiosPublic.put('/users', userInfo)
                            .then(res => {
                                console.log(res);
                                if (res.data._id) {
                                    console.log('user added to database');
                                    toast.success("Successfully Registered")
                                    navigate(from)
                                }
                            })


                    })

            })

            .catch(() => toast.error("Please Check Your Email"))
            saveUser({ FullName,  phoneNumber, email, role: "User" })
    }
    
    const handleSocialLogin = socialProvider => {
        socialProvider().then(result => {
            if (result.user) {
                toast.success("Successfully Logged In")
                navigate(from)
            }
        })

    }

    return (
        <>
            <div className='flex container mx-auto gap-10 my-3 bg-sky-100 px-4 rounded-lg'>
                <div className=" flex-1 w-full mx-auto my-10 max-w-md p-8 space-y-3 rounded-xl  dark:text-gray-800">
                    <Helmet>
                        <title>Register</title>
                    </Helmet>
                    <h1 className="text-2xl font-bold text-center">Register</h1>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate="" action="" className="space-y-6">
                        <div className="space-y-1 text-sm">
                            <label htmlFor="FullName" className="block dark:text-gray-600">Full Name</label>
                            <input {...register("FullName", { required: true })} type="text" name="FullName" id="FullName" placeholder="Full Name" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-yellow-500" />
                            {errors.FullName && <span className='text-red-600'>This field is required</span>}
                        </div>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="email" className="block dark:text-gray-600">Email</label>
                            <input {...register("email", { required: true })} type="email" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-yellow-500" />
                            {errors.email && <span className='text-red-600'>This field is required</span>}
                        </div>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="number" className="block dark:text-gray-600">Email</label>
                            <input {...register("phoneNumber", { required: true })} type="number" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-yellow-500" />
                            {errors.phoneNumber && <span className='text-red-600'>This field is required</span>}
                        </div>

                        <div className="space-y-1 text-sm">
                            <label htmlFor="img" className="block dark:text-gray-600">Image URL</label>
                            <input {...register("image")} type="text" name="image" id="img" placeholder="Image Url" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-yellow-500" />
                        </div>

                        <div className="space-y-1 text-sm">
                            <label htmlFor="password" className="block dark:text-gray-600">Password</label>
                            <input {...register("password", { required: true, })} type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-yellow-500" />
                            {errors.password && <span className='text-red-600'>This field is required</span>}
                        </div>

                        {/* <select {...register("role", { required: true })} className="select select-bordered border-black w-full max-w-xs">
                            <option disabled selected>Pick A Role</option>
                            <option value="User">User</option>
                            <option value="Delivery Man">Delivery Man</option>
                            {errors.role && <span className='text-red-600'>This field is required</span>}
                        </select> */}

                        <button className="block btn hover:bg-sky-300 w-full p-3 text-center  text-white rounded-lg bg-sky-500">Sign Up</button>
                    </form>
                    <div className="flex flex-col items-center">
                        <button onClick={() => handleSocialLogin(googleLogin)} className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3  bg-sky-500 hover:bg-sky-300 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                            <div className="bg-white  p-2 rounded-full">
                                <svg className="w-4" viewBox="0 0 533.5 544.3">
                                    <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                                    <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                                    <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                                    <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
                                </svg>
                            </div>
                            <span className="ml-4">Sign In with Google</span>
                        </button>
                    </div>
                </div>
                <div className="flex-auto  justify-center my-auto  text-center hidden lg:flex">
                    <Lottie animationData={RegImg} />
                </div>

            </div>


        </>
    );
};

export default Register;
