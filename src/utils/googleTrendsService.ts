// src/lib/googleTrendsService.ts
import googleTrends from 'google-trends-api';

/**
 * Fetch related keyword queries from Google Trends.
 * @param keyword - The seed keyword.
 * @returns Array of related search queries.
 */
export async function fetchGoogleTrendsKeywords(
	keyword: string
): Promise<string[]> {
	try {
		const results = await googleTrends.relatedQueries({
			keyword,
			geo: 'US',
		});
		const parsed = JSON.parse(results);

		// Improved: Return only unique, relevant queries (filter out empty, dedupe, and lowercase)
		const relatedQueries = (
			parsed.default.rankedList[0]?.rankedKeyword.map(
				(item: any) => item.query.trim().toLowerCase()
			) || []
		)
			.filter((q: string) => q.length > 0)
			.filter(
				(q: string, i: number, arr: string[]) =>
					arr.indexOf(q) === i
			);

		return relatedQueries;
	} catch (error: any) {
		console.error('Google Trends error:', error.message);
		return [];
	}
}
