'use client';
const INDUSTRIES = [
	'Art & Design',
	'Automotive',
	'Beauty & Personal Care',
	'Books & Publishing',
	'Construction',
	'Education',
	'Entertainment',
	'Environment',
	'Events & Conferences',
	'Fashion & Apparel',
	'Finance',
	'Food & Beverage',
	'Gaming',
	'Health & Wellness',
	'Home & Garden',
	'HR & Recruiting',
	'Legal',
	'Logistics & Supply Chain',
	'Marketing',
	'Music',
	'Nonprofit',
	'Other',
	'Parenting & Family',
	'Pets',
	'Photography',
	'Politics & Government',
	'Real Estate',
	'Science & Research',
	'Sports & Fitness',
	'Tech Startups',
	'Travel & Hospitality',
];

import { useState } from 'react';
import IdeaList from '@/components/IdeaList';

export default function HomePage() {
	const [industry, setIndustry] = useState(INDUSTRIES[0]);
	const [keyword, setKeyword] = useState('');
	const [ideas, setIdeas] = useState<
		(string | { title: string })[]
	>([]);
	const [loading, setLoading] = useState(false);
	const [source, setSource] = useState('all');
	const [ideaCount, setIdeaCount] = useState(5);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setIdeas([]);
		const res = await fetch(
			`/api/demo?keyword=${encodeURIComponent(
				keyword
			)}&industry=${encodeURIComponent(
				industry
			)}&source=${encodeURIComponent(
				source
			)}&ideaCount=${ideaCount}`
		);
		const data = await res.json();
		setIdeas(data.ideas || []);
		setLoading(false);
	};

	return (
		<main className='p-6 max-w-xl mx-auto'>
			<h1 className='text-3xl font-bold mb-4'>
				Welcome to IdeaGenie
			</h1>
			<p className='text-gray-600 mb-6'>
				Generate content ideas powered by AI, Google Trends,
				and Ubersuggest.
			</p>
			<form
				onSubmit={handleSubmit}
				className='mb-6 flex flex-col gap-4'
			>
				<label className='flex flex-col'>
					Industry
					<select
						className='border p-2 rounded mt-1'
						value={industry}
						onChange={(e) => setIndustry(e.target.value)}
					>
						{INDUSTRIES.map((ind) => (
							<option key={ind} value={ind}>
								{ind}
							</option>
						))}
					</select>
				</label>
				<label className='flex flex-col'>
					Keyword
					<input
						type='text'
						className='border p-2 rounded mt-1'
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
						placeholder='e.g. AI, fitness, investing...'
					/>
				</label>
				<label className='flex flex-col'>
					Number of Ideas
					<input
						type='number'
						min={1}
						max={20}
						value={ideaCount}
						onChange={(e) =>
							setIdeaCount(Number(e.target.value))
						}
						className='border p-2 rounded mt-1 w-32'
					/>
				</label>
				<div className='flex gap-6 mb-4'>
					<label className='flex items-center gap-2'>
						<input
							type='radio'
							name='source'
							value='ubersuggest'
							checked={source === 'ubersuggest'}
							onChange={() => setSource('ubersuggest')}
							className='accent-blue-600'
						/>
						Ubersuggest
					</label>
					<label className='flex items-center gap-2'>
						<input
							type='radio'
							name='source'
							value='trends'
							checked={source === 'trends'}
							onChange={() => setSource('trends')}
							className='accent-blue-600'
						/>
						Google Trends
					</label>
					<label className='flex items-center gap-2'>
						<input
							type='radio'
							name='source'
							value='openrouter'
							checked={source === 'openrouter'}
							onChange={() => setSource('openrouter')}
							className='accent-blue-600'
						/>
						Openrouter
					</label>
					<label className='flex items-center gap-2'>
						<input
							type='radio'
							name='source'
							value='all'
							checked={source === 'all'}
							onChange={() => setSource('all')}
							className='accent-blue-600'
						/>
						All
					</label>
				</div>
				<button
					type='submit'
					className='bg-blue-600 text-white px-4 py-2 rounded font-semibold disabled:opacity-60'
					disabled={loading || !keyword.trim()}
				>
					{loading ? 'Generating...' : 'Generate Ideas'}
				</button>
			</form>
			{ideas.length > 0 && (
				<section>
					<h2 className='text-xl font-semibold mb-2'>
						Generated Ideas
					</h2>
					<IdeaList
						ideas={ideas}
						onSave={async (idea: any) => {
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
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									content,
									keyword,
									industry,
								}),
							});
						}}
					/>
				</section>
			)}
		</main>
	);
}
