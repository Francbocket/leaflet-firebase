import { QuestMarkerType } from '../interfaces/types/questMarkerType'

export default function transformNestedMarkerListToArray(
  input: Record<string, any>,
): QuestMarkerType[] {
  if (!input) {
    return []
  }

  const { location, nextQuest, timestamp, next } = input

  return [{ location, nextQuest, timestamp, next: null }, ...transformNestedMarkerListToArray(next)]
}
