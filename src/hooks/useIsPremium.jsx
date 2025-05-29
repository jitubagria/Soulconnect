import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useIsPremium = () => {
    const auth = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const { data: isPremium, isPending } = useQuery({
        queryKey: ["isPremium", auth?.email],
        queryFn: async () => {
            try {
                const result = await axiosPrivate.get(`/users/isPremium/${auth?.email}`)
                return result.data;
            } catch (error) {
                console.error(error.message);
            }
        }
    })
    return { isPremium, isPending }
};

export default useIsPremium;