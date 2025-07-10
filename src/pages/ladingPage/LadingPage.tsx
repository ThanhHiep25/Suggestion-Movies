import { ChevronDown, Mouse, PawPrintIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import FeatureS from "./FeatureS";

const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.2 + i * 0.2, duration: 0.7 }
    })
};


const AREAS = [
    "USA",
    "China",
    "Việt Nam",
    "Khác"
];

const LadingPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", area: AREAS[0] });
    const [submitted, setSubmitted] = useState(false);


    const handleOpenModal = () => {
        setShowModal(true);
        setSubmitted(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setForm({ name: "", email: "", area: AREAS[0] });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setShowModal(false);
            setForm({ name: "", email: "", area: AREAS[0] });
        }, 4000);
    };

    return (
        <div className="bg-black min-h-screen w-full">
            {/* Modal đăng ký */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white rounded-2xl shadow-2xl p-8 w-[90vw] max-w-md relative"
                    >
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                            onClick={handleCloseModal}
                        >
                            <X size={28} />
                        </button>
                        <h2 className="text-2xl font-bold text-yellow-500 mb-4 text-center">CineRec - Movies Suggestion</h2>
                        {submitted ? (
                            <div className="text-green-600 text-center font-semibold py-8">
                                Đăng ký thành công! Cảm ơn bạn đã quan tâm!
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Name"
                                    className="border-b-yellow-400 border-b px-4 py-2 focus:outline-none text-yellow-500"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Email"
                                    className="border-b-yellow-400 border-b px-4 py-2 focus:outline-none text-yellow-500"
                                />
                                <select
                                    name="area"
                                    value={form.area}
                                    onChange={handleChange}
                                    className="border-b-yellow-400 border-b px-4 py-2 focus:outline-none text-yellow-700 font-bold"
                                >
                                    {AREAS.map((area) => (
                                        <option key={area} value={area}>{area}</option>
                                    ))}
                                </select>
                                <button
                                    type="submit"
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded-lg transition-all"
                                >
                                    Pre-register
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
            <section id="home" className="relative h-screen w-full overflow-hidden mt-[-80px] flex md:flex-row flex-col md:justify-center items-center pt-24">
                {/* Content */}
                <div className="pointer-events-none absolute h-full top-0 left-0 w-full  bg-gradient-to-r from-black/70 via-blue-500/20 to-transparent"></div>


                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={0}
                    className="z-1 p-4">
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600 mb-4 flex items-center gap-2">CineRec - Movies Suggestion</h1>
                    <p className="text-xl text-gray-300 mb-8">
                        Cine Rec is an application that helps movie viewers<br /> recommend movies that suit their needs.
                    </p>
                    <button
                        className="bg-white/10 hover:text-yellow-500 border text-white px-4 py-2 rounded-lg"
                        onClick={handleOpenModal}
                    >
                        Pre-register
                    </button>
                </motion.div>

                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={0}
                    className="z-1 p-4 flex justify-center relative mb-10">

                    <video src="/mobileDemo.webm" autoPlay loop muted
                        className="absolute md:relative w-[210px] h-[430px] object-cover rounded-[30px]" />

                    <video src="/MacbookAir.webm" autoPlay loop muted
                        className="md:w-full md:h-[420px] w-[410px] h-[420px] object-cover rounded-[20px]" />

                </motion.div>



                {/* Gradient overlay bottom */}
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                <Mouse size={40} color="white" className="absolute top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce" />
                <ChevronDown size={40} color="white" className="absolute top-[95%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce" />
            </section>

            {/* Section 1 */}
            <motion.section
                id="about"
                className="relative p-4 w-full py-24 flex flex-col items-center justify-center bg-black/80 text-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                custom={0}
            >
                <div className="blur-sm pointer-events-none absolute rotate-45 
                top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                rounded-full w-[400px] h-[400px] bg-gradient-to-b from-yellow-200/90
                 via-yellow-200/60 to-transparent"></div>
                <FeatureS />
            </motion.section>

        
            {/* Section 3 */}
            <motion.section
                id="gallery"
                className="w-full py-24 bg-black/90 text-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                custom={2}
            >

                 <div className="mt-8 flex items-center justify-center gap-2 md:p-20 p-5">
                   <p className="p-2 bg-blue-500/20 rounded-2xl backdrop-blur-2xl px-5 
                   ">
                    As for the basic suggestion feature, 
                    it uses <strong>TF-IDF</strong> technique to process and calculate the similarity between 
                    keywords and sets to give the most suitable suggestion. 
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600 font-bold">
                        This feature is still under development in the future.</span></p>
                </div>

                 <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={0}
                    className="z-1 p-4 flex justify-center relative mb-10 gap-10">

                    <video src="/mobileS2.webm" autoPlay loop muted
                        className="absolute md:relative w-[210px] h-[430px] object-cover rounded-[30px]" />

                    <video src="/MacbookAir2.webm" autoPlay loop muted
                        className="md:w-[700px] md:h-[420px] w-[410px] h-[420px] object-cover rounded-[20px]" />

                </motion.div>

                <div className="mt-8 flex items-center justify-center gap-2">
                    <i>Ng.Thành Hiệp - Cty LoopAni ALIS - 2025</i>
                    <PawPrintIcon size={30} className="font-bold" />

                </div>
            </motion.section>


        </div>
    );
};

export default LadingPage;