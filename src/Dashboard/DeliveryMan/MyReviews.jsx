// import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet';


const MyReviews = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reviews/deliveryManId/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Ensures the query runs only if the email is available
    });

    return (
        <><div>
            <Helmet>
                <title>My Reviews</title>
            </Helmet>
        </div>
            <div>
                <h1 className="text-center mt-5 font-abc text-4xl">My Reviews</h1>
            </div>
            <div className="container font-reddit mx-auto p-4">
               
                {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review) => (
                            <div key={review._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <img src={review.image} alt="" className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <p className="text-lg font-semibold"><strong>User Name:</strong> {review.name}</p>
                                    <p className="text-gray-700"><strong>Rating:</strong> {review.rating}</p>
                                    <p className="text-gray-700"><strong>User Feedback:</strong> {review.feedback}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No reviews found.</p>
                )}
            </div></>
    );
};

export default MyReviews;

