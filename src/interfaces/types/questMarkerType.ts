import { GeoPoint, Timestamp } from 'firebase/firestore'

type QuestType = {
  timestamp: Timestamp
  location: GeoPoint
  nextQuest: number
}

export type QuestMarkerType = QuestType & {
  next: QuestType | null
}
