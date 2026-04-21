import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('nl'); // nl or en

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedLang = localStorage.getItem('lang') || 'nl';
    setLang(savedLang);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleLang = () => {
    const newLang = lang === 'nl' ? 'en' : 'nl';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang }}>
      {children}
    </AppContext.Provider>
  );
};
