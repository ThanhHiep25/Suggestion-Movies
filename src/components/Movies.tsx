// src/components/MovieList.tsx
import React, { useState } from 'react'; // Import useState
import type { Movie, MovieListProps } from '../type';
import { ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';


// PageSize
const PageSize = 8;

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    // Thêm state để quản lý trang hiện tại
    const [currentPage, setCurrentPage] = useState(0);

    if (!movies || movies.length === 0) {
        return <p className="text-gray-600 text-center py-4">Không tìm thấy phim nào.</p>;
    }

    // Tính toán startIndex và endIndex dựa trên currentPage
    const startIndex = currentPage * PageSize;
    const endIndex = Math.min(startIndex + PageSize, movies.length);
    const displayedMovies = movies.slice(startIndex, endIndex);

    // Tính tổng số trang
    const totalPages = Math.ceil(movies.length / PageSize);

    // Page Size left
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
    };

    // Page Size right
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(totalPages - 1, prevPage + 1));
    };

    // Hàm xử lý việc copy
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
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-2 group">
                {displayedMovies.map((movie: Movie) => (
                    <div key={movie.id} className="relative bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 
                    hover:scale-105 
                    hover:shadow-sm
                    hover:shadow-indigo-500/50
                    hover:cursor-pointer
                    hover:border-2 hover:border-indigo-500
                    group-hover:opacity-20 hover:!opacity-100
                     ">
                        {movie.poster ? (
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-72 object-cover object-center"
                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = '/Chill.png';
                                }}
                            />
                        ) : (
                            <img
                                src='/Chill.png' // Đảm bảo đường dẫn này đúng trong dự án của bạn
                                alt={movie.title}
                                className="w-full h-72 object-cover object-center"
                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = '/Chill.png';
                                }}
                            />
                        )}
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-1 text-gray-800 truncate">{movie.title}</h3>

                            {movie.year && (
                                <p className="text-sm text-gray-500 mb-2">Year: {movie.year}</p>
                            )}

                            {movie.countries && movie.countries.length > 0 && (
                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium">Countries:</span> {movie.countries.join(', ')}
                                </p>
                            )}

                            {movie.directors && movie.directors.length > 0 && (
                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium">Director:</span> {movie.directors.join(', ')}
                                </p>
                            )}

                            {movie.cast && movie.cast.length > 0 && (
                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium">Cast:</span> {movie.cast.join(', ')}
                                </p>
                            )}


                            {movie.genres && movie.genres.length > 0 && (
                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium">Genres:</span> {movie.genres.join(', ')}
                                </p>
                            )}

                            <div className="absolute top-2 right-2">
                                {movie.similarity !== undefined && (
                                    <p className="text-[12px] text-gray-200 p-1 px-2 rounded-full bg-neutral-500/70  bg-opacity-50 backdrop-filter backdrop-blur-md bg-opacity/90">
                                        <span className="font-medium">Similarity:</span> {(movie.similarity * 100).toFixed(2)}%
                                    </p>
                                )}
                            </div>

                            <p className="text-xs text-gray-500 mt-2 line-clamp-3">{movie.plot || movie.fullplot || 'No plot available.'}</p>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 360, width: 100 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleCopyMovieId(movie.id, movie.title)}
                                className="absolute top-20 right-4 p-1 bg-[#7f5af0] bg-opacity-70 rounded-full text-white flex items-center justify-center  hover:bg-[#7f5af0] hover:shadow-[#7f5af0] hover:shadow-[0_0px_10px_0_rgba(0,0,0,0.2)] transition-colors"
                                aria-label={`View details for ${movie.title}`}
                            >

                                <Copy className='w-6 h-6' />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 360, width: 100 }}
                                whileTap={{ scale: 0.9 }}

                                className="absolute top-10 right-4 p-1 bg-[#7f5af0] bg-opacity-70 rounded-full text-white flex items-center justify-center  hover:bg-[#7f5af0] hover:shadow-[#7f5af0] hover:shadow-[0_0px_10px_0_rgba(0,0,0,0.2)] transition-colors"

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
                        </div>
                    </div>
                ))}


            </div>

            {/* Pagination Controls */}
            {movies.length > PageSize && (
                <div className="flex justify-center items-center mt-8 space-x-4 mb-10"> {/* Thêm margin-top và space-x để căn giữa và tạo khoảng cách */}
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 0} // Vô hiệu hóa nút nếu ở trang đầu tiên
                        className="p-2 rounded-full bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <p className="text-lg font-medium text-gray-700">
                        Trang {currentPage + 1} / {totalPages}
                    </p>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages - 1} // Vô hiệu hóa nút nếu ở trang cuối cùng
                        className="p-2 rounded-full bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            )}
        </>
    );
};

export default MovieList;