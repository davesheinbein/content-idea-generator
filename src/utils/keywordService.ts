// src/lib/keywordService.ts
const RAPIDAPI_HOST =
	'ubersuggest-keyword-ideas.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY!;

interface UbersuggestResponse {
	keywords: string[]; // adjust based on actual API response shape
	// you can extend this interface with more fields if needed
}

/**
 * Fetches keyword ideas from Ubersuggest via RapidAPI.
 * @param keyword - base search term
 * @param country - country code (e.g., 'in', 'us'), default 'us'
 * @returns array of keyword strings
 */
export async function fetchKeywords(
	keyword: string,
	country = 'us'
): Promise<string[]> {
	const url = `https://${RAPIDAPI_HOST}/keyword-research?keyword=${encodeURIComponent(
		keyword
	)}&country=${country}`;

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'x-rapidapi-host': RAPIDAPI_HOST,
			'x-rapidapi-key': RAPIDAPI_KEY,
		},
	});

	if (!response.ok) {
		throw new Error(
			`Keyword fetch failed: ${response.status} ${response.statusText}`
		);
	}

	const data: UbersuggestResponse = await response.json();

	// Improved: Deduplicate, trim, lowercase, and filter out empty keywords
	return (data.keywords || [])
		.map((k) => k.trim().toLowerCase())
		.filter((k) => k.length > 0)
		.filter((k, i, arr) => arr.indexOf(k) === i);
}
