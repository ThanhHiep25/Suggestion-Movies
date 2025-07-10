
import {ReplaceIcon } from "lucide-react"
import notFound2 from "../../assets/404-error2.png"
import { motion } from 'framer-motion'

const NotFoundMovies = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1, type: 'tween' }}
            className="relative flex flex-col justify-center items-center h-[80vh]">

            <div className="absolute top-0 left-1/2 transform -translate-x-1/2  w-60 h-90 bg-yellow-200/80 blur-3xl  opacity-40"></div>
            <img src={notFound2} alt="404 not found" className='w-50 h-50 animate-bounce' />
            <p className="text-2xl font-bold text-gray-300">Hmmm... Movie not found 🫥</p>

            <motion.button type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="
                flex items-center
                mt-4 py-2 px-4 text-white rounded-md 
                bg-gradient-to-l from-pink-600 to-blue-700 
                hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition-colors duration-700 ease-in-out"
                onClick={() => window.location.href = '/home'}
            >
                <ReplaceIcon className="mr-2" /> Reload Page
            </motion.button>
        </motion.div>
    )
}

export default NotFoundMovies;