import OpenAI from 'openai';

// Retrieve settings from localStorage
const getSettings = () => {
	return JSON.parse(localStorage.getItem('settings') || '{}');
};

// Initialize OpenAI client
export const initOpenAI = () => {
	const { apiKey } = getSettings();
	if (!apiKey) return null;

	return new OpenAI({
		baseURL: 'https://openrouter.ai/api/v1',
		apiKey,
		dangerouslyAllowBrowser: true,
	});
};

let previousTitle = '';

export const generateTitle = async () => {
	const settings = getSettings();
	const openai = initOpenAI();

	if (!openai) {
		throw new Error(
			'API key missing. Please set your OpenRouter API key in the settings.'
		);
	}

	const {
		selectedModel = '',
		promptTone = '',
		customTone = '',
		promptType = '',
		customType = '',
	} = settings;

	// System-level prompt explicitly enforcing uniqueness
	const promptSystem = `You are an AI designed to generate highly creative, unique, and engaging stream titles. Each title should be fresh, original, and distinct from any previous suggestions. Aim for variety and creativity—feel free to be playful, thought-provoking, or unexpected. The title must be concise, standalone, and not part of a list or include additional suggestions—just one unique title.`;

	// Generate random seed for uniqueness
	const randomSeed = `Seed-${Math.random().toString(36).substring(7)}`;

	// Use previous title in the prompt base
	const promptBase = previousTitle
		? `Create a new stream title that is distinct from the previous one: "${previousTitle}". The new title should be fresh, original, and avoid repeating the same tone or structure. Tone: ${promptTone.toLowerCase()}.`
		: `Create a brand-new stream title under 100 characters. Tone: ${promptTone.toLowerCase()}.`;

	// Include custom prompt if defined
	const prompt = customTone ? `${promptBase} ${customTone}` : promptBase;

	// Utility function to validate title length
	const isValidTitle = (title) => title.length < 100;

	console.log('Selected model:', selectedModel);

	// Function to generate a title and check its length
	const generateValidTitle = async () => {
		try {
			const completion = await openai.chat.completions.create({
				model: selectedModel.includes('/')
					? selectedModel
					: `openai/${selectedModel}`,
				messages: [
					{ role: 'system', content: promptSystem },
					{ role: 'user', content: `${prompt} (Seed: ${randomSeed})` },
				],
				temperature: 2.0, // Pushes even more randomness for creativity
				max_tokens: 30,
			});

			// Clean up the generated title
			let generatedTitle = completion.choices[0].message.content
				.replace(/^["']|["']$/g, '') // Removes quotes
				.trim();

			// Log the generated title for debugging purposes
			console.log(
				`Generated title: "${generatedTitle}" (Length: ${generatedTitle.length})`
			);

			// Return fallback if title is invalid
			if (!isValidTitle(generatedTitle)) {
				return 'Could not generate stream title please try again';
			}

			return generatedTitle;
		} catch (error) {
			console.error('Error details:', error.response?.data || error);
			throw new Error(`Title generation failed: ${error.message}`);
		}
	};

	// Generate a valid title (less than 100 characters)
	const generatedTitle = await generateValidTitle();

	// Store the previous title for future reference
	previousTitle = generatedTitle;

	// Return the generated title
	return generatedTitle;
};
