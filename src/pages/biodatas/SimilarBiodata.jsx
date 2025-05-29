import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../../components/shared/Loading";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SimilarBiodata = ({ biodataType, biodataId }) => {
    const axiosPrivate = useAxiosPrivate();
    const { data, isLoading } = useQuery({
        queryKey: ["similarBiodata", biodataType, biodataId],
        queryFn: async () => {
            try {
                const result = await axiosPrivate.post(`/api/biodata/similar-biodata/${biodataType}?excludeId=${biodataId}`)
                return result.data.data;
            } catch (error) {
                console.log(error);
            }
        }
    })
    console.log(data);
    return (
        <div className="my-4">
            <h1 className="text-2xl font-bold dark:text-white mt-10 mb-2">Similar biodata may you like</h1>
            {isLoading && <Loading />}
            {data && data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-transparent dark:border dark:border-slate-800 dark:shadow-2xl shadow-lg rounded-lg p-4 hover:shadow-xl transition"
                        >
                            <img
                                src={member.profileImage}
                                alt={`${member.name}'s profile`}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg dark:text-white font-bold">{member.name}</h3>
                            <p className="text-gray-600 dark:text-white">Biodata ID: {member.biodataId}</p>
                            <p className="text-gray-600 dark:text-white">Biodata Type: {member.biodataType}</p>
                            <p className="text-gray-600 dark:text-white">Age: {member.age}</p>
                            <p className="text-gray-600 dark:text-white">Occupation: {member.occupation}</p>
                            <p className="text-gray-600 dark:text-white">
                                Permanent Division: {member.permanentDivision}
                            </p>
                            <Link
                                to={`/biodatas/${member.biodataId}`}
                                className="mt-3 block text-center w-full bg-primary text-white py-2 rounded-lg hover:bg-darkPrimary transition"
                            >
                                View Profile
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No similar biodata found.</p>
            )}
        </div>
    );
};

SimilarBiodata.propTypes = {
    biodataType: PropTypes.string.isRequired,
    biodataId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default SimilarBiodata;