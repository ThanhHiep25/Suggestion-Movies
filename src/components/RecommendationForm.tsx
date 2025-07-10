import { useState } from 'react';
import type { RecommendationFormProps } from '../type';
import { toast } from 'react-toastify';
import { Loader, Send } from 'lucide-react';
import { motion } from 'framer-motion'



const RecommendationForm: React.FC<RecommendationFormProps> = ({ onFetchRecommendations, loading }) => {
    const [recommendationType, setRecommendationType] = useState<'id' | 'keywords' | 'preferences'>('id');
    const [movieId, setMovieId] = useState<string>('');
    const [keywords, setKeywords] = useState<string>('');
    const [genres, setGenres] = useState<string>('');
    const [cast, setCast] = useState<string>('');
    const [directors, setDirectors] = useState<string>('');
    const [writers, setWriters] = useState<string>('');
    const [languages, setLanguages] = useState<string>('');
    const [countries, setCountries] = useState<string>('');
    const [minYear, setMinYear] = useState<string>('');
    const [maxYear, setMaxYear] = useState<string>('');
    const [numRec, setNumRec] = useState<number>(10);

    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params: Record<string, unknown> = { num_rec: numRec };
        let url = '';

        if (recommendationType === 'id') {
            if (!movieId) {
                toast.warn('Please enter movie ID', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }
            url = `/api/movies/recommend/${movieId}`;
        } else if (recommendationType === 'keywords') {
            if (!keywords) {
                toast.warn('Please enter your request', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                return;
            }
            url = `/api/movies/search`; // URL API theo từ khóa
            params.keywords = keywords;
        } else if (recommendationType === 'preferences') {

            url = `/api/movies/preference-recommendations`; // URL API mới cho sở thích

            const userPreferences: Record<string, unknown> = {};
            if (genres) userPreferences.genres = genres;
            if (cast) userPreferences.cast = cast;
            if (directors) userPreferences.directors = directors;
            if (writers) userPreferences.writers = writers;
            if (languages) userPreferences.languages = languages;
            if (countries) userPreferences.countries = countries;
            if (minYear) userPreferences.min_year = parseInt(minYear, 10);
            if (maxYear) userPreferences.max_year = parseInt(maxYear, 10);

            if (Object.keys(userPreferences).length === 0) {
                toast.warn('Please enter your preferences', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                return;
            }

            Object.assign(params, userPreferences);
        }

        onFetchRecommendations(url, params);
    };

    const labelClasses = "block text-sm font-medium text-gray-400 mb-1";

    return (
        <motion.form
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}

         onSubmit={handleSubmit} className="relative bg-neutral-800/20 backdrop-blur-md text-gray-400 md:p-6 p-2 rounded-lg shadow-md mb-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>

            <h2 className="text-2xl font-bold text-gray-200 mb-4">Search and Movie Suggestions</h2>

            <div className="mb-6">
                <label className={labelClasses}>Select suggestion type:</label>
                <div className="flex gap-4">
                    <motion.label
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}

                        className={`inline-flex items-center cursor-pointer p-2 rounded-md transition-colors duration-200 
                                    ${recommendationType === 'id' ? 'bg-gradient-to-l from-pink-600 to-blue-700 text-white' : 'hover:bg-neutral-700'}`}
                    >
                        <input
                            type="radio"
                            name="recommendationType"
                            value="id"
                            checked={recommendationType === 'id'}
                            onChange={() => setRecommendationType('id')}
                            className="form-radio text-blue-600"
                        />
                        <span className="ml-2 md:text-lg text-[12px]">By ID Movie</span>
                    </motion.label>
                    <motion.label
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className={`inline-flex items-center cursor-pointer p-2 rounded-md transition-colors duration-200 
                                    ${recommendationType === 'keywords' ? 'bg-gradient-to-l from-pink-600 to-blue-700 text-white' : 'hover:bg-neutral-700'}`}
                    >
                        <input
                            type="radio"
                            name="recommendationType"
                            value="keywords"
                            checked={recommendationType === 'keywords'}
                            onChange={() => setRecommendationType('keywords')}
                            className="form-radio text-blue-600"
                        />
                        <span className="ml-2 md:text-lg text-[12px]">By Keyword</span>
                    </motion.label>
                    <motion.label
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className={`inline-flex items-center cursor-pointer p-2 rounded-md transition-colors duration-200 
                                    ${recommendationType === 'preferences' ? 'bg-gradient-to-l from-pink-600 to-blue-700 text-white' : 'hover:bg-neutral-700'}`}
                    >
                        <input
                            type="radio"
                            name="recommendationType"
                            value="preferences"
                            checked={recommendationType === 'preferences'}
                            onChange={() => setRecommendationType('preferences')}
                            className="form-radio text-blue-600"
                        />
                        <span className="ml-2 md:text-lg text-[12px]">By Interest (Genre, Actor,...)</span>
                    </motion.label>
                </div>
            </div>

            {recommendationType === 'id' && (
                <div className="mb-4">
                    <label htmlFor="movieId" className={labelClasses}>ID Movie:</label>
                    <input
                        type="text"
                        id="movieId"
                        value={movieId}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMovieId(e.target.value)}
                        className='w-full p-2 border-b border-gray-300 focus:outline-none'
                        placeholder="e.g., 573a1391f29313caabcd68d0"
                    />
                </div>
            )}

            {recommendationType === 'keywords' && (
                <div className="mb-4">
                    <label htmlFor="keywords" className={labelClasses}>Search keywords:</label>
                    <input
                        type="text"
                        id="keywords"
                        value={keywords}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value)}
                        className='w-full p-2 border-b border-gray-300 focus:outline-none'
                        placeholder="e.g., sci-fi action space"
                    />
                </div>
            )}

            {recommendationType === 'preferences' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="genres" className={labelClasses}>Categories (separated by commas): <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="genres"
                            value={genres}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGenres(e.target.value)}
                            className='w-full p-2 border-b border-gray-300 focus:outline-none'
                            placeholder="e.g., Action,Comedy"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="cast" className={labelClasses}>Actors (separated by commas):</label>
                        <input
                            type="text"
                            id="cast"
                            value={cast}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCast(e.target.value)}
                            className='w-full p-2 border-b border-gray-300 focus:outline-none'
                            placeholder="e.g., Tom Hanks,Leonardo DiCaprio"
                        />
                    </div>
                    <div>
                        <label htmlFor="directors" className={labelClasses}>Directors (separated by commas):</label>
                        <input
                            type="text"
                            id="directors"
                            value={directors}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDirectors(e.target.value)}
                            className='w-full p-2 border-b border-gray-300 focus:outline-none'
                            placeholder="e.g., Christopher Nolan"
                        />
                    </div>
                    <div>
                        <label htmlFor="writers" className={labelClasses}>Screenwriter (separted by commas):</label>
                        <input
                            type="text"
                            id="writers"
                            value={writers}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWriters(e.target.value)}
                            className='w-full p-2 border-b border-gray-300 focus:outline-none'
                            placeholder="e.g., Quentin Tarantino"
                        />
                    </div>
                    <div>
                        <label htmlFor="languages" className={labelClasses}>Language (separted bt commas):</label>
                        <input
                            type="text"
                            id="languages"
                            value={languages}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLanguages(e.target.value)}
                            className='w-full p-2 border-b border-gray-300 focus:outline-none'
                            placeholder="e.g., English,Vietnamese"
                        />
                    </div>
                    <div>
                        <label htmlFor="countries" className={labelClasses}>Countries (separted by commas):</label>
                        <input
                            type="text"
                            id="countries"
                            value={countries}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountries(e.target.value)}
                            className='w-full p-2 border-b border-gray-300 focus:outline-none'
                            placeholder="e.g., USA,France"
                        />
                    </div>
                    <details className="">
                        <summary className="flex w-[150px] items-center justify-between px-4 py-2 bg-gradient-to-l from-pink-900 via-blue-700 to-blue-600 text-white rounded-md cursor-pointer mb-4">
                            <span className='text-sm font-medium'>Criteria by year 🫥</span>
                        </summary>
                        < div className="w-full bg-neutral-700 rounded-md p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className='w-full'>
                                <label htmlFor="minYear" className={labelClasses}>Year of release from:</label>
                                <input
                                    type="date"
                                    id="minYear"
                                    value={minYear}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinYear(e.target.value)}
                                    className='w-full p-2 border-b border-gray-300 focus:outline-none'
                                    placeholder="e.g., 2000"
                                />

                            </div>

                            <div>
                                <label htmlFor="maxYear" className={labelClasses}>Year released to:</label>
                                <input
                                    type="date"
                                    id="maxYear"
                                    value={maxYear}
                                    max={new Date().toISOString().split('T')[0]}
                                    min={minYear}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxYear(e.target.value)}
                                    className='w-full p-2 border-b border-gray-300 focus:outline-none'
                                    placeholder="e.g., 2024"
                                />
                            </div>
                        </div>
                    </details>

                </div>
            )}

            <div className="mb-4">
                <label htmlFor="numRec" className={labelClasses}>Number of suggestions:</label>
                <input
                    type="number"
                    id="numRec"
                    value={numRec}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumRec(Math.max(1, parseInt(e.target.value, 10)) || 1)}
                    min="1"
                    className='w-full p-2 border-b border-gray-300 focus:outline-none'
                />
            </div>

            <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={loading}
            >
                {loading ? <Loader size={18} color="white" className='animate-spin' /> : <><Send size={18} />Search Suggestions</>}
            </button>
        </motion.form>
    );
};

export default RecommendationForm;