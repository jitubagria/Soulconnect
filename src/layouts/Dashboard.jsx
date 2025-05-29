import { useContext } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaDatabase, FaEdit, FaHome, FaUsers } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { MdFavorite, MdGroupRemove } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import useIsAdmin from "../hooks/useIsAdmin";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
    const { user, logOutUser, setUser } = useContext(AuthContext)
    const { navigate } = useNavigate()
    const [isAdmin] = useIsAdmin()
    const handleLogout = () => {
        toast((t) => (
            <span className="flex items-center gap-4">
                Are You Sure?
                <div>
                    <button
                        onClick={() => {
                            logOutUser()
                                .then(() => {
                                    navigate("/")
                                    toast.success('Logout Success');
                                    setUser(null)
                                })
                                .catch((error) => {
                                    console.error("Error during logout:", error);
                                });
                            toast.dismiss(t.id);
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 ml-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </span>
        ));
    };
    return (
        <div className="flex flex-col md:flex-row dark:bg-dark">
            <div className="md:w-1/5 md:min-h-screen bg-white text-black dark:text-white dark:bg-dark">
                <div className="text-center"><h1 className="text-2xl pt-4 font-pacifico text-black dark:text-white">Matrimony<span className="text-primary">BD</span></h1></div>
                <div className="flex flex-col gap-2 justify-center items-center mt-4">
                    <img className="rounded-full h-16 w-16" src={user.photoURL} alt={user.displayName} />
                    <h1 className="text-xl font-bold text-black dark:text-white">{user?.displayName}</h1>
                </div>
                <div className="border-2 border-primary px-6 my-6"></div>
                <div className="">
                    {
                        isAdmin === "admin" ?
                            <ul className="flex flex-col gap-6 ml-4">
                                <li >
                                    <NavLink to="/dashboard/admin-dashboard" className="flex items-center gap-2 justify-start text-lg py-1 px-4 hover:bg-primary  hover:text-white hover:rounded hover:mr-3 transition"><RiAdminFill /> Admin Dashboard</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-users" className="flex items-center gap-2 justify-start text-lg py-1 px-4 hover:bg-primary  hover:text-white hover:rounded hover:mr-3 transition"><FaUsers ></FaUsers> Manage Users</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/approved-premium" className="flex items-center gap-2 justify-start text-lg py-1 px-4 hover:bg-primary  hover:text-white hover:rounded hover:mr-3 transition"><MdGroupRemove /> Approved Premium</NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to="/dashboard/approved-contact-request" className="flex items-center gap-2 justify-start text-lg hover:text-darkPrimary"><FaCodePullRequest /> Approved Contact Request</NavLink>
                                </li> */}
                            </ul>
                            : <ul className="flex flex-col gap-6 ml-4">
                                <li >
                                    <NavLink to="/dashboard/edit-biodata" className="flex items-center gap-2 justify-start text-lg py-1 px-4 hover:bg-primary  hover:text-white hover:rounded hover:mr-3 transition"><FaEdit /> Edit Biodata</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/view-biodata" className="flex items-center gap-2 justify-start text-lg py-1 px-4 hover:bg-primary  hover:text-white hover:rounded hover:mr-3 transition"><FaDatabase></FaDatabase> View Biodata</NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to="/dashboard/my-contact-request" className="flex items-center gap-2 justify-start text-lg hover:text-darkPrimary"><RiContactsFill /> My Contact Request</NavLink>
                                </li> */}
                                <li>
                                    <NavLink to="/dashboard/favourites-biodata" className="flex items-center gap-2 justify-start text-lg py-1 px-4 hover:bg-primary  hover:text-white hover:rounded hover:mr-3 transition"><MdFavorite /> Favourite&apos;s Biodata</NavLink>
                                </li>
                            </ul>
                    }

                </div>
                <div className="border-2 border-red-700 px-6 my-6"></div>
                <Link to="/home" className="flex mb-2 justify-start items-center gap-2 text-lg text-black dark:text-white py-1 px-4 hover:text-white ml-4 hover:bg-primary hover:rounded hover:mr-3 transition">
                    <FaHome />Home
                </Link>
                <button onClick={handleLogout} className="flex justify-center items-center gap-2 text-lg text-black dark:text-white py-1 px-4 transition ml-4 hover:scale-110 hover:text-red-700">
                    <IoLogOut />Log Out
                </button>
            </div>
            <div className="bg-[#f2f2f2] dark:bg-dark w-full p-4 text-black">
                <Outlet></Outlet>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Dashboard;