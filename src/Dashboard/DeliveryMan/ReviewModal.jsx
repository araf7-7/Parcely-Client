import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Helmet } from 'react-helmet';
// import useAuth from '../../../useAuth/useAuth';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const ReviewModal = () => {
    const { user } = useAuth();
    const { register, setValue, reset } = useForm();
    const navigate = useNavigate()
    // Fetch parcel data using useLoaderData
    const parcel = useLoaderData();
    const { deliveryManId } = parcel || {};

    // Pre-fill user data and deliveryManId
    useEffect(() => {
        setValue('name', user.displayName);
        setValue('image', user.photoURL);
        if (deliveryManId) {
            setValue('deliveryMenId', deliveryManId);
        }
    }, [setValue, user, deliveryManId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;
        const rating = form.rating.value;
        const feedback = form.feedback.value;
        const deliveryMenId = form.deliveryMenId.value;
        const givingReview = {
            name,
            image,
            rating,
            feedback,
            deliveryMenId,
        };

        console.log(givingReview);
        // Send data to the server
        fetch('https://assignment-12-server-ochre-eta.vercel.app/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(givingReview)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    reset();
                    toast.success('Your review has been submitted')
                    navigate('/dashboard/myParcel')
                }
            });
    };

    return (
        <div>
            <Helmet>
                <title>Giving Review</title>
            </Helmet>
            <div>
                <h1 className="text-center mt-5 font-abc text-4xl mb-10" >Review A Delivery Man</h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto p-4 shadow-md rounded-lg bg-sky-200">
                <div className="flex  gap-5">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            name='name'
                            type="text"
                            {...register('name')}
                            readOnly
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                </div>

                <div className=" item-center gap-5">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                        <img
                            src={user.photoURL}
                            alt="User"
                            className="w-28 h-28 rounded-full"
                        />
                        <input
                            type="hidden"
                            name='image'
                            {...register('image')}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
                        <input
                            name='rating'
                            type="number"
                            {...register('rating', { required: true })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Feedback</label>
                    <input
                        name='feedback'
                        type="text"
                        {...register('feedback', { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Delivery Men Id</label>
                    <input
                        name='deliveryMenId'
                        defaultValue={deliveryManId}
                        type="text"
                        {...register('deliveryMenId', { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewModal;
