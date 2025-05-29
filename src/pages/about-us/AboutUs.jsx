import { Link } from "react-router-dom";

const AboutUs = () => {
    const teamMembers = [
        { id: 1, name: "John Doe", role: "Founder & CEO", image: "https://i.ibb.co.com/zXKxW8N/images-2.jpg" },
        { id: 2, name: "Jane Smith", role: "CTO", image: "https://i.ibb.co.com/tDvY3rP/csm-Person-Yury-Prof-Foto-An-LI-Footgrafie-2-JPG-94f12fbf25.jpg" },
        { id: 3, name: "Alice Johnson", role: "Marketing Head", image: "https://i.ibb.co.com/82PkPvJ/Kayla-Person.jpg" },
    ];

    const testimonials = [
        {
            id: 1,
            name: "Emily Brown",
            feedback:
                "Thanks to this platform, I found my perfect life partner. The experience was smooth and wonderful!",
            image: "https://i.ibb.co.com/hgjqNxq/360-F-383258331-D8ima-EMl8-Q3lf7-EKU2-Pi78-Cn0-R7-Kk-W9o.jpg",
        },
        {
            id: 2,
            name: "Michael Green",
            feedback:
                "A great platform with verified profiles and excellent search features. Highly recommended!",
            image: "https://i.ibb.co.com/HPRWcwq/360-F-243123463-z-Tooub557x-EWABDLk0j-Jkl-Dy-LSGl2jrr.jpg",
        },
    ];

    return (
        <div className="bg-gray-100 dark:bg-dark">
            {/* Header Section */}
            <header className="text-black dark:bg-dark dark:text-white py-16 text-center">
                <h1 className="text-4xl font-bold">About Us</h1>
                <p className="mt-4 text-lg">
                    Connecting people to build meaningful relationships.
                </p>
            </header>
            <div className="border mx-10 lg:mx-20 border-primary"></div>
            {/* Mission and Vision Section */}
            <section className="max-w-7xl mx-auto py-16 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Mission</h2>
                        <p className="text-gray-700 text-lg dark:text-gray-300">
                            Our mission is to simplify the journey of finding a life partner
                            by providing a secure, trustworthy, and user-friendly platform.
                            We aim to build a community of meaningful connections.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Vision</h2>
                        <p className="text-gray-700 text-lg dark:text-gray-300">
                            Our vision is to be the most reliable and widely-used matrimony
                            platform, connecting people across cultures and communities to
                            create lifelong relationships.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-white dark:bg-dark py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-8 dark:text-white">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="bg-gray-100 dark:bg-dark dark:border-gray-400 dark:border-2 p-6 rounded-lg shadow-md">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 mx-auto rounded-full mb-4"
                                />
                                <h3 className="text-xl font-semibold dark:text-white">{member.name}</h3>
                                <p className="text-gray-500 dark:text-gray-300">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="max-w-7xl mx-auto py-16 px-6">
                <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">What People Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white dark:bg-dark dark:border-2 dark:border-gray-300 p-6 rounded-lg shadow-md text-center"
                        >
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-16 h-16 mx-auto rounded-full mb-4"
                            />
                            <p className="text-gray-700 italic dark:text-gray-300">{testimonial.feedback}</p>
                            <h3 className="text-lg font-bold mt-4 dark:text-white">{testimonial.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="text-black dark:bg-dark dark:text-white py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Find Your Match?</h2>
                    <p className="text-lg mb-8">
                        Join our platform today and start your journey towards a meaningful
                        relationship.
                    </p>
                    <Link to={"/biodatas"} className="px-6 text-primary py-3 border border-primary transition hover:bg-primary hover:text-white bg-transparent font-semibold rounded-lg">
                        Join Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
