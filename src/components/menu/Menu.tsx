import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import wave from '../../assets/wave-sound.png';
import { useNavigate } from "react-router-dom";

const menuItems = [
    { label: "Home", path: "/home" },
    { label: "About us", path: "/about" },
    { label: "Upcoming Features", path: "/upcoming" },
    // { label: "Get suggestions free", path: "/suggestions" }
];


const Menu: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const naviagtion = useNavigate();


    const handleScroll = (path: string) => {
        naviagtion(path);
        setIsMenuOpen(false);

    };

    return (
        <div className=" backdrop-blur-sm h-20 flex justify-between items-center p-3 sticky top-0 z-50 text-white shadow-lg"> {/* Tăng z-index lên 50 */}
            {/* Logo và tên thương hiệu */}
            <div onClick={() => handleScroll("/home")} className="flex items-center gap-2 justify-center ml-3 cursor-pointer">
                <img src={wave} alt="logo" className="w-8 h-8" />
                <span className="font-bold text-2xl text-gray-400">|</span> {/* Thay đổi màu sắc của | để phù hợp với nền tối */}
                <i className="font-bold text-2xl">CineRec</i>
            </div>

            {/* Menu trên Desktop (hiện từ màn hình md trở lên) */}
            <div className="hidden md:flex items-center justify-center gap-4 mr-10">
                {menuItems.map((item, i) => (
                    <motion.button
                        variants={{
                            hidden: { opacity: 0, x: "100%" },
                            animate: { opacity: 1, x: 0 },
                            hover: { scale: 1.05 },
                            tap: { scale: 0.9 },
                        }}
                        key={item.label}
                        className="h-full font-bold text-lg px-4 py-1 rounded-lg relative overflow-hidden hover:text-white bg-transparent transition-colors duration-200" // bg-black/20 thay bằng bg-transparent

                        initial="hidden"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        custom={i}
                        onClick={() => handleScroll(item.path || "")}
                    >
                        {item.label}
                    </motion.button>
                ))}

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    variants={{
                        hidden: { opacity: 0, x: "100%" },
                        visible: (i: number) => ({
                            opacity: 1,
                            x: 0,
                            transition: { delay: (i - 1) * 0.2 },
                        }),
                    }}

                    className="text-lg font-bold text-white py-1 px-2 rounded-lg w-50 
                    bg-gradient-to-r from-pink-500 via-blue-700 to-blue-600 text-center
                    hover:from-blue-600 hover:via-pink-500 hover:to-pink-500
                     hover:bg-white  transition-colors duration-300"

                    initial="hidden"
                    animate="visible"
                    custom={menuItems.length + 1}
                    onClick={() => naviagtion("/suggestions")}
                >
                    Get suggestions free
                </motion.button>
            </div>

            {/* Nút Hamburger cho Mobile (hiện trên màn hình md trở xuống) */}
            <div className="md:hidden mr-3">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: "100%" },
                            visible: { opacity: 1, x: 0 },
                            exit: { opacity: 0, x: "100%" },
                        }}
                        className="fixed top-20 left-0 w-full z-40 flex flex-col items-center justify-center space-y-8 md:hidden bg-black/80"

                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {menuItems.map((item, i) => (
                            <motion.button
                                //whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                key={item.label}
                                className="text-lg font-bold text-white py-2 w-full text-center hover:bg-white hover:text-black transition-colors duration-300"

                                initial="hidden"
                                animate="visible"
                                custom={i} // Dùng custom để stagger delay
                                onClick={() => handleScroll(item.path || "")}
                            >
                                {item.label}
                            </motion.button>
                        ))}

                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            variants={{
                                hidden: { opacity: 0, x: "100%" },
                                visible: (i: number) => ({
                                    opacity: 1,
                                    x: 0,
                                    transition: { delay: (i - 1) * 0.1 },
                                }),
                            }}

                            className="text-lg font-bold text-white py-1 px-2 rounded-lg w-50 
                    bg-gradient-to-r from-pink-500 via-blue-700 to-blue-600 text-center
                    hover:from-blue-600 hover:via-pink-500 hover:to-pink-500
                     hover:bg-white  transition-colors duration-300 mb-10"

                            initial="hidden"
                            animate="visible"
                            custom={menuItems.length + 1}
                            onClick={() => {
                                naviagtion("/suggestions")
                                setIsMenuOpen(false)
                            }

                            }
                        >
                            Get suggestions free
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Menu;