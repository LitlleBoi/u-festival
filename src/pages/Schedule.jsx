import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { translations } from '../translations';

const Schedule = () => {
  const { lang, theme } = useContext(AppContext);
  const t = translations[lang];

  // Dummy schedule data
  const scheduleData = [
    { time: '12:00', act: 'DJ Openingsset', stage: 'Main Stage' },
    { time: '13:30', act: 'Local Talent', stage: 'Stage B' },
    { time: '15:00', act: 'The Indie Rockers', stage: 'Main Stage' },
    { time: '16:30', act: 'Techno Hour', stage: 'Dance Tent' },
    { time: '18:00', act: 'Sunset Vibes', stage: 'Main Stage' },
    { time: '20:00', act: 'Headline Act', stage: 'Main Stage' },
    { time: '22:00', act: 'Closing Ceremony', stage: 'Main Stage' }
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>{t.schedule}</h1>
      
      <div style={{ position: 'relative', paddingLeft: '20px' }}>
        {/* Vertical timeline line */}
        <div style={{ 
          position: 'absolute', 
          left: '0', 
          top: '0', 
          bottom: '0', 
          width: '2px', 
          backgroundColor: 'var(--accent)' 
        }} />

        {scheduleData.map((item, idx) => (
          <div key={idx} className="fade-in" style={{ 
            position: 'relative', 
            marginBottom: '20px', 
            animationDelay: `${idx * 0.1}s`,
            backgroundColor: 'var(--card-bg)',
            padding: '15px',
            borderRadius: '8px',
            marginLeft: '15px',
            borderLeft: '4px solid var(--cerulean)'
          }}>
            {/* Timeline dot */}
            <div style={{ 
              position: 'absolute', 
              left: '-23px', // -15px marginLeft - 8px half dimension = -23, wait
              // actual math: parent paddingLeft 20px, left 0 line. item margin-left 15px.
              // To center the dot, it needs to be relative to the timeline div. Let's just use absolute positioning to the whole container.
            }} />
            <div style={{
              position: 'absolute',
              left: '-21px', // 15px margin + 6px to center on the 2px line
              top: '50%',
              transform: 'translateY(-50%)',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              border: `2px solid var(--bg-color)`
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0 }}>{item.act}</h3>
                <p style={{ margin: '5px 0 0 0', color: 'var(--text-mute)', fontSize: '0.9rem' }}>{item.stage}</p>
              </div>
              <div style={{
                backgroundColor: 'var(--info)',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
