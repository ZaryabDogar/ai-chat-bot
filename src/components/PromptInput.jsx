import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const PromptInput = ({ onSendPrompt, isLoading }) => {
	const [prompt, setPrompt] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (prompt.trim()) {
			onSendPrompt(prompt);
			setPrompt('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
			<div className="relative flex items-center">
				<input
					type="text"
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					placeholder="Enter your prompt..."
					className="w-full p-4 pr-12 rounded-lg bg-deepseek-secondary border border-deepseek-accent focus:outline-none focus:ring-2 focus:ring-deepseek-accent text-deepseek-text"
					disabled={isLoading}
				/>
				<button
					type="submit"
					className="absolute right-3 p-2 rounded-full bg-deepseek-accent text-deepseek-primary hover:bg-green-400 transition-colors disabled:opacity-50"
					disabled={isLoading || !prompt.trim()}
				>
					<FaPaperPlane />
				</button>
			</div>
		</form>
	);
};

export default PromptInput;
