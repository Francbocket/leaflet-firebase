import { GeoPoint, Timestamp } from 'firebase/firestore'

export type QuestMarkerType = {
  timestamp: Timestamp
  location: GeoPoint
  nextQuest: number
  id?: string
}
