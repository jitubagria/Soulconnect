import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import Loading from "../../../components/shared/Loading";

const ApprovedPremium = () => {
    // Placeholder for the premium requests data
    const axiosPrivate = useAxiosPrivate();
    const { data: premiumRequests, refetch, isLoading } = useQuery({
        queryKey: ["premiumRequests"],
        queryFn: async () => {
            const { data } = await axiosPrivate.get("/premiumRequests");
            return data;
        },
    });
    const handleApprove = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPrivate.post(`/approvePremium/${id}`)
                    .then(() => {
                        refetch();
                        Swal.fire({
                            title: "Approved!",
                            icon: "success"
                        });
                    })
                    .catch(() => {
                        Swal.fire("Error!", "An error occurred while approving the request.", "error");
                    });
            }
        });
    }
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="max-w-6xl overflow-x-auto mx-auto p-6 bg-white dark:bg-dark dark:text-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Approved Premium Requests</h1>

            {/* Table Layout */}
            <table className="min-w-full bg-gray-100 dark:bg-dark dark:text-white rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200 dark:bg-dark dark:text-white text-left text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6">Name</th>
                        <th className="py-3 px-6">Email</th>
                        <th className="py-3 px-6">Biodata ID</th>
                        <th className="py-3 px-6">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    {premiumRequests?.map((request) => (
                        <tr key={request.biodataId} className="border-b border-gray-200 dark:text-gray-300">
                            <td className="py-3 px-6">{request.name || "N/A"}</td>
                            <td className="py-3 px-6">{request.email || "N/A"}</td>
                            <td className="py-3 px-6">{request.biodataId}</td>
                            <td className="py-3 px-6">
                                <button
                                    className="px-4 py-2 bg-primary text-white rounded hover:bg-darkPrimary"
                                    onClick={() => handleApprove(request.biodataId)}
                                >
                                    Approve
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* No Requests Placeholder */}
            {premiumRequests?.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No pending premium requests found.</p>
            )}
        </div>
    );
};

export default ApprovedPremium;
