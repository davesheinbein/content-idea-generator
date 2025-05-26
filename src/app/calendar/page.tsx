'use client';
import CalendarView from '@/components/CalendarView';

export default function CalendarPage() {
	return (
		<main className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>
				Idea Calendar
			</h1>
			<CalendarView />
		</main>
	);
}
