// src/types/index.ts

export interface Movie {
    id: string;
    title: string;
    similarity?: number; 
    genres?: string[];
    plot?: string;
    fullplot?: string;
    cast?: string[];
    directors?: string[];
    writers?: string[];
    poster?: string;
    languages?: string[];
    released?: string; 
    awards?: Record<string, any>; 
    lastupdated?: string;
    year?: number;
    imdb?: Record<string, any>; 
    countries?: string[];
    type?: string;
    runtime?: number;
}

export interface Movie2 {
    _id: string;
    title: string;
    similarity?: number; 
    genres?: string[];
    plot?: string;
    fullplot?: string;
    cast?: string[];
    directors?: string[];
    writers?: string[];
    poster?: string;
    languages?: string[];
    released?: string; 
    awards?: Record<string, any>; 
    lastupdated?: string;
    year?: number;
    imdb?: Record<string, any>; 
    countries?: string[];
    type?: string;
    runtime?: number;
}

export interface RecommendationFormProps {
    onFetchRecommendations: (urlPath: string, params: Record<string, any>) => void;
    loading: boolean;
    error: string | null;
}

export interface MovieListProps {
    movies: Movie[];
}