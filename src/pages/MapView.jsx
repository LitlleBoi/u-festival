import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { translations } from '../translations';

const MapView = () => {
  const { lang, theme } = useContext(AppContext);
  const t = translations[lang];
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Dummy interactive locations
  const locations = [
    { id: 1, name: 'Main Stage', top: '20%', left: '40%', type: 'stage' },
    { id: 2, name: 'Food Court', top: '60%', left: '70%', type: 'food' },
    { id: 3, name: 'Stage B', top: '70%', left: '20%', type: 'stage' },
    { id: 4, name: 'Toilets', top: '40%', left: '80%', type: 'facility' },
    { id: 5, name: 'Entrance', top: '90%', left: '50%', type: 'entrance' }
  ];

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Just storing the raw coords, in a real map we'd project them.
          // For this placeholder map, we'll just show we got them.
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn('Geolocation error:', error);
          setErrorMsg(lang === 'nl' ? 'Locatie ophalen mislukt.' : 'Failed to get location.');
        }
      );
    }
  }, [lang]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>{t.map}</h1>
        {userLocation && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '5px',
            fontSize: '0.8rem',
            color: 'var(--cerulean)',
            fontWeight: 'bold'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>my_location</span>
            {t.gpsLocation}
          </div>
        )}
      </div>

      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '400px', 
        backgroundColor: theme === 'dark' ? '#222' : '#e9ecef',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
      }}>
        {/* Placeholder Map Background - ideally we'd load an SVG or Mapbox/Leaflet */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(var(--text-color) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />

        {locations.map(loc => (
          <div 
            key={loc.id}
            className="pulse-animation"
            style={{
              position: 'absolute',
              top: loc.top,
              left: loc.left,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => alert(`Clicked on: ${loc.name}`)}
          >
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: loc.type === 'stage' ? 'var(--vermilion)' : 
                               loc.type === 'food' ? 'var(--saffron)' : 'var(--cerulean)',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                {loc.type === 'stage' ? 'stadium' : 
                 loc.type === 'food' ? 'restaurant' : 
                 loc.type === 'entrance' ? 'meeting_room' : 'wc'}
              </span>
            </div>
            <div style={{
              marginTop: '4px',
              backgroundColor: 'var(--bg-color)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              border: '1px solid var(--border-color)'
            }}>
              {loc.name}
            </div>
          </div>
        ))}
      </div>
      
      {errorMsg && (
        <p style={{ color: 'var(--vermilion)', fontSize: '0.9rem', marginTop: '10px' }}>
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default MapView;
