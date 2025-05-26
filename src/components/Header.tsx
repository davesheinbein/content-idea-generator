import Link from 'next/link';

export default function Header() {
	return (
		<header className='flex justify-between items-center p-4 bg-blue-600 text-white'>
			<h1 className='text-xl font-bold'>IdeaGenie</h1>
			<nav>
				<Link href='/' className='mr-4 hover:underline'>
					Home
				</Link>
				<Link
					href='/ideas'
					className='mr-4 hover:underline'
				>
					Ideas
				</Link>
				<Link href='/calendar' className='hover:underline'>
					Calendar
				</Link>
			</nav>
		</header>
	);
}
