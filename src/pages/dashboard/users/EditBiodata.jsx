import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import toast, { Toaster } from "react-hot-toast";
import useIsPremium from "../../../hooks/useIsPremium";

const EditBiodata = () => {
    const { isPremium } = useIsPremium()
    const user = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const heightOptions = Array.from({ length: 121 }, (_, i) => 121 + i);
    const weightOptions = Array.from({ length: 102 }, (_, i) => 40 + i);

    const { data } = useQuery({
        queryKey: ["biodata", user?.email],
        queryFn: async () => {
            const { data } = await axiosPrivate.get(`/biodata/${user.email}`);
            return data;
        },
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const biodataType = form.biodataType.value;
        const name = form.name.value;
        const profileImage = form.profileImage.value;
        const dob = form.dob.value;
        const height = form.height.value;
        const weight = form.weight.value;
        const age = form.age.value;
        const occupation = form.occupation.value;
        const race = form.race.value;
        const fathersName = form.fathersName.value;
        const mothersName = form.mothersName.value;
        const permanentDivision = form.permanentDivision.value;
        const presentDivision = form.presentDivision.value;
        const partnerAge = form.partnerAge.value;
        const partnerHeight = form.partnerHeight.value;
        const partnerWeight = form.partnerWeight.value;
        const email = form.email.value;
        const mobileNumber = form.mobileNumber.value;

        const data = {
            biodataType,
            name,
            profileImage,
            dob,
            height,
            weight,
            age,
            occupation,
            race,
            fathersName,
            mothersName,
            permanentDivision,
            presentDivision,
            partnerAge,
            partnerHeight,
            partnerWeight,
            email,
            mobileNumber,
            ...(isPremium && { premiumStatus: "premium" })
        };

        toast((t) => (
            <span className="flex">
                Confirm submit Biodata?
                <div className="flex items-center">
                    <button
                        onClick={() => {
                            axiosPrivate.post("/biodata", data)
                                .then((res) => {
                                    if (res.data.upsertedId) {
                                        toast.success("Biodata submitted successfully!");
                                    } else if (res.data.matchedCount > 0 && res.data.acknowledged === true) {
                                        toast.success("Biodata updated successfully!");
                                    }
                                })
                                .catch((err) => {
                                    console.error(err.message);
                                    toast.error("Failed to submit biodata!");
                                })
                                .finally(() => toast.dismiss(t.id));
                        }}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Submit
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
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-dark dark:text-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Edit Biodata</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Biodata Type</label>
                        <select
                            name="biodataType"
                            defaultValue={data?.biodataType}
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={data?.name}
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Profile Image Link</label>
                        <input
                            type="url"
                            name="profileImage"
                            defaultValue={data?.profileImage}
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            placeholder="Enter profile image URL"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            defaultValue={data?.dob}
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Height</label>
                        <select
                            name="height"
                            defaultValue={data?.height}
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            required
                        >
                            {heightOptions.map((height) => (
                                <option key={height} value={height}>
                                    {height} cm
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Weight</label>
                        <select
                            name="weight"
                            defaultValue={data?.weight}
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            required
                        >
                            {weightOptions.map((weight) => (
                                <option key={weight} value={weight}>
                                    {weight} kg
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Age</label>
                        <input
                            type="number"
                            name="age"
                            defaultValue={data?.age}
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            placeholder="Enter your age"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Occupation</label>
                        <select
                            name="occupation"
                            defaultValue={data?.occupation}
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            required
                        >
                            <option value="" disabled>
                                Select Occupation
                            </option>
                            <option value="Student">Student</option>
                            <option value="Job">Job</option>
                            <option value="Housewife">Housewife</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Race</label>
                        <select
                            name="race"
                            defaultValue={data?.race}
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            required
                        >
                            <option value="" disabled>
                                Select Race
                            </option>
                            <option value="Fair">Fair</option>
                            <option value="Medium">Medium</option>
                            <option value="Dark">Dark</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Father&apos;s Name</label>
                        <input
                            type="text"
                            name="fathersName"
                            defaultValue={data?.fathersName}
                            placeholder="Enter Father's Name"
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block mb-1 font-medium">Mother&apos;s Name</label>
                        <input
                            type="text"
                            name="mothersName"
                            defaultValue={data?.mothersName}
                            placeholder="Enter Mother's Name"
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Permanent Division</label>
                        <select
                            name="permanentDivision"
                            defaultValue={data?.permanentDivision}
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            required
                        >
                            <option value="" disabled>
                                Select Permanent Division
                            </option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chattogram">Chattogram</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Mymensingh">Mymensingh</option>
                            <option value="Sylhet">Sylhet</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <label className="block mb-1 font-medium">Present Division</label>
                        <select
                            name="presentDivision"
                            defaultValue={data?.presentDivision}
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            required
                        >
                            <option value="" disabled>
                                Select Present Division
                            </option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chattogram">Chattogram</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Mymensingh">Mymensingh</option>
                            <option value="Sylhet">Sylhet</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <label className="block mb-1 font-medium">Expected Partner Age</label>
                        <input
                            type="number"
                            name="partnerAge"
                            defaultValue={data?.partnerAge}
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            placeholder="Enter expected partner age"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block mb-1 font-medium">Expected Partner Height</label>
                        <select
                            name="partnerHeight"
                            defaultValue={data?.partnerHeight}
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            required
                        >
                            {heightOptions.map((height) => (
                                <option key={height} value={height}>
                                    {height} cm
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <label className="block mb-1 font-medium">Expected Partner Weight</label>
                        <select
                            name="partnerWeight"
                            defaultValue={data?.partnerWeight}
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            required
                        >
                            {weightOptions.map((weight) => (
                                <option key={weight} value={weight}>
                                    {weight} kg
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user?.email}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed dark:bg-dark dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Mobile Number</label>
                        <input
                            type="text"
                            name="mobileNumber"
                            defaultValue={data?.mobileNumber}
                            className="w-full p-2 border rounded dark:bg-dark dark:text-white"
                            placeholder="Enter mobile number"
                            required
                        />
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-darkPrimary"
                    >
                        Save and Publish Now
                    </button>
                </div>
            </form>
            <Toaster></Toaster>
        </div>
    );
};

export default EditBiodata;
