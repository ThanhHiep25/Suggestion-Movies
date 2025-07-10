
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchMovies = async (page: number = 1, limit: number = 10) => {
    // Xây dựng URL với các tham số page và limit
    const url = new URL(BASE_URL ? `${BASE_URL}/api/movies` : `http://localhost:8000/api/movies`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());
    

    try {
        const response = await fetch(url.toString()); // Sử dụng url.toString()
        if (!response.ok) {
            // Bao gồm thông báo lỗi từ server nếu có
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            throw new Error(`Network response was not ok: ${response.status} - ${errorData.message || response.statusText}`);
        }
        return response.json(); // API trả về object chứa movies, currentPage, totalPages, v.v.
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};