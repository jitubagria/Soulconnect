import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const FavouriteBiodata = () => {
    const axiosPrivate = useAxiosPrivate();
    const auth = useAuth();

    const { data: favouritesBiodata, isLoading, error, refetch } = useQuery({
        queryKey: ["favourites"],
        queryFn: async () => {
            try {
                const result = await axiosPrivate.get(`/favourites/${auth.email}`);
                return result.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    });

    if (isLoading) {
        return <p className="text-center mt-6 text-gray-500">Loading...</p>;
    }

    if (error) {
        return (
            <p className="text-center mt-6 text-red-500">
                Something went wrong. Please try again later.
            </p>
        );
    }
    const handleDelete = async (biodataId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const deleteData = {
                    biodataId,
                    authEmail: auth.email
                }
                try {
                    const result = await axiosPrivate.post("/deleteFavourites", deleteData);
                    if (result.data.acknowledged) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Delete Success!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch()
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    return (
        <div className="p-4 md:p-8 dark:bg-dark dark:text-white">
            {/* Header */}
            <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
                My Favourite Biodatas
            </h1>

            {favouritesBiodata?.length ? (
                <div className="overflow-x-auto dark:bg-dark dark:text-white">
                    <table className="table-auto w-full border-collapse bg-white dark:bg-dark dark:text-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-dark text-left">
                                <th className="px-4 py-2 font-semibold">Name</th>
                                <th className="px-4 py-2 font-semibold">Biodata ID</th>
                                <th className="px-4 py-2 font-semibold">Permanent Address</th>
                                <th className="px-4 py-2 font-semibold">Occupation</th>
                                <th className="px-4 py-2 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favouritesBiodata.map((biodata) => (
                                <tr key={biodata.biodataId} className="border-t hover:bg-gray-50 dark:hover:bg-transparent">
                                    <td className="px-4 py-2">{biodata.name}</td>
                                    <td className="px-4 py-2">{biodata.biodataId}</td>
                                    <td className="px-4 py-2">{biodata.permanentAddress}</td>
                                    <td className="px-4 py-2">{biodata.occupation}</td>
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex gap-2">
                                            <Link to={`/biodatas/${biodata.biodataId}`} className="bg-primary text-white px-4 py-1 rounded-md hover:bg-red-600 transition">
                                                View Biodata
                                            </Link>
                                            <button onClick={() => handleDelete(biodata.biodataId)} className="bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-600 transition">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="mt-6 text-center">
                    <p className="text-gray-500 italic">You have no favorite biodatas yet.</p>
                </div>
            )}
        </div>
    );
};

export default FavouriteBiodata;
