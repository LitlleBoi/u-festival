import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { AppProvider, AppContext } from './context/AppContext';
import { translations } from './translations';

// Pages
import Home from './pages/Home';
import Info from './pages/Info';
import Schedule from './pages/Schedule';
import MapView from './pages/MapView';

const Header = () => {
  const { theme, toggleTheme, lang, toggleLang } = useContext(AppContext);

  return (
    <div className="top-header">
      <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontFamily: 'Sansation', fontStyle: 'italic', color: 'var(--text-color)' }}>
          U-FESTIVAL
        </h2>
      </div>
      <div className="header-actions">
        <button className="icon-btn" onClick={toggleLang} style={{ background: 'none' }} title="Change Language">
          {lang === 'nl' ? '🇳🇱' : '🇬🇧'}
        </button>
        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
          <span className="material-symbols-outlined">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>
      </div>
    </div>
  );
};

const Navigation = () => {
  const { lang } = useContext(AppContext);
  const t = translations[lang];

  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="material-symbols-outlined">home</span>
        <span>{t.home}</span>
      </NavLink>
      <NavLink to="/info" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="material-symbols-outlined">info</span>
        <span>{t.info}</span>
      </NavLink>
      <NavLink to="/schedule" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="material-symbols-outlined">calendar_month</span>
        <span>{t.schedule}</span>
      </NavLink>
      <NavLink to="/map" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="material-symbols-outlined">map</span>
        <span>{t.map}</span>
      </NavLink>
    </nav>
  );
};

const LayoutChildren = ({ children }) => {
  const location = useLocation();
  // Using a simple key for unmounting/mounting to re-trigger animations
  return (
    <main key={location.pathname} className="fade-in">
      {children}
    </main>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Header />
        <LayoutChildren>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/map" element={<MapView />} />
          </Routes>
        </LayoutChildren>
        <Navigation />
      </Router>
    </AppProvider>
  );
}

export default App;
