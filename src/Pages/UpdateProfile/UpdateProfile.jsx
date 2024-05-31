// import useAuth from "../useAuth/useAuth";
// import {getAuth, updateProfile} from "firebase/auth";
import { Helmet } from 'react-helmet';
// import {toast} from "sonner";
import UseAuth from '../../hooks/useAuth';
import { getAuth, updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';

// export default UpdateProfile;

const UpdateProfile = () => {
    const { user, setUser } = UseAuth()

    const handleUpdate = async (e) => {
        e.preventDefault()
        const form = e.target
        const userName = form.name.value
        const image = form.image.value

        const toastId = toast.loading("Please wait")
        try {
            const auth = getAuth()
            await updateProfile(auth.currentUser, {
                photoURL: image,
                displayName: userName
            })
            // to show the updated profile img
            let userReplica = {
                ...user
            }
            userReplica.displayName = userName
            userReplica.photoURL = image
            setUser(userReplica)

            toast.dismiss(toastId)
            toast.success("Name and Image updated")
        } catch {
            toast.dismiss(toastId)
            toast.success("Name and Image updated")

        }
    }

    return (
        <div className="">
            <Helmet>
                <title>Update Profile</title>
            </Helmet>
            <div
                className="w-full max-w-md p-8 border-2 space-y-5 rounded-xl dark:text-black  mt-24 mx-auto ">
                <h1 className="text-3xl font-bold text-center">Update Now!</h1>
                <form onSubmit={handleUpdate} className="space-y-8 pt-5 ">

                    <div>
                        <label htmlFor="username" className="block dark:text-gray-600">
                            Name
                        </label>
                        <input
                            defaultValue={user
                                ?.displayName}
                            type="name"
                            name="name"
                            id="name"
                            placeholder="Update your name"
                            className="w-full outline-none px-3 py-2 border-b-2 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    <div>
                        <label htmlFor="username" className="block dark:text-gray-600">
                            Email
                        </label>
                        <input
                            defaultValue={user
                                ?.email}
                            readOnly="readOnly"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="leroy@jenkins.com"
                            className="w-full outline-none px-3 py-2 border-b-2 rounded-md dark:border-gray-300 dark:bg-gray-300 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    <div >
                        <label htmlFor="username" className="block dark:text-gray-600">
                            Image
                        </label>
                        <input
                            defaultValue={user
                                ?.photoURL}
                            type="text"
                            name="image"
                            id="image"
                            placeholder="Image URL"
                            className="w-full outline-none border-b-2 px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button
                                type="submit"
                                className="w-full px-8 py-3 rounded-full bg-gradient-to-r bg-yellow-800 font-semibold border-2 dark:text-gray-50">Update Profile</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;