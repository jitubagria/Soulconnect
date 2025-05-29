import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosPrivate = useAxiosPrivate();

    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const { refetch, isPending } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axiosPrivate.get("/users");
            setUsers(data);
            return data;
        }
    });

    const handleMakePremium = async (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make premium!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPrivate.put(`/users/make-premium/${email}`).then((res) => {
                    console.log(res.data);
                    Swal.fire({
                        title: "Done!",
                        icon: "success"
                    });
                    refetch();
                }).catch((error) => {
                    console.error(error);
                });
            }
        });
    };

    const handleMakeAdmin = async (email) => {
        Swal.fire({
            title: "Are you sure to make admin?",
            text: "You won't be able to revert this!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axiosPrivate.put(`/users/make-admin/${email}`);
                    console.log(data);
                    refetch();
                } catch (error) {
                    console.error(error);
                }
                Swal.fire({
                    title: "Confirmed!",
                    icon: "success"
                });
            }
        });

    };

    if (isPending) return <div className="h-screen flex justify-center items-center">
        <PuffLoader color="#fa005d" size={80} speedMultiplier={2} />
    </div>

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-dark dark:text-white shadow-lg rounded-lg overflow-auto">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Users</h1>
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by name or email"
                    className="px-4 py-2 dark:bg-dark border rounded-lg w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Users Table */}
            {filteredUsers.length > 0 ? (
                <table className="min-w-full bg-gray-100 dark:bg-dark dark:text-white rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-left dark:bg-dark dark:text-white text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6">ID</th>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Role</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {filteredUsers.map((user, id) => (
                            <tr key={id} className="border-b dark:text-white border-gray-200">
                                <td className="py-3 px-6">{id + 1}</td>
                                <td className="py-3 px-6">{user.name}</td>
                                <td className="py-3 px-6">{user.email}</td>
                                <td className="py-3 px-6">{user.role || "user"}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex justify-center items-center space-x-4">
                                        <button
                                            onClick={() => handleMakePremium(user.email)}
                                            className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${user.isPremium === "premium" ? "cursor-not-allowed text-slate-900 bg-slate-400 hover:bg-slate-500" : ""}`} disabled={user.isPremium === "premium"}
                                        >
                                            {user?.isPremium === "premium" ? "Already Premium" : "Make Premium"}
                                        </button>
                                        <button
                                            className={`px-4 py-2 bg-primary text-white rounded hover:bg-darkPrimary ${user.role === "admin" ? "cursor-not-allowed text-slate-900 bg-slate-400 hover:bg-slate-500" : ""}`}
                                            onClick={() => handleMakeAdmin(user.email)}
                                            disabled={user.role === "admin"}
                                        >
                                            {
                                                user.role === "admin" ? "Already Admin" : "Make Admin"
                                            }
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-500 mt-4">No users found.</p>
            )}
        </div>
    );
};

export default ManageUsers;
