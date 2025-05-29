import { FaArrowRight } from "react-icons/fa";

const WhyChooseUs = () => {
    const data = [
        "Receive handpicked introduction by human matchmakers",
        "Enjoy dates arrange for you, complete with date feedback",
        "Meet singles who are looking for long-term relationship",
        "Receive date coaching advice from professional consultants",
        "Benefit from our large database with over 100,000 singles",
        "Be safe with authentic and verified user profile"
    ]
    return (
        <section className="p-4 md:p-8 mt-4 mb-10 bg-gray-50 dark:bg-slate-950">
            <h1 className="text-2xl md:text-4xl font-bold text-center dark:text-white mb-4">Why Choose Us</h1>
            <div className="flex justify-around gap-10 md:pt-5 pt-0 flex-col md:flex-row">
                <div className="flex text-center md:text-left flex-col gap-4 justify-center">
                    <h1 className="uppercase text-primary font-semibold">Why us</h1>
                    <h1 className="capitalize font-bold text-black dark:text-white text-3xl">Why choose ready</h1>
                    <h1 className="font-bold text-black dark:text-white text-3xl">for Marriage</h1>
                    <p className="text-gray-700 dark:text-gray-200">On MatrimonyBD, you&apos;re more than just a photo. You have stories to tell, <br /> and passion to share,</p>
                </div>
                <div className="space-y-6">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 shadow-[0px_0px_40px_0px_rgba(252,129,129,0.5)] bg-white dark:bg-slate-800 dark:text-gray-300 py-2 px-4 rounded-full">
                            <div className="bg-primary p-4 rounded-full"><FaArrowRight /></div>
                            <div className="text-xl text-gray-700 dark:text-gray-300">{item}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs