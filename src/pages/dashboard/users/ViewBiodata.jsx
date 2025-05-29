import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ViewBiodata = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const { data: biodata, refetch } = useQuery({
        queryKey: ["biodata", auth.email],
        queryFn: async () => {
            const { data } = await axiosPrivate.get(`/biodata/${auth.email}`);
            return data;
        }
    })

    const handleBiodataPremium = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make premium!"
        }).then((result) => {
            if (result.isConfirmed) {
                const email = biodata.email;
                axiosPrivate.post("/biodata/premium-request", { email })
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }).catch(error => {
                        console.log(error);
                    })
            }
        });
    }
    return (
        <div className="max-w-7xl mx-auto p-6 dark:bg-dark dark:text-white bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Biodata</h1>
                <button
                    onClick={() => navigate("/dashboard/edit-biodata")}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-darkPrimary"
                >
                    Edit Biodata
                </button>
            </div>

            <div className="bg-white dark:bg-dark p-6 shadow rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Biodata Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img className="" src={biodata?.profileImage} alt={biodata?.name} />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                        <p>
                            <strong>Biodata ID:</strong> {biodata?.biodataId || "N/A"}
                        </p>
                        <p>
                            <strong>Name:</strong> {biodata?.name || "N/A"}
                        </p>
                        <p>
                            <strong>Date of Birth:</strong> {biodata?.dob || "N/A"}
                        </p>
                        <p>
                            <strong>Age:</strong> {biodata?.age || "N/A"}
                        </p>
                        <p>
                            <strong>Height:</strong> {biodata?.height || "N/A"} cm
                        </p>
                        <p>
                            <strong>Weight:</strong> {biodata?.weight || "N/A"} kg
                        </p>
                        <p>
                            <strong>Occupation:</strong> {biodata?.occupation || "N/A"}
                        </p>
                        <p>
                            <strong>Race:</strong> {biodata?.race || "N/A"}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Biodata Type</h3>
                        <p>
                            <strong>Type:</strong> {biodata?.biodataType || "N/A"}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                        <p>
                            <strong>Email:</strong> {biodata?.email || "N/A"}
                        </p>
                        <p>
                            <strong>Mobile Number:</strong> {biodata?.mobileNumber || "N/A"}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Family Details</h3>
                        <p>
                            <strong>Father&apos;s Name:</strong> {biodata?.fathersName || "N/A"}
                        </p>
                        <p>
                            <strong>Mother&apos;s Name:</strong> {biodata?.mothersName || "N/A"}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Location Details</h3>
                        <p>
                            <strong>Permanent Division:</strong>{" "}
                            {biodata?.permanentDivision || "N/A"}
                        </p>
                        <p>
                            <strong>Present Division:</strong>{" "}
                            {biodata?.presentDivision || "N/A"}
                        </p>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-lg font-semibold mb-2">Partner Preferences</h3>
                        <p>
                            <strong>Preferred Age:</strong> {biodata?.partnerAge || "N/A"}
                        </p>
                        <p>
                            <strong>Preferred Height:</strong>{" "}
                            {biodata?.partnerHeight || "N/A"} cm
                        </p>
                        <p>
                            <strong>Preferred Weight:</strong>{" "}
                            {biodata?.partnerWeight || "N/A"} kg
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions Section */}
            <div className="mt-6 flex justify-between items-center">
                {/* <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => navigate("/dashboard/delete-biodata")}
                >
                    Delete Biodata
                </button> */}
                <button
                    className={`px-4 py-2 bg-primary text-white rounded hover:bg-darkPrimary ${biodata?.premiumStatus === "pending" && "cursor-not-allowed bg-gray-400 hover:bg-gray-500"} ${biodata?.premiumStatus === "premium" && "cursor-not-allowed"}`}
                    onClick={handleBiodataPremium}
                    disabled={biodata?.premiumStatus === "pending" || biodata?.premiumStatus === "premium"}
                >
                    {!biodata?.premiumStatus && "Make Premium" || biodata?.premiumStatus === "pending" && "Pending Approval" || biodata?.premiumStatus === "premium" && "Already Premium"}
                </button>
            </div>
        </div>
    );
};

export default ViewBiodata;