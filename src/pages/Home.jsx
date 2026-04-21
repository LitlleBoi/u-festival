import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { translations } from '../translations';

const Home = () => {
  const { lang } = useContext(AppContext);
  const t = translations[lang];

  // Dummy news data
  const newsItems = [];

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>{t.news}</h1>
      
      {newsItems.length === 0 ? (
        <div className="card">
          <p style={{ margin: 0, color: 'var(--text-mute)', fontStyle: 'italic' }}>
            {t.noNews}
          </p>
        </div>
      ) : (
        newsItems.map((item, idx) => (
          <div key={idx} className="card fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <h3>{item.title}</h3>
            <p style={{ marginTop: '10px' }}>{item.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
