import { GeoPoint, Timestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Header from './components/header'
import LeafletMap from './components/leafletMap'
import QuestsMarkersList from './components/questsMarkersList'
import { useCreateQuestMarker } from './hooks/useCreateQuestMarker'
import { useGetQuestMarkers } from './hooks/useGetQuestMarkers'
import { QuestMarkerType } from './interfaces/types/questMarkerType'

function App() {
  const [questsList, setQuestsList] = useState<QuestMarkerType[]>([])

  const { questMarkers, questMarkersError, questMarkersLoading } = useGetQuestMarkers()

  const { createQuestMarker } = useCreateQuestMarker()

  const onLeafletMapClick = async (lat: number, lng: number) => {
    const newQuest = {
      location: new GeoPoint(lat, lng),
      timestamp: Timestamp.now(),
      nextQuest: questsList.length + 1,
    }

    setQuestsList([...questsList, newQuest])

    await createQuestMarker(newQuest)
  }

  useEffect(() => {
    if (questsList.length === 0 && questMarkers.length > 0) {
      setQuestsList(questMarkers)
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
          <LeafletMap questMarkers={questMarkers} onLeafletMapClick={onLeafletMapClick} />
        </div>
        <QuestsMarkersList
          questsMarkers={questMarkers ?? []}
          error={questMarkersError?.message ?? ''}
          loading={questMarkersLoading}
        />
      </div>
    </div>
  )
}

export default App
