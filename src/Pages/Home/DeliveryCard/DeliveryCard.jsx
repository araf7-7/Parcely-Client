import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Cards from "./Cards";

const DeliveryCard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['usersDelivery'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/u/delivery`);
            return data;
        },
    });

    console.log(users);

    return (
        <>
            <div>
                <h1 className="text-5xl font-abc mt-32 mb-5 text-center">Top Delivery Man</h1>
            </div>
            <div className="container mb-32 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-3">
                {users?.slice(1, 4).map(user => (
                    <Cards key={user?._id} user={user} />
                ))}
            </div>
        </>
    );
};

export default DeliveryCard;
