import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import useIsAdmin from "../../hooks/useIsAdmin";

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOutUser, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isAdmin] = useIsAdmin();
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") || false);

    // Load dark mode preference from localStorage on initial render
    useEffect(() => {
        const savedDarkMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(savedDarkMode);
    }, []);

    // Save dark mode preference to localStorage
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const handleLogout = () => {
        toast((t) => (
            <span className="flex items-center gap-4">
                Are You Sure?
                <div>
                    <button
                        onClick={() => {
                            logOutUser()
                                .then(() => {
                                    navigate("/");
                                    toast.success("Logout Success");
                                    setUser(null);
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

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem("darkMode", darkMode)
    };

    // Navigation links fragment
    const LinksFragment = (
        <>
            <NavLink
                to="/home"
                className={({ isActive }) =>
                    `px-3 py-2 mx-3 mt-2 rounded-md lg:mt-0 transition-colors duration-300 transform ${isActive
                        ? "text-white bg-primary dark:bg-darkPrimary"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/biodatas"
                className={({ isActive }) =>
                    `px-3 py-2 mx-3 mt-2 rounded-md lg:mt-0 transition-colors duration-300 transform ${isActive
                        ? "text-white bg-primary dark:bg-darkPrimary"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`
                }
            >
                Biodatas
            </NavLink>
            <NavLink
                to="/about-us"
                className={({ isActive }) =>
                    `px-3 py-2 mx-3 mt-2 rounded-md lg:mt-0 transition-colors duration-300 transform ${isActive
                        ? "text-white bg-primary dark:bg-darkPrimary"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`
                }
            >
                About Us
            </NavLink>
            <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                    `px-3 py-2 mx-3 mt-2 rounded-md lg:mt-0 transition-colors duration-300 transform ${isActive
                        ? "text-white bg-primary dark:bg-darkPrimary"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`
                }
            >
                Contact Us
            </NavLink>
            {user && (
                <NavLink
                    to={`${isAdmin === "admin" ? "/dashboard/admin-dashboard" : "/dashboard/edit-biodata"}`}
                    className={({ isActive }) =>
                        `px-3 py-2 mx-3 mt-2 rounded-md lg:mt-0 transition-colors duration-300 transform ${isActive
                            ? "text-white bg-primary dark:bg-darkPrimary"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`
                    }
                >
                    Dashboard
                </NavLink>
            )}
        </>
    );

    return (
        <nav className={`relative h-16 flex items-center shadow ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700"}`}>
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <NavLink to="/">
                            <h1 className="text-2xl text-primary dark:text-darkPrimary font-bold">MatrimonyBD</h1>
                        </NavLink>

                        {/* Dark Mode Toggle Button */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 ml-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full focus:outline-none"
                        >
                            {darkMode ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            )}
                        </button>

                        {/* Mobile menu button */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600"
                                aria-label="toggle menu"
                            >
                                {!isOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 8h16M4 16h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <div
                        className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out ${darkMode ? "bg-gray-900" : "bg-white"} lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
                            }`}
                    >
                        {/* Render Links */}
                        <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                            {LinksFragment}
                        </div>

                        {/* Profile & Logout */}
                        {user ? (
                            <div className="flex items-center mt-4 lg:mt-0">
                                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                    <img
                                        title={user?.displayName}
                                        src={user?.photoURL ? user.photoURL : "https://www.gravatar.com/avatar/?d=mp&f=y"}
                                        className="object-cover w-full h-full"
                                        alt="avatar"
                                    />
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="ml-4 px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center">
                                <Link to="/login">
                                    <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-darkPrimary focus:outline-none focus:ring-opacity-80">
                                        Login
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Toaster />
        </nav>
    );
};

export default Navigation;