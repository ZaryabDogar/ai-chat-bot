import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';

const VoicePlayer = ({ audioUrl, isLoading }) => {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const handlePlay = () => setIsPlaying(true);
		const handleEnd = () => setIsPlaying(false);

		audio.addEventListener('play', handlePlay);
		audio.addEventListener('ended', handleEnd);

		return () => {
			audio.removeEventListener('play', handlePlay);
			audio.removeEventListener('ended', handleEnd);
		};
	}, []);

	const togglePlayback = () => {
		if (isPlaying) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	return (
		<div className="flex items-center mt-4">
			<button
				onClick={togglePlayback}
				disabled={!audioUrl || isLoading}
				className="flex items-center justify-center p-3 rounded-full bg-deepseek-accent text-deepseek-primary hover:bg-green-400 transition-colors disabled:opacity-50"
			>
				{isPlaying ? <FaStop /> : <FaPlay />}
			</button>
			<span className="ml-3 text-deepseek-textSecondary">
				{audioUrl
					? isPlaying
						? 'Playing...'
						: 'Play voice response'
					: 'No audio available'}
			</span>
			<audio ref={audioRef} src={audioUrl} hidden />
		</div>
	);
};

export default VoicePlayer;
