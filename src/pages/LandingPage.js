import React, { useEffect, useState } from 'react'
import Banner from '../layout-components/Banner'
import Features from '../layout-components/Features'
import Footer from '../layout-components/Footer'
import Worldwide from '../layout-components/Worldwide'
import Testimonials from '../layout-components/Testimonials'
import "../styles/pages.style.css"


const LandingPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <>
      <div className={`overflow-x-hidden ${theme}`}>
        <Banner toggleTheme={toggleTheme} theme={theme}/>
        <Features  toggleTheme={toggleTheme} theme={theme}/>
        {/* <Testimonials /> */}
        <Worldwide toggleTheme={toggleTheme} theme={theme}  />
        <Footer />
      </div>
    </>
  )
}

export default LandingPage