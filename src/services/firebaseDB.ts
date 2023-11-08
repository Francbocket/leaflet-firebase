import { initializeApp } from 'firebase/app'
import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  collection,
  getFirestore,
} from 'firebase/firestore'
import { firebaseConfig } from '../configs/firebaseConfig'
import { FirebaseCollectionsEnum } from '../interfaces/enums/firebaseCollectionsEnum'
import { QuestMarkerType } from '../interfaces/types/questMarkerType'

const app = initializeApp(firebaseConfig)

export const firebaseDB = getFirestore(app)

export const questMarkersCollection = collection(
  firebaseDB,
  FirebaseCollectionsEnum.QUEST_MARKERS,
).withConverter({
  toFirestore: (item) => item,
  fromFirestore: (snapshot: QueryDocumentSnapshot<QuestMarkerType>, options) => {
    const data = snapshot.data(options)

    return {
      ...data,
      id: snapshot.id,
    }
  },
} as FirestoreDataConverter<QuestMarkerType>)
