import React, { useState, useEffect } from 'react';
import type { Movie, Movie2 } from '../../type';
import MovieCard from '../../components/MoviesCard/MoviesCard';
import { fetchMovies } from '../../services/MoviesApi';
import f1 from '../../assets/f1.jpg';
import f2 from '../../assets/f2.jpg';
import f3 from '../../assets/f3.jpg';
import f4 from '../../assets/f4.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WatchDetailMovies from './WatchDetailMovies';
import { ToastContainer } from 'react-toastify';
import NotFoundMovies from '../notFound/NotFoundMovies';


const banner = [
    {
        id: 1,
        imgURL: f1,
        videoURL: 'https://www.youtube.com/embed/XJMuhwVlca4?si=oS3WQWo-THJq-sVB',
        title: 'FURIOSA - A Mad Max Saga',
        cast: 'Anya Taylor-Joy, Chris Hemsworth',
        director: 'George Miller',
        description: 'A prequel to Mad Max: Fury Road, the film explores the origin story of Imperator Furiosa before her encounter with Max Rockatansky. It follows her journey from being snatched from the Green Place of Many Mothers and her fight for survival across the Wasteland.',
        year: '2024',
    },
    {
        id: 2,
        imgURL: f2,
        videoURL: 'https://www.youtube.com/embed/t9QePUT-Yt8?si=kFXdQ_xcaNP8kNek',
        title: 'Skyscraper',
        cast: 'Dwayne Johnson, Neve Campbell, Chin Han, Roland Møller',
        director: 'Rawson Marshall Thurber',
        description: 'A former FBI hostage rescue team leader, now a security assessor for skyscrapers, finds himself framed for a fire in the world tallest and safest building. He must clear his name and rescue his family trapped inside the burning building.',
        year: '2018',
    },
    {
        id: 3,
        imgURL: f3,
        videoURL: 'https://www.youtube.com/embed/_inKs4eeHiI?si=oHatlC7ifS7HBd3d',
        title: 'Kung Fu Panda 4',
        cast: 'Jack Black (as Po), Awkwafina (as Zhen), Viola Davis (as The Chameleon), Dustin Hoffman (as Shifu), Bryan Cranston (as Li Shan), James Hong (as Mr. Ping), Ke Huy Quan (as Han), Ian McShane (as Tai Lung), Ronny Chieng (as Captain Fish), Lori Tan Chinn (as Granny Boar)',
        director: 'Mike Mitchell',
        description: 'Po, the Dragon Warrior, is chosen to become the Spiritual Leader of the Valley of Peace. He must find and train a new Dragon Warrior while facing a formidable new villain, The Chameleon, a sorceress who can shapeshift and re-summon past villains.',
        year: '2024',
    },
    {
        id: 4,
        imgURL: f4,
        videoURL: 'https://www.youtube.com/embed/73_1biulkYk?si=h0qgLVkymrGfKfmJ',
        title: 'Deadpool & Wolverine',
        cast: 'Ryan Reynolds (as Wade Wilson / Deadpool), Hugh Jackman (as James "Logan" Howlett / Wolverine), Emma Corrin, Morena Baccarin (as Vanessa Carlysle), Rob Delaney (as Peter Wisdom), Leslie Uggams (as Blind Al), Karan Soni (as Dopinder), Matthew Macfadyen, Brianna Hildebrand (as Negasonic Teenage Warhead), Stefan Kapičić (as Colossus - voice), Shioli Kutsuna (as Yukio)',
        director: 'Shawn Levy',
        description: 'Wade Wilson is pulled from his quiet life and tasked with a mission that could change the history of the Marvel Cinematic Universe. He teams up with a reluctant Wolverine to face a new threat.',
        year: '2024',
    }
];

const MoviesHome: React.FC = () => {
    const [movies, setMovies] = useState<Movie2[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isOpenWatchDetail, setIsOpenWatchDetail] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // --- State và logic mới cho Carousel ---
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Variants cho Framer Motion (hiệu ứng trượt)
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        }),
    };

    const paginateBanner = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentBannerIndex((prevIndex) => {
            const nextIndex = (prevIndex + newDirection + banner.length) % banner.length;
            return nextIndex;
        });
    };

    // Tự động chuyển slide sau mỗi 5 giây
    useEffect(() => {

        // Khi isOpenWatchDetail false, chuyển slide sau mỗi 5 giây
        if (!isOpenWatchDetail) {
            const timer = setInterval(() => {
                paginateBanner(1);

            }, 5000);
            return () => clearInterval(timer); 
        }

    }, [isOpenWatchDetail]);




    const loadMovies = async (page: number, searchTerm: string = '') => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchMovies(page);

            const filteredMovies = data.movies.filter((movie: Movie) =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

            setMovies(filteredMovies);
            setTotalPages(data.totalPages);
            setTotalResults(data.totalResults);

        } catch (err) {
            console.error('Error fetching movies:', err);
            setError('Failed to load movies. Please try again.');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        setTimeout(() => {
            loadMovies(currentPage);
        }, 1000);
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
    };

    // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(event.target.value);
    // };

    return (
        <div className="relative mt-[-80px]">
            <ToastContainer />
            {/* Slide show img chứa thông tin phim và button xem chi tiết */}
            <div className="relative w-full h-screen overflow-hidden rounded-lg mb-12 shadow-xl" > {/* Chiều cao cố định */}
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentBannerIndex}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={direction}
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <img
                            src={banner[currentBannerIndex].imgURL}
                            alt={banner[currentBannerIndex].title}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay và thông tin phim */}
                        <div className="absolute w-[60%] inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent bg-opacity-50 flex flex-col justify-end p-8 text-white">
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-3xl md:text-5xl font-bold mb-2 text-shadow"
                            >
                                {banner[currentBannerIndex].title}
                            </motion.h2>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-lg md:text-xl mb-2 text-shadow line-clamp-2"
                            >
                                <strong>Cast: </strong> {banner[currentBannerIndex].cast}
                            </motion.p>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="text-lg md:text-xl mb-4 text-shadow"
                            >
                                <strong>Director: </strong> {banner[currentBannerIndex].director}
                            </motion.p>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="text-md md:text-lg mb-6 max-w-2xl text-shadow line-clamp-2"
                            >
                                {banner[currentBannerIndex].description}
                            </motion.p>
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                                onClick={() => setIsOpenWatchDetail(true)}
                                className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full w-fit transition-colors duration-300"
                            >
                                Watch Details
                            </motion.button>
                        </div>
                    </motion.div>

                </AnimatePresence>
                {/* Nút điều hướng (Previous/Next) */}
                {
                    isOpenWatchDetail && (
                        <WatchDetailMovies onClose={() => setIsOpenWatchDetail(false)} videoURL={banner[currentBannerIndex].videoURL} />
                    )
                }
                <button
                    onClick={() => paginateBanner(-1)}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    onClick={() => paginateBanner(1)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    aria-label="Next slide"
                >
                    <ChevronRight size={32} />
                </button>

                {/* Các chấm điều hướng */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
                    {banner.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentBannerIndex ? 1 : -1);
                                setCurrentBannerIndex(idx);
                            }}
                            className={`w-3 h-3 rounded-full transition-colors ${currentBannerIndex === idx ? 'bg-white' : 'bg-gray-400 hover:bg-gray-200'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        ></button>
                    ))}
                </div>
            </div>


            {/* Input tìm kiếm */}

            <motion.form
                onSubmit={(e) => {
                    e.preventDefault();
                    loadMovies(1, searchTerm);
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="max-w-md mx-auto mb-10">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Movies, Series..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </motion.form>

            <div className="flex justify-start items-center mb-4 px-4">
                <p className="text-white text-sm p-1 px-4 bg-gradient-to-l from-pink-900 via-blue-700 to-blue-600 rounded-full">Total Results: {totalResults} </p>
            </div>
            {loading ? (
                <div className="flex items-center justify-center h-[50vh]">
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : error ? (
               <NotFoundMovies />
            ) : movies.length === 0 ? (
                <p className="text-white text-center text-lg">No movies found for your search.</p>
            ) : (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-6 gap-3 justify-items-center md:p-6 p-4"
                    >
                        {movies.map((movie) => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </motion.div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-12 space-x-4 mb-10">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <span className="text-white text-lg">
                                {currentPage} ... {totalPages}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    )}
                </>


            )}
        </div>


    );
};

export default MoviesHome;