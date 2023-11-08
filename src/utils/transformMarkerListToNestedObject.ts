import { FieldValue } from 'firebase/firestore'
import { QuestMarkerType } from '../interfaces/types/questMarkerType'

export default function transformMarkerListToNestedObject(
  input: QuestMarkerType[],
): Record<string, FieldValue | Partial<unknown> | undefined> | null {
  const [first, ...rest] = input

  if (first) {
    return {
      timestamp: first.timestamp,
      location: first.location,
      nextQuest: first.nextQuest,
      next: transformMarkerListToNestedObject(rest) as FieldValue | Partial<unknown> | undefined,
    }
  }

  return null
}
