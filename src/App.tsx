import { GeoPoint, Timestamp, getDocs, limit, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Header from './components/header'
import LeafletMap from './components/leafletMap'
import QuestsMarkersList from './components/questsMarkersList'
import { useCreateQuestMarker } from './hooks/useCreateQuestMarker'
import { useGetQuestMarkers } from './hooks/useGetQuestMarkers'
import { useUpdateQuestMarker } from './hooks/useUpdateQuestMarker'
import { QuestMarkerType } from './interfaces/types/questMarkerType'
import { questMarkersCollection } from './services/firebaseDB'
import transformNestedMarkerListToArray from './utils/transformNestedMarkerListToArray'

function App() {
  const [questsList, setQuestsList] = useState<QuestMarkerType[]>([])

  const { questMarkers, questMarkersError, questMarkersLoading } = useGetQuestMarkers()

  const { updateQuestMarker, isQuestMarkUpdating } = useUpdateQuestMarker()

  const { createQuestMarker } = useCreateQuestMarker()

  const onLeafletMapClick = async (lat: number, lng: number) => {
    if (questMarkersLoading || isQuestMarkUpdating) {
      return
    }

    const newQuest = {
      location: new GeoPoint(lat, lng),
      timestamp: Timestamp.now(),
      nextQuest: questsList.length + 1,
      next: null,
    }

    const updatedQuestList = [...questsList, newQuest]

    setQuestsList(updatedQuestList)

    const questMarkerDoc = (await getDocs(query(questMarkersCollection, limit(1)))).docs[0]

    if (questMarkerDoc) {
      await updateQuestMarker(updatedQuestList, questMarkerDoc)
    } else {
      await createQuestMarker(newQuest)
    }
  }

  useEffect(() => {
    if (questsList.length === 0 && questMarkers.length > 0) {
      setQuestsList(transformNestedMarkerListToArray(questMarkers[0]))
    }
  }, [questMarkers, questsList])

  return (
    <div>
      <Helmet>
        <title>Fabulous Map - Firebase</title>
      </Helmet>
      <Header />
      <div className="flex px-10 py-4 space-y-2 md:space-y-0 md:space-x-4 flex-col md:flex-row">
        <div className="w-full md:w-[70vw]">
          <LeafletMap questMarkers={questsList} onLeafletMapClick={onLeafletMapClick} />
        </div>
        <QuestsMarkersList
          questsMarkers={questsList ?? []}
          error={questMarkersError?.message ?? ''}
          loading={questMarkersLoading}
        />
      </div>
    </div>
  )
}

export default App
