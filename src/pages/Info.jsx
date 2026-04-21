import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { translations } from '../translations';

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <button 
        style={{ 
          width: '100%', 
          textAlign: 'left', 
          background: 'none', 
          color: 'var(--text-color)', 
          padding: '15px', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          fontStyle: 'normal',
          fontWeight: '700'
        }}
        onClick={onClick}
      >
        {title}
        <span className="material-symbols-outlined" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
          expand_more
        </span>
      </button>
      <div 
        style={{ 
          maxHeight: isOpen ? '1000px' : '0', 
          transition: 'max-height 0.3s ease-in-out', 
          padding: isOpen ? '0 15px 15px 15px' : '0 15px',
          opacity: isOpen ? 1 : 0
        }}
      >
        <p style={{ margin: 0, lineHeight: 1.5 }}>{content}</p>
      </div>
    </div>
  );
};

const Info = () => {
  const { lang } = useContext(AppContext);
  const t = translations[lang];
  
  const [openIdx, setOpenIdx] = useState(0);

  const infoData = [
    {
      title: t.generalInfo,
      content: lang === 'nl' ? 'Welkom bij U-Festival! Het festival vindt plaats op 15 juli. De deuren openen om 12:00 uur en het feest eindigt om 23:00 uur. Kom op tijd!' : 'Welcome to U-Festival! The festival takes place on July 15. Doors open at 12:00 PM and the party ends at 11:00 PM. Be there on time!'
    },
    {
      title: t.facilities,
      content: lang === 'nl' ? 'Er zijn voldoende toiletten, EHBO posten, foodtrucks en bars aanwezig op het terrein. Kluisjes zijn beschikbaar bij de ingang.' : 'There are plenty of toilets, first aid stations, food trucks and bars on the festival premises. Lockers are available at the entrance.'
    },
    {
      title: t.rules,
      content: lang === 'nl' ? 'Eigen eten en drinken meenemen is niet toegestaan. Volg altijd de aanwijzingen van ons personeel op. Geniet veilig.' : 'Bringing your own food and drinks is not permitted. Always follow the instructions of our staff. Enjoy safely.'
    },
    {
      title: t.aboutApp,
      content: lang === 'nl' ? 'Deze PWA is gemaakt om je festivalervaring te optimaliseren. Je kunt hem installeren op je homescreen via de opties van je browser.' : 'This PWA was created to optimize your festival experience. You can install it on your homescreen via your browser options.'
    }
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>{t.info}</h1>
      
      <div className="accordion-container">
        {infoData.map((item, idx) => (
          <AccordionItem 
            key={idx}
            title={item.title}
            content={item.content}
            isOpen={openIdx === idx}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Info;
