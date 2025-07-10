import React from 'react';
import { X } from 'lucide-react'; // Import icon đóng

interface Props {
    videoURL: string;
    onClose: () => void; // Thêm prop mới là một hàm để đóng component
}

const WatchDetailMovies: React.FC<Props> = ({ videoURL, onClose }: { videoURL: string; onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xl flex items-center justify-center">
            <button
                onClick={onClose}
                className="absolute cursor-pointer
                 top-4 right-4 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors z-50"
                aria-label="Close video"
            >
                <X size={32} />
            </button>
            <iframe
                width="100%"
                height="100%"
                src={videoURL}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; picture-in-picture"
                allowFullScreen
            >
            </iframe>
        </div>
    );
}

export default WatchDetailMovies;