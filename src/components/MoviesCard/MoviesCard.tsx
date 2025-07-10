import { toast } from "react-toastify";
import type { Movie2 } from "../../type";
import { motion } from 'framer-motion'
import { Copy } from "lucide-react";
interface MovieCardProps {
    movie: Movie2;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const handleExternalLinkClick = () => {
        console.log(`View details for movie: ${movie.title}`);
    };

    const handleCopyMovieId = async (movieId: string, name: string) => {
        try {
            await navigator.clipboard.writeText(movieId);
            toast.success(`Đã copy ID phim "${name}"`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        } catch (err) {
            console.error('Không thể copy ID phim:', err);
            alert('Không thể copy ID phim. Vui lòng thử lại.');
        }
    };

    return (
        <div className="relative w-full h-auto bg-[#16161a] rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
            {/* Container cho ảnh poster */}
            <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                <img
                    src={movie.poster || '/Chill.png'}
                    className="w-full h-full object-cover bg-neutral-800"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/Chill.png';
                    }}
                />
            </div>
            <motion.button
                whileHover={{ scale: 1.1, rotate: 360, width: 100 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleCopyMovieId(movie._id, movie.title)}
                className="absolute top-14 right-1 p-2 bg-[#7f5af0] bg-opacity-70 rounded-full text-white flex items-center justify-center  hover:bg-[#7f5af0] hover:shadow-[#7f5af0] hover:shadow-[0_0px_10px_0_rgba(0,0,0,0.2)] transition-colors"
                aria-label={`View details for ${movie.title}`}
            >

                <Copy className='w-6 h-6' />
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.1, rotate: 360, width: 100 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleExternalLinkClick}
                className="absolute top-1 right-1 p-2 bg-[#7f5af0] bg-opacity-70 rounded-full text-white flex items-center justify-center  hover:bg-[#7f5af0] hover:shadow-[#7f5af0] hover:shadow-[0_0px_10px_0_rgba(0,0,0,0.2)] transition-colors"
                aria-label={`View details for ${movie.title}`}
            >

                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-2l4-4m0 0l-4-4m4 4H14"
                    ></path>
                </svg>
            </motion.button>

            {/* Tiêu đề/mô tả dưới cùng */}
            <div className="p-4 pt-6">
                <h3 className="text-white text-xl font-semibold leading-tight mt-2">
                    {movie.title}
                </h3>

                <p className="text-gray-400 text-sm mt-1">{movie.year}</p>
                <p className="text-gray-400 text-sm mt-1 truncate">{movie.plot}</p>
            </div>
        </div>
    );
};

export default MovieCard;