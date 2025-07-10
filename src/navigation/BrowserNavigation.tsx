import { BrowserRouter, Route, Routes } from "react-router-dom"
import Suggestions from "../pages/suggestions/Suggestions"
import PageNotFound from "../pages/notFound/404notFound"
import MoviesHome from "../pages/movies/MoviesHome"
import Menu from "../components/menu/Menu"
import Footer from "../components/footer/Footer"
import { useEffect, useState } from "react"
import { ChevronUp} from "lucide-react"
import AboutUs from "../pages/about/About"
import OpenTime from "../pages/opentime/OpenTime"
import LadingPage from "../pages/ladingPage/LadingPage"


const BrowserNavigation = () => {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    return (
        <>
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={<LadingPage />} />
                    <Route path="/home" element={<MoviesHome />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/upcoming" element={<OpenTime />} />
                    <Route path="/suggestions" element={<Suggestions />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                {/* Nút trở về đầu trang */}
                {showTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-50 bg-[#2cb67d] hover:bg-[#2cb67d] text-white p-2 rounded-full shadow-xl border-4 border-white animate-bounce-slow transition-all duration-300 flex items-center justify-center group animate-bounce"
                        aria-label="Trở về đầu trang"
                        style={{
                            boxShadow: "0 4px 24px 0 rgba(255, 193, 7, 0.4)",
                        }}
                    >
                        <ChevronUp size={32} className="group-hover:scale-110 transition-transform duration-300" />

                    </button>
                )}
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default BrowserNavigation