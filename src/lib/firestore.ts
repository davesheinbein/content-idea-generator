import {
	collection,
	addDoc,
	getDocs,
	query,
	orderBy,
	updateDoc,
	doc,
	Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// Firestore collection name
const IDEAS_COLLECTION = 'ideas';

// Idea type definition
export interface Idea {
	id?: string;
	content: string;
	keyword: string;
	industry: string;
	scheduledDate?: Date | null;
	createdAt: Timestamp;
}

// Firestore service
const firestoreService = {
	// Add a new idea
	async addIdea(
		idea: Omit<Idea, 'id' | 'createdAt'>
	): Promise<string> {
		const newIdea = {
			...idea,
			createdAt: Timestamp.now(),
		};
		const docRef = await addDoc(
			collection(db, IDEAS_COLLECTION),
			newIdea
		);
		return docRef.id;
	},

	// Get all ideas ordered by creation date (newest first)
	async getIdeas(): Promise<Idea[]> {
		const q = query(
			collection(db, IDEAS_COLLECTION),
			orderBy('createdAt', 'desc')
		);
		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map((docSnap) => ({
			id: docSnap.id,
			...docSnap.data(),
		})) as Idea[];
	},

	// Schedule/update an idea's scheduled date
	async scheduleIdea(
		ideaId: string,
		scheduledDate: Date | null
	): Promise<void> {
		const ideaDocRef = doc(db, IDEAS_COLLECTION, ideaId);
		await updateDoc(ideaDocRef, {
			scheduledDate,
		});
	},
};

export default firestoreService;
