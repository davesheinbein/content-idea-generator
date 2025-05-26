'use client';
import { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface ScheduledIdea {
	date: string; // ISO date string (yyyy-mm-dd)
	content: string;
}

export default function CalendarView() {
	const [selectedDate, setSelectedDate] =
		useState<Date | null>(null);
	const [scheduledIdeas, setScheduledIdeas] = useState<
		ScheduledIdea[]
	>([]);

	// Fetch scheduled ideas on mount
	useEffect(() => {
		const fetchScheduledIdeas = async () => {
			try {
				const res = await fetch('/api/scheduledIdeas');
				const data = await res.json();
				setScheduledIdeas(data.ideas || []);
			} catch (err) {
				console.error(
					'Failed to fetch scheduled ideas:',
					err
				);
			}
		};

		fetchScheduledIdeas();
	}, []);

	// Handle date selection
	const handleDateChange: CalendarProps['onChange'] = (
		value
	) => {
		if (Array.isArray(value)) {
			setSelectedDate(value[0] ?? null);
		} else {
			setSelectedDate(value);
		}
	};

	// Convert Date to yyyy-mm-dd string (safe from timezone issues)
	const toISODate = (date: Date) =>
		date.toISOString().split('T')[0];

	// Render pin if idea exists for date
	const tileContent = ({ date }: { date: Date }) => {
		const isoDate = toISODate(date);
		const hasIdea = scheduledIdeas.some(
			(idea) => idea.date === isoDate
		);
		return hasIdea ? (
			<span title='Idea scheduled'>📌</span>
		) : null;
	};

	// Filter ideas for the selected date
	const ideasForSelectedDate = selectedDate
		? scheduledIdeas.filter(
				(idea) => idea.date === toISODate(selectedDate)
		  )
		: [];

	return (
		<div className='max-w-md mx-auto'>
			<Calendar
				onChange={handleDateChange}
				value={selectedDate}
				tileContent={tileContent}
			/>

			<p className='text-gray-700 mt-4'>
				Selected Date:{' '}
				{selectedDate
					? selectedDate.toDateString()
					: 'None'}
			</p>

			{selectedDate && ideasForSelectedDate.length > 0 && (
				<ul className='mt-2 space-y-1'>
					{ideasForSelectedDate.map((idea, idx) => (
						<li key={idx} className='text-sm text-blue-700'>
							{idea.content}
						</li>
					))}
				</ul>
			)}

			{selectedDate &&
				ideasForSelectedDate.length === 0 && (
					<p className='text-sm text-gray-500 mt-2'>
						No ideas scheduled for this day.
					</p>
				)}
		</div>
	);
}
