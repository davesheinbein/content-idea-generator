import { useState } from 'react';

interface IdeaCardProps {
	idea: string;
	onSave?: (idea: string) => void;
}

export default function IdeaCard({
	idea,
	onSave,
}: IdeaCardProps) {
	const [saved, setSaved] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleSave = async () => {
		if (onSave) {
			await onSave(idea);
			setSaved(true);
		}
	};

	const handleCopy = async () => {
		await navigator.clipboard.writeText(idea);
		setCopied(true);
		setTimeout(() => setCopied(false), 1200);
	};

	return (
		<div className='border p-4 rounded shadow hover:shadow-lg transition flex flex-col gap-2'>
			<p className='text-gray-800'>{idea}</p>
			<div className='flex gap-2 self-end'>
				<button
					className='bg-green-600 text-white px-3 py-1 rounded text-sm'
					onClick={handleCopy}
					disabled={copied}
				>
					{copied ? 'Copied!' : 'Copy'}
				</button>
				{onSave && (
					<button
						className={`bg-blue-600 text-white px-3 py-1 rounded text-sm ${saved ? 'opacity-60' : ''}`}
						onClick={handleSave}
						disabled={saved}
					>
						{saved ? 'Saved' : 'Save'}
					</button>
				)}
			</div>
		</div>
	);
}
