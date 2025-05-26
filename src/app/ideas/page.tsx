'use client';
import IdeaList from '@/components/IdeaList';
import { useEffect, useState } from 'react';

export default function IdeasPage() {
	const [ideas, setIdeas] = useState<string[]>([]);

	useEffect(() => {
		const fetchIdeas = async () => {
			const res = await fetch('/api/demo?source=all');
			const data = await res.json();
			setIdeas(data.ideas || []);
		};
		fetchIdeas();
	}, []);

	const handleSave = async (idea: any) => {
		const content =
			typeof idea === 'string'
				? idea
				: idea &&
				  typeof idea === 'object' &&
				  'title' in idea
				? idea.title
				: '';
		if (!content) return;
		await fetch('/api/saveIdea', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ content }),
		});
	};

	return (
		<main className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Idea List</h1>
			<IdeaList ideas={ideas} onSave={handleSave} />
		</main>
	);
}
