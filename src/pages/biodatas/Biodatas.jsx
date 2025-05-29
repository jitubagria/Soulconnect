import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";

const Biodatas = () => {
    const [active, setActive] = useState("biodatas")
    const axiosPublic = useAxiosPublic();
    const [filters, setFilters] = useState({
        ageFrom: "",
        ageTo: "",
        biodataType: "",
        presentDivision: ""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const biodatasPerPage = 6;

    const { data: biodatas = [], isPending } = useQuery({
        queryKey: ["biodatas"],
        queryFn: async () => {
            try {
                const result = await axiosPublic.get("/biodatas");
                return result.data;
            } catch (error) {
                console.log(error);
            }
        }
    });

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setCurrentPage(1);
    };

    const handleReset = () => {
        setFilters({
            ageFrom: "",
            ageTo: "",
            biodataType: "",
            presentDivision: ""
        });
        setCurrentPage(1);
    };

    const filteredBiodatas = biodatas.filter((biodata) => {
        return (
            (!filters.ageFrom || Number(biodata.age) >= Number(filters.ageFrom)) &&
            (!filters.ageTo || Number(biodata.age) <= Number(filters.ageTo)) &&
            (!filters.biodataType || biodata.biodataType === filters.biodataType) &&
            (!filters.presentDivision || biodata.presentDivision === filters.presentDivision)
        );
    });

    const totalPages = Math.ceil(filteredBiodatas.length / biodatasPerPage);
    const startIndex = (currentPage - 1) * biodatasPerPage;
    const currentBiodatas = filteredBiodatas.slice(startIndex, startIndex + biodatasPerPage);

    if (!biodatas) {
        return <div>
            <h1>No Biodata Found</h1>
        </div>
    }

    return (
        isPending ? <div className="h-screen flex justify-center items-center">
            <PuffLoader color="#fa005d" size={80} speedMultiplier={2} />
        </div> : <div className="container mx-auto dark:bg-dark dark:text-white p-4">
            <Tabs>
                <TabList className="flex border-b">
                    <Tab onClick={() => setActive("biodatas")} className={`px-4 py-2 cursor-pointer ${active === "biodatas" && "rounded bg-primary text-white"} transition`}>Biodatas</Tab>
                    <Tab onClick={() => setActive("filter")} className={`px-4 py-2 cursor-pointer ${active === "filter" && "rounded bg-primary text-white"} transition`}>Filter</Tab>
                </TabList>

                <TabPanel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {currentBiodatas.map((biodata) => (
                            <div key={biodata._id} className="border rounded-lg p-4 shadow-md">
                                <img src={biodata.profileImage} alt={biodata.name} className="w-20 h-20 rounded-full mx-auto" />
                                <h2 className="text-lg font-bold text-center">{biodata.name}</h2>
                                <p className="text-center">Biodata No: {biodata.biodataId}</p>
                                <p className="text-center">Age: {biodata.age}</p>
                                <p className="text-center">Division: {biodata.presentDivision}</p>
                                <p className="text-center">Occupation: {biodata.occupation}</p>
                                <Link
                                    to={`/biodatas/${biodata.biodataId}`}
                                    className="mt-3 block text-center w-full bg-primary hover:bg-darkPrimary transition-all duration-300 text-white py-2 rounded-lg"
                                >
                                    View Profile
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center mt-6 space-x-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 dark:text-black rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-primary text-white hover:bg-darkPrimary"}`}
                        >
                            Previous
                        </button>
                        <p>
                            Page {currentPage} of {totalPages}
                        </p>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 dark:text-black rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-primary text-white hover:bg-darkPrimary"}`}
                        >
                            Next
                        </button>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="p-4 border rounded-lg shadow-md my-5">
                        <label>Age Range:</label>
                        <div className="flex my-1 gap-2">
                            <input
                                type="number"
                                name="ageFrom"
                                placeholder="From"
                                value={filters.ageFrom}
                                onChange={handleFilterChange}
                                className="w-1/2 p-2 dark:bg-slate-950 dark:text-white border rounded"
                            />
                            <input
                                type="number"
                                name="ageTo"
                                placeholder="To"
                                value={filters.ageTo}
                                onChange={handleFilterChange}
                                className="w-1/2 p-2 dark:bg-slate-950 dark:text-white border rounded"
                            />
                        </div>

                        <label>Biodata Type:</label>
                        <select
                            name="biodataType"
                            onChange={handleFilterChange}
                            className="w-full my-1 dark:bg-slate-950 dark:text-white p-2 border rounded"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <label>Present Division:</label>
                        <select
                            name="presentDivision"
                            onChange={handleFilterChange}
                            className="w-full my-1 dark:bg-slate-950 dark:text-white p-2 border rounded"
                        >
                            <option value="">Select</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chattogram">Chattogram</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Mymensingh">Mymensingh</option>
                            <option value="Sylhet">Sylhet</option>
                        </select>

                        <button
                            onClick={handleReset}
                            className="mt-4 w-full bg-white dark:bg-slate-950 text-primary border border-primary font-bold hover:bg-primary dark:hover:bg-primary hover:text-white transition py-2 rounded-lg"
                        >
                            Reset Filters
                        </button>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Biodatas;
