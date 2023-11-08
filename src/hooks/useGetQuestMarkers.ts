import { orderBy, query } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { questMarkersCollection } from '../services/firebaseDB'

export const useGetQuestMarkers = () => {
  const [questMarkers, questMarkersLoading, questMarkersError] = useCollectionData(
    query(questMarkersCollection, orderBy('timestamp', 'asc')),
    {
      snapshotListenOptions: {
        includeMetadataChanges: true,
      },
    },
  )

  return {
    questMarkers: questMarkers ?? [],
    questMarkersLoading,
    questMarkersError,
  }
}
