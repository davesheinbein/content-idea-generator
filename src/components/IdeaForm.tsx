'use client';
import { useState } from 'react';

interface IdeaFormProps {
	onAddIdea: (idea: string) => void;
}

export default function IdeaForm({
	onAddIdea,
}: IdeaFormProps) {
	const [input, setInput] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) return;
		onAddIdea(input);
		setInput('');
	};

	return (
		<form onSubmit={handleSubmit} className='mb-4'>
			<input
				type='text'
				value={input}
				onChange={(e) => setInput(e.target.value)}
				className='border p-2 rounded mr-2'
				placeholder='Enter new idea'
			/>
			<button
				type='submit'
				className='bg-blue-600 text-white px-4 py-2 rounded'
			>
				Add
			</button>
		</form>
	);
}
