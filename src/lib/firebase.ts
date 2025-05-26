// /src/lib/firebase.ts
import {
	initializeApp,
	getApps,
	getApp,
} from 'firebase/app';
import {
	getFirestore,
	Firestore,
	connectFirestoreEmulator,
} from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
	storageBucket:
		process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
	messagingSenderId:
		process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Initialize Firebase app only once (important for Next.js SSR)
const app = !getApps().length
	? initializeApp(firebaseConfig)
	: getApp();

// Export Firestore instance (singleton)
const db: Firestore = getFirestore(app);

// Optional: Use emulator in development (toggle with env var)
if (
	process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR ===
		'true' &&
	typeof window !== 'undefined'
) {
	connectFirestoreEmulator(db, 'localhost', 8080);
}

export { app, db };
