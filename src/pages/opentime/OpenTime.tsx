// src/pages/OpenTime.tsx

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Star, MessageSquare, Heart, BellRing, Users, TrendingUp } from 'lucide-react';


interface Feature {
    icon: React.ElementType; 
    title: string;
    description: string;
    status: 'coming_soon' | 'in_progress' | 'planned'; 
}

const upcomingFeatures: Feature[] = [
    {
        icon: Star,
        title: "Advanced Rating System",
        description: "A more nuanced way to rate movies, including sub-genres, emotional impact, and rewatchability.",
        status: "in_progress",
    },
    {
        icon: MessageSquare,
        title: "Comment & Discussion Boards",
        description: "Engage with other film enthusiasts, share your thoughts, and discuss your favorite movies.",
        status: "coming_soon",
    },
    {
        icon: Heart,
        title: "Personalized Watchlists & Collections",
        description: "Create and share custom watchlists, and organize your favorite films into curated collections.",
        status: "in_progress",
    },
    {
        icon: BellRing,
        title: "Release Date Notifications",
        description: "Get alerts when movies you're interested in are released on streaming platforms or in theaters.",
        status: "coming_soon",
    },
    {
        icon: Users,
        title: "Friend Activity & Recommendations",
        description: "See what your friends are watching and get personalized recommendations based on their tastes.",
        status: "planned",
    },
    {
        icon: TrendingUp,
        title: "Trending & Popular Movie Insights",
        description: "Deep dive into trending movies, popular genres, and cinematic insights with detailed analytics.",
        status: "planned",
    },
];

const OpenTime: React.FC = () => {
    // Animation controls for the main container
    const mainControls = useAnimation();
    const mainRef = useRef(null);
    const inViewMain = useInView(mainRef, { once: true, amount: 0.2 }); // Trigger when 20% in view

    useEffect(() => {
        if (inViewMain) {
            mainControls.start("visible");
        }
    }, [inViewMain, mainControls]);

    // Variants for the main container and individual feature cards
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Stagger children animation
            },
        },
    };

    // Determine status badge colors
    const getStatusBadge = (status: Feature['status']) => {
        switch (status) {
            case 'coming_soon':
                return <span className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">Coming Soon</span>;
            case 'in_progress':
                return <span className="bg-yellow-500 text-gray-900 text-xs font-semibold px-2.5 py-0.5 rounded-full">In Progress</span>;
            case 'planned':
                return <span className="bg-gray-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">Planned</span>;
            default:
                return null;
        }
    };

    return (
        <motion.div
            ref={mainRef}
            className="min-h-screen bg-gray-950 text-white py-16 px-4 md:px-8 mt-[-80px] flex flex-col items-center overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate={mainControls}
        >
            <motion.h1
                className="text-4xl md:text-6xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mt-10"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                Upcoming Features at CineRec
            </motion.h1>

            <motion.p
                className="max-w-3xl text-lg md:text-xl text-center mb-16 text-gray-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
                We're constantly working to enhance your CineRec experience! Here's a sneak peek at what's coming next. Your feedback helps us prioritize, so let us know what you'd like to see!
            </motion.p>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto w-full"
                variants={containerVariants} 
            >
                {upcomingFeatures.map((feature, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gray-800 p-8 rounded-lg shadow-xl flex flex-col items-start hover:shadow-2xl transition-shadow duration-300 transform "
                        variants={
                            {
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } },
                                exit: { opacity: 0, y: 30 },
                            }
                        }
                    >
                        <feature.icon className="text-indigo-400 mb-4" size={48} />
                        <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                        <p className="text-gray-300 mb-4 flex-grow">{feature.description}</p>
                        {getStatusBadge(feature.status)}
                    </motion.div>
                ))}
            </motion.div>

            <motion.section
                className="max-w-4xl mx-auto text-center mt-16"
                initial={{ opacity: 0, y: 30 }}
                animate={mainControls} 
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">
                    Have an Idea?
                </h2>
                <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-200">
                    We value your input! If you have suggestions for new features or improvements, please don't hesitate to share them with us.
                </p>
                <motion.a
                    href="mailto:your_email@example.com" 
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-transform duration-300 transform hover:scale-105 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Send Us Feedback
                </motion.a>
            </motion.section>
        </motion.div>
    );
};

export default OpenTime;