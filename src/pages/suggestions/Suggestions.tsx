import { useState } from 'react';
import wave from '../../assets/wave-sound.png';
import idea from '../../assets/idea.png';
import { ToastContainer } from 'react-toastify';
import type { Movie } from '../../type';
import RecommendationForm from '../../components/RecommendationForm';
import MovieList from '../../components/Movies';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import error1 from '../../assets/404-error.png';

const BASE_URL = import.meta.env.VITE_BASE_URL;


const Suggestions: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]); // Định nghĩa kiểu cho state movies
    const [loading, setLoading] = useState<boolean>(false); // Định nghĩa kiểu cho state loading
    const [error, setError] = useState<string | null>(null); // Định nghĩa kiểu cho state error

    const handleFetchRecommendations = async (urlPath: string, params: Record<string, string | number>) => {
        setLoading(true);
        setError(null);
        setMovies([]);

        const queryString = new URLSearchParams(
            Object.fromEntries(
                Object.entries(params).map(([key, value]) => [key, String(value)])
            )
        ).toString();

        // Đảm bảo đúng cổng backend của bạn, nếu backend chạy trên 3000, frontend trên 5173
        // Cần thêm proxy trong vite.config.ts hoặc dùng full URL
        const fullUrl = BASE_URL ? `${BASE_URL}${urlPath}?${queryString}` : `http://localhost:8000/${urlPath}?${queryString}`;

        try {
            const response = await fetch(fullUrl);
            const data: { recommendations?: Movie[]; message?: string; error?: string } = await response.json(); // Ép kiểu dữ liệu trả về

            if (!response.ok) {
                throw new Error('No suggestions found.');
            }

            if (data.recommendations) {
                setMovies(data.recommendations);
            } else if (data.message) {
                setError('No suggestions found.');
            } else {
                setError('No suggestions found.');
            }

        } catch (err: unknown) { // Sử dụng 'unknown' và thu hẹp kiểu lỗi
            console.error("Lỗi khi gọi API:", err);
            if (err instanceof Error) {
                setError(err.message || 'Cannot connect to server.');
            } else {
                setError('Cannot connect to server.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-2">
            <ToastContainer />
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-center items-center mb-10 mt-10">
                    <img src={wave} alt="wave" className="w-12 h-12" />
                    <h1 className="text-3xl font-bold text-white ml-2">
                        CineRec - Movie suggestions
                    </h1>
                </div>

                <RecommendationForm
                    onFetchRecommendations={handleFetchRecommendations}
                    loading={loading}
                    error={error}
                />

                {loading && (
                    <div className="">

                        <div className="flex justify-center mt-4">
                            <DotLottieReact
                                src="https://lottie.host/8ba8cb81-52f3-4448-b051-b66a043eefd0/qceSHPOoCs.lottie"
                                loop
                                autoplay
                                style={{ width: '150px', height: '150px' }}
                            />
                        </div>
                        <p className="text-center text-blue-600 text-lg mt-8">
                            Wait a minute!
                        </p>

                        <p className="text-center text-blue-600 text-lg mt-4">
                            Try to suggest movies based on your criteria
                        </p>
                    </div>
                )}

                {error && !loading && (
                    <div className="flex flex-col items-center mt-4">
                        <img src={error1} alt="error" className="w-[150px] h-[150px] " />
                        <p className="text-center text-red-600 text-lg font-bold mt-4 p-1 px-3 bg-neutral-200 rounded-full">
                            {error}
                        </p>
                    </div>

                )}

                {!loading && !error && movies.length > 0 && (
                    <div className="flex flex-col mt-10 w-full">
                        <h2 className="md:text-3xl text-lg font-bold text-gray-400 mb-6">Movie recommendations for you 🔥</h2>
                        <MovieList movies={movies} />
                    </div>
                )}

                {!loading && !error && movies.length === 0 && (
                    <div className=" flex flex-col items-center justify-center">
                        <img src={idea} alt=" idea" className="w-[100px] h-[100px] " />
                        <p className="text-center rounded-full px-2 text-white md:text-lg text-sm mt-8 p-1 bg-gradient-to-l from-pink-500 to-blue-500">
                            Try to suggest movies based on your criteria !
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Suggestions;