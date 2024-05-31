
import { useForm } from 'react-hook-form';
// import { updateProfile } from "firebase/auth"
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
// import { toast } from 'sonner';
import UseAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
// import UseAuth from './UseAuth';




const Register = () => {

    const { createUser, user, updateUserProfile } = UseAuth();
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
        const { email, password, FullName, image } = data
        console.log(FullName, image)
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

                        // setRefetch(!refetch)
                        toast.success("Register Done")
                        navigate(from)
                    })



                //     if (result.user) {
                //         updateProfile(result.user, {
                //             displayName: FullName, photoURL: image

                //         }).then(() => {
                //             setRefetch(!refetch)
                //             navigate(from)
                //         })

                //     }
                // })
            })
            .catch(() => toast.error("Please Check Your Email"))
    }

    return (
        <>
            <div className='flex container mx-auto gap-10 my-3 bg-indigo-100 px-4 rounded-lg'>
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
                            <label htmlFor="img" className="block dark:text-gray-600">Image URL</label>
                            <input {...register("image")} type="text" name="image" id="img" placeholder="Image Url" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-yellow-500" />
                        </div>

                        <div className="space-y-1 text-sm">
                            <label htmlFor="password" className="block dark:text-gray-600">Password</label>
                            <input {...register("password", { required: true, })} type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-yellow-500" />
                            {errors.password && <span className='text-red-600'>This field is required</span>}
                        </div>

                        <button className="block w-full p-3 text-center  dark:text-gray-50 rounded-lg dark:bg-indigo-500">Sign Up</button>
                    </form>
                </div>
                <div className="flex-auto  justify-center my-auto  text-center hidden lg:flex">
                    
                </div>

            </div>
           
        </>
    );
};

export default Register;
