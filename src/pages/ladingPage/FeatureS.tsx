
import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Zap, Film, Search } from 'lucide-react';

const FeatureS: React.FC = () => {
    // --- Hook cho Animation từng phần ---
    const refWelcome = useRef(null);
    const inViewWelcome = useInView(refWelcome, { once: true, amount: 0.5 });
    const controlsWelcome = useAnimation();

    const refFeatures = useRef(null);
    const inViewFeatures = useInView(refFeatures, { once: true, amount: 0.3 });
    const controlsFeatures = useAnimation();

    const refMission = useRef(null);
    const inViewMission = useInView(refMission, { once: true, amount: 0.5 });
    const controlsMission = useAnimation();

    const refCTA = useRef(null);
    const inViewCTA = useInView(refCTA, { once: true, amount: 0.5 });
    const controlsCTA = useAnimation();

    // --- Animation Logic ---
    useEffect(() => {
        if (inViewWelcome) {
            controlsWelcome.start("visible");
        }
    }, [inViewWelcome, controlsWelcome]);

    useEffect(() => {
        if (inViewFeatures) {
            controlsFeatures.start("visible");
        }
    }, [inViewFeatures, controlsFeatures]);

    useEffect(() => {
        if (inViewMission) {
            controlsMission.start("visible");
        }
    }, [inViewMission, controlsMission]);

    useEffect(() => {
        if (inViewCTA) {
            controlsCTA.start("visible");
        }
    }, [inViewCTA, controlsCTA]);


    // Variants cho Framer Motion để tạo hiệu ứng khi scroll vào hoặc load trang
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                stiffness: 80,
                damping: 10,
            },
        },
    };

    // Variants riêng cho các item trong grid
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1, 
            transition: {
                stiffness: 80,
                damping: 10,
            },
        },
    };

    return (
        <div
            className="min-h-scree  text-white py-1 px-4 md:px-8 flex flex-col justify-center items-center overflow-hidden"
        >
           
            {/* Welcome Section */}
            <motion.section
                ref={refWelcome}
                className="max-w-4xl mx-auto text-center mb-16"
                variants={itemVariants}
                initial="hidden"
                animate={controlsWelcome}
            >
                <p className="text-lg md:text-xl leading-relaxed">
                    Welcome to <strong className="text-yellow-400">CineRec</strong> – your personalized destination for cinematic discovery! We believe that everyone has a unique taste in movies, and finding the perfect film shouldn't be a challenge. That's why CineRec was born.
                </p>
            </motion.section>

            {/* Features Section */}
            <motion.section
                ref={refFeatures}
                className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16"
                variants={containerVariants}
                initial="hidden"
                animate={controlsFeatures}
            >
                <motion.div className="bg-gray-800 p-4 rounded-lg shadow-xl flex flex-col items-center" variants={cardVariants}>
                    <Zap className="text-red-500 mb-4" size={48} />
                    <h3 className="text-xl font-bold mb-4">Intelligent Recommendation</h3>
                    <p className="text-gray-300 text-center">
                        CineRec utilizes advanced machine learning algorithms to analyze your preferences and suggest films you're sure to love, based on your viewing history and ratings.
                    </p>
                </motion.div>

                <motion.div className="bg-gray-800 p-4 rounded-lg shadow-xl flex flex-col items-center" variants={cardVariants}>
                    <Film className="text-purple-500 mb-4" size={48} />
                    <h3 className="text-xl font-bold mb-4">Extensive Movie Library</h3>
                    <p className="text-gray-300 text-center">
                        Explore thousands of movies from various genres and eras. From timeless classics to the latest blockbusters, CineRec has something for everyone.
                    </p>
                </motion.div>

                <motion.div className="bg-gray-800 p-4 rounded-lg shadow-xl flex flex-col items-center" variants={cardVariants}>
                    <Search className="text-blue-500 mb-4" size={48} />
                    <h3 className="text-xl font-bold mb-4">Easy Search & Discovery</h3>
                    <p className="text-gray-300 text-center">
                        Our intuitive interface makes it easy to search for movies by title, cast, director, or explore specially curated collections.
                    </p>
                </motion.div>
            </motion.section>

            {/* Our Mission Section */}
            <motion.section
                ref={refMission}
                className="max-w-4xl mx-auto text-center mb-16"
                variants={itemVariants}
                initial="hidden"
                animate={controlsMission}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
                    Our Mission
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                    CineRec's mission is to make movie discovery and search simpler, 
                    more fun, and more personalized than ever. We're committed to providing quality recommendations, 
                     saving you time, and finding great movies that are just waiting for you.
                </p>
            </motion.section>

            {/* Call to Action Section */}
            <motion.section
                ref={refCTA}
                className="max-w-4xl mx-auto text-center"
                variants={itemVariants}
                initial="hidden"
                animate={controlsCTA}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400">
                    Start Exploring Now!
                </h2>
                <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-200">
                    Join CineRec today and begin your own cinematic journey.
                </p>
                <motion.a
                    href="/"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-transform duration-300 transform hover:scale-105 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Explore Movies
                </motion.a>
            </motion.section>
        </div>
    );
};

export default FeatureS;