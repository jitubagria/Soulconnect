const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: "Create Your Account",
            description:
                "Sign up with your details to create your account and start exploring.",
            icon: "📝",
        },
        {
            id: 2,
            title: "Set Up Your Biodata",
            description:
                "Fill out your biodata to help potential matches know you better.",
            icon: "📋",
        },
        {
            id: 3,
            title: "Explore Premium Members",
            description:
                "Browse through premium members to find your ideal match.",
            icon: "🌟",
        },
        {
            id: 4,
            title: "Connect and Chat",
            description:
                "Send connection requests and chat with members to get to know them.",
            icon: "💬",
        },
        {
            id: 5,
            title: "Find Your Partner",
            description:
                "Build a meaningful relationship and start your journey together.",
            icon: "❤️",
        },
    ];

    return (
        <div className="p-4 md:p-8 bg-gray-50 dark:bg-dark">
            <h2 className="text-2xl md:text-4xl font-bold text-center dark:text-white mb-8">
                How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="flex flex-col dark:bg-dark items-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
                    >
                        <div className="text-4xl md:text-6xl mb-4">{step.icon}</div>
                        <h3 className="text-lg font-bold mb-2 dark:text-white">{step.title}</h3>
                        <p className="text-gray-600 text-center dark:text-gray-300">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;
