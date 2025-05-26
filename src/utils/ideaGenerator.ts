import axios from 'axios';

// Type for AI-generated content ideas
export interface ContentIdea {
	title: string;
	description?: string;
}

// OpenRouter API key (provided by user)
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;

/**
 * Generate content ideas using OpenRouter (Llama 3) API.
 * @param keywords - List of keywords.
 * @param industry - Target industry.
 * @param contentType - Type of content (e.g. blog post).
 * @param ideaCount - Number of ideas to generate.
 * @returns Array of ContentIdea objects.
 */
const generateContentIdeasAI = async (
	keywords: string[],
	industry: string,
	contentType: string,
	ideaCount: number = 5
): Promise<ContentIdea[]> => {
	// Improved: Remove duplicates, trim, and filter out empty keywords before prompt
	const cleanKeywords = keywords
		.map((k) => k.trim().toLowerCase())
		.filter((k) => k.length > 0)
		.filter((k, i, arr) => arr.indexOf(k) === i);

	const prompt = buildPrompt(
		cleanKeywords,
		industry,
		contentType,
		ideaCount
	);

	try {
		// Call OpenRouter API (Llama 3 model)
		const response = await axios.post(
			'https://openrouter.ai/api/v1/chat/completions',
			{
				model: 'meta-llama/llama-3-70b-instruct',
				messages: [{ role: 'user', content: prompt }],
				temperature: 0.7,
				max_tokens: 600,
			},
			{
				headers: {
					'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
					'Content-Type': 'application/json',
					'HTTP-Referer': 'https://localhost',
					'X-Title': 'Content Idea Generator',
				},
			}
		);

		// Parse OpenRouter response to extract idea strings
		const ideasRaw = response.data.choices[0].message
			.content as string;

		// Improved: Try to extract numbered list, fallback to splitting by newlines
		const lines = ideasRaw
			.split(/\n|\r/)
			.map((line) => line.trim())
			.filter((line) => line && /\d+\./.test(line));

		const ideas =
			lines.length > 0
				? lines.map((line) => ({
						title: line.replace(/^\d+[\.)]?\s*/, ''),
				  }))
				: ideasRaw
						.split(/\n|\r/)
						.map((line) => line.trim())
						.filter((line) => line)
						.map((line) => ({ title: line }));

		return ideas;
	} catch (error) {
		// Log and return empty array on error
		console.error(
			'OpenRouter idea generation failed:',
			error
		);
		return [];
	}
};

/**
 * Build a prompt string for the AI model.
 * @param keywords - List of keywords.
 * @param industry - Target industry.
 * @param contentType - Type of content.
 * @param ideaCount - Number of ideas to generate.
 * @returns Prompt string for AI.
 */
const buildPrompt = (
	keywords: string[],
	industry: string,
	contentType: string,
	ideaCount: number
): string => {
	return `You are a creative content strategist. Generate a list of ${ideaCount} unique, catchy, and actionable ${contentType} ideas for the ${industry} industry. Each idea should be a single-line title, not a paragraph. Use or combine these keywords: ${keywords.join(
		', '
	)}. Vary the style and format (e.g., listicles, how-tos, trends, tips, case studies, questions, etc). Format as a numbered list. Do not include explanations, only the titles.`;
};

// Export only the OpenRouter AI generator
export { generateContentIdeasAI };
