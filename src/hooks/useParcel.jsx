import { useQuery } from "@tanstack/react-query";


import useAxiosPublic from "./useAxiosPublic";


const useParcel = () => {

    const axiosPublic = useAxiosPublic()

    const { data: user = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users`);
            return res.data;
        },
    });
    const { refetch, data: parcel = [] } = useQuery({
        queryKey: ['parcel', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/parcel?email=${user.email}`)
            return res.data
        }
    })
    return [parcel, refetch]
};

export default useParcel;