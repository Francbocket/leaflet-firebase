import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import { QuestMarkerType } from '../interfaces/types/questMarkerType'
import CustomMap from './customMap'

interface LeafletMapProps {
  questMarkers: QuestMarkerType[]
  onLeafletMapClick: (lat: number, lng: number) => Promise<void>
}

function LeafletMap({ questMarkers, onLeafletMapClick }: LeafletMapProps) {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {questMarkers?.map((marker, index) => (
        <Marker key={marker.id} position={[marker.location.latitude, marker.location.longitude]}>
          <Popup>
            <div className="flex flex-col">
              Quest #{index + 1}
              <p className="!m-1">Lat: {marker.location.latitude}</p>
              <p className="!m-1">Lng: {marker.location.longitude}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      <CustomMap onLeafletMapClick={onLeafletMapClick} />
    </MapContainer>
  )
}

export default LeafletMap
