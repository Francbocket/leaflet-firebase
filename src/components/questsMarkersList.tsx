import { MapPinIcon } from '@heroicons/react/24/solid'
import { QuestMarkerType } from '../interfaces/types/questMarkerType'
import Spinner from './spinner'

interface QuestsListProps {
  loading: boolean
  error: string
  questsMarkers: QuestMarkerType[]
}

function QuestsMarkersList({ loading, error, questsMarkers }: QuestsListProps) {
  const renderContent = () => {
    if (loading) {
      return <Spinner />
    }

    if (error) {
      return <p className="text-base text-red-400 text-center">Error: {error}</p>
    }

    if (questsMarkers.length === 0) {
      return <p className="text-base text-center text-blue-400">Click on map to add quest!</p>
    }

    return questsMarkers.map((marker, index) => (
      <div key={marker.id} className="flex flex-col p-1">
        <div className="flex">
          <MapPinIcon className="w-5 h-5 mr-1 mt-[1px]" />
          <div>
            <span>Quest #{index + 1}</span>
            <p>Lat: {marker.location.latitude} </p>
            <p>Long: {marker.location.longitude} </p>
          </div>
        </div>
      </div>
    ))
  }
  return (
    <section className="flex flex-col py-0 p-4 shadow-lg md:w-[30vw] max-h-[85vh] overflow-auto">
      <h2 className="text-center py-2 text-lg sticky top-0 bg-white">Quest markers list</h2>
      {renderContent()}
    </section>
  )
}

export default QuestsMarkersList
