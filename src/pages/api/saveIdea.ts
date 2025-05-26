// src/pages/api/saveIdea.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import firestoreService from '@/lib/firestore';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res
			.status(405)
			.json({ error: 'Method not allowed' });
	}

	const { content, keyword, industry } = req.body;

	if (!content || !keyword || !industry) {
		return res
			.status(400)
			.json({ error: 'Missing required fields' });
	}

	try {
		const id = await firestoreService.addIdea({
			content,
			keyword,
			industry,
			scheduledDate: null,
		});
		return res.status(200).json({ success: true, id });
	} catch (error: any) {
		return res
			.status(500)
			.json({
				error: error.message || 'Failed to save idea',
			});
	}
}
