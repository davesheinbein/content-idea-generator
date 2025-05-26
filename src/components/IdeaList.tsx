import IdeaCard from './IdeaCard';

interface IdeaListProps {
	ideas: (string | { title: string })[];
	onSave?: (idea: string) => void;
}

export default function IdeaList({
	ideas,
	onSave,
}: IdeaListProps) {
	if (!ideas || ideas.length === 0) {
		return (
			<p className='text-gray-500'>
				No ideas found for this keyword.
			</p>
		);
	}

	return (
		<div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
			{ideas.map((idea, idx) => {
				// If idea is an object with a title, use that; else use the string
				const content =
					typeof idea === 'string' ? idea : idea.title;
				return (
					<IdeaCard
						key={idx}
						idea={content}
						onSave={onSave}
					/>
				);
			})}
		</div>
	);
}
