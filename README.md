# Content Idea Generator

Generate creative content ideas for any industry or keyword, powered by AI (OpenRouter), Google Trends, and Ubersuggest.

## Features

- Generate content ideas using AI (Llama 3 via OpenRouter)
- Fetch trending keywords from Google Trends and Ubersuggest
- Combine multiple sources for richer idea generation
- Save and schedule ideas to your calendar
- Modern UI with Next.js, React, and Tailwind CSS

## Demo

[GitHub Repository](https://github.com/davesheinbein/content-idea-generator.git)

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Firebase Firestore (for saving ideas)
- OpenRouter (Llama 3) for AI idea generation
- Google Trends API
- Ubersuggest API (via RapidAPI)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/davesheinbein/content-idea-generator.git
cd content-idea-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add the following:

```
NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key
OPENROUTER_API_KEY=your_openrouter_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_USE_EMULATOR=false
```

> Replace the values with your actual API keys and Firebase config.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

1. Enter a keyword and select an industry.
2. Choose a source (Ubersuggest, Google Trends, OpenRouter, or All).
3. Click "Generate Ideas" to get a list of content ideas.
4. Save or copy ideas as needed.
5. View and schedule ideas in the calendar.

## Project Structure

- `/src/app` - Next.js app pages and layout
- `/src/components` - React UI components
- `/src/utils` - API integration and utility functions
- `/src/lib` - Firebase and Firestore setup
- `/src/pages/api` - API routes for idea generation and saving

## License

MIT

---
