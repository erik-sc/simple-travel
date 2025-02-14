import React, { useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import CONFIG from "../../../config.json";


function MyComponent() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: CONFIG.API_KEY,
        libraries: ["places"],
    });
    const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [markers, setMarkers] = useState([]);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px", borderRadius: "8px" }}
            zoom={10}
            center={mapCenter}
        >
            <Marker
                position={{
                    lat: selectedPlace.geometry?.location?.lat() || mapCenter.lat,
                    lng: selectedPlace.geometry?.location?.lng() || mapCenter.lng,
                }}
            />
        </GoogleMap>
    ) : (
        <></>
    )
}

export default React.memo(MyComponent)
