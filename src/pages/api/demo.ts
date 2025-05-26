// src/pages/api/data.ts
// API route for generating and returning content ideas from multiple sources
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchKeywords } from '@/utils/keywordService'; // Ubersuggest keyword fetcher
import { fetchGoogleTrendsKeywords } from '@/utils/googleTrendsService'; // Google Trends fetcher
import { generateContentIdeasAI } from '@/utils/ideaGenerator'; // OpenRouter AI generator

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		// Get keyword, industry, ideaCount, and source from query params, fallback to defaults
		const keyword =
			typeof req.query.keyword === 'string'
				? req.query.keyword
				: 'ai';
		const industry =
			typeof req.query.industry === 'string'
				? req.query.industry
				: 'Tech Startups';
		const ideaCount = req.query.ideaCount
			? Number(req.query.ideaCount)
			: 5;
		const source =
			typeof req.query.source === 'string'
				? req.query.source
				: 'all';

		let ubersuggestKeywords: string[] = [];
		let trendsKeywords: string[] = [];
		let aiIdeas: any[] = [];
		let combinedKeywords: string[] = [];

		if (source === 'ubersuggest') {
			ubersuggestKeywords = await fetchKeywords(
				keyword,
				'us'
			);
			combinedKeywords = ubersuggestKeywords;
		} else if (source === 'trends') {
			trendsKeywords = await fetchGoogleTrendsKeywords(
				keyword
			);
			combinedKeywords = trendsKeywords;
		} else if (source === 'openrouter') {
			// Use only the keyword as the seed for OpenRouter
			combinedKeywords = [keyword];
		} else {
			// all (default): combine Ubersuggest and Trends
			ubersuggestKeywords = await fetchKeywords(
				keyword,
				'us'
			);
			trendsKeywords = await fetchGoogleTrendsKeywords(
				keyword
			);
			combinedKeywords = [
				...ubersuggestKeywords,
				...trendsKeywords,
			];
		}

		if (source === 'openrouter' || source === 'all') {
			aiIdeas = await generateContentIdeasAI(
				combinedKeywords,
				industry,
				'blog post',
				ideaCount
			);
		}

		// If not openrouter, just return the keywords as ideas
		let ideas: string[] = [];
		if (source === 'ubersuggest') {
			ideas = ubersuggestKeywords;
		} else if (source === 'trends') {
			ideas = trendsKeywords;
		} else if (source === 'openrouter') {
			ideas = Array.isArray(aiIdeas)
				? aiIdeas.map((idea) => idea.title)
				: [];
		} else {
			// all: prefer AI ideas if available, fallback to combined keywords
			ideas =
				Array.isArray(aiIdeas) && aiIdeas.length > 0
					? aiIdeas.map((idea) => idea.title)
					: combinedKeywords;
		}

		res.status(200).json({
			ubersuggestKeywords,
			trendsKeywords,
			combinedKeywords,
			ideas,
		});
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}
