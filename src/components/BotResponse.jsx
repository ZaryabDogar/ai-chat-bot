const BotResponse = ({ response, isLoading }) => {
	return (
		<div className="w-full max-w-3xl mx-auto mt-6 p-6 rounded-lg bg-deepseek-secondary border border-deepseek-accent">
			<h3 className="text-lg font-semibold mb-4 text-deepseek-accent">
				AI Response
			</h3>
			{isLoading ? (
				<div className="flex items-center space-x-2">
					<div className="w-2 h-2 rounded-full bg-deepseek-accent animate-bounce"></div>
					<div className="w-2 h-2 rounded-full bg-deepseek-accent animate-bounce delay-100"></div>
					<div className="w-2 h-2 rounded-full bg-deepseek-accent animate-bounce delay-200"></div>
				</div>
			) : (
				<div className="whitespace-pre-wrap max-h-60 overflow-y-auto pr-2">
					{response || 'Your AI response will appear here...'}
				</div>
			)}
		</div>
	);
};

export default BotResponse;
