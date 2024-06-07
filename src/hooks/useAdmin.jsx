import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: role } = useQuery({
        queryKey: [user?.email, 'role'],
        queryFn: async () => {
            const res = await axiosSecure.get(`users/role/${user.email}`)
            console.log(res.data);
            return res.data?.role
        }
    })
    return [role]
};

export default useAdmin;