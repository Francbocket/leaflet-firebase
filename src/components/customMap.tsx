import { useMapEvents } from 'react-leaflet'

interface CustomMapProps {
  onLeafletMapClick: (lat: number, lng: number) => Promise<void>
}

function CustomMap({ onLeafletMapClick }: CustomMapProps) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng
      await onLeafletMapClick(lat, lng)
    },
  })

  return null
}

export default CustomMap
