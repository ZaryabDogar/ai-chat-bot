import axios from 'axios';
import { useState } from 'react';
import { FaGithub, FaLink } from 'react-icons/fa';
import BotResponse from './components/BotResponse';
import PromptInput from './components/PromptInput';
import VoicePlayer from './components/VoicePlayer';
function App() {
	const [response, setResponse] = useState('');
	const [audioUrl, setAudioUrl] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSendPrompt = async (prompt) => {
		setIsLoading(true);
		setResponse('');
		setAudioUrl('');

		try {
			// Get text response from OpenAI
			const textResponse = await axios.post(
				'http://localhost:5000/api/generate',
				{ prompt }
			);
			setResponse(textResponse.data.text);
			console.log(response);

			// Convert text to speech
			const audioResponse = await axios.post(
				'http://localhost:5000/api/text-to-speech',
				{ text: textResponse.data.text },
				{ responseType: 'blob' }
			);

			const audioBlob = new Blob([audioResponse.data], { type: 'audio/mpeg' });
			const audioUrl = URL.createObjectURL(audioBlob);
			setAudioUrl(audioUrl);
		} catch (error) {
			console.error('Error:', error);
			setResponse('Error generating response. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center py-12 px-4">
			<header className="mb-8 text-center">
				<h1 className="text-4xl font-bold text-deepseek-accent mb-2">
					Conversational AI Builder
				</h1>
				<a href="https://github.com/zaryabdogar">
					<div className="flex gap-3 mb-3 justify-center items-center">
						<h1 className="text-3xl font-bold text-deepseek-accent ">
							Zaryab Dogar
						</h1>

						<FaGithub className="text-3xl font-bold text-deepseek-accent" />
					</div>
				</a>
				<a
					href="https://zaryabdogar.vercel.app/"
					className="flex justify-center gap-3 text-blue-400 font-bold mb-2"
				>
					My Portfolio <FaLink className=" flex align-middle items-center" />
				</a>
				<p className="text-deepseek-textSecondary">
					Create and interact with your AI assistant
				</p>
			</header>

			<main className="w-full flex-1 flex flex-col items-center">
				<PromptInput onSendPrompt={handleSendPrompt} isLoading={isLoading} />
				<BotResponse response={response} isLoading={isLoading} />
				<VoicePlayer audioUrl={audioUrl} isLoading={isLoading} />
			</main>

			<footer className="flex flex-col mt-12 items-center">
				<p className=" text-sm text-deepseek-textSecondary">
					Copyright (c) 2024 Zaryab Dogar
				</p>
				<a href="https://github.com/zaryabdogar">
					<FaGithub className="text-3xl text-deepseek-textSecondary mt-4" />
				</a>
			</footer>
		</div>
	);
}

export default App;
