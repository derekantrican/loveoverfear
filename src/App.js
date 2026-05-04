import React, { useState, useEffect } from 'react';
import './App.css';

const words = [
  'Muslim',
  'gay',
  'Black',
  'immigrant',
  'disabled',
  'trans',
  'Jewish',
  'unhoused',
  'Asian',
  'Indigenous',
  'Latino',
  'refugee',
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animState, setAnimState] = useState('visible'); // 'visible' | 'exiting' | 'entering'

  useEffect(() => {
    const interval = setInterval(() => {
      // Start exit animation
      setAnimState('exiting');

      // After exit completes, swap word and enter
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setAnimState('entering');

        // After enter completes, settle
        setTimeout(() => {
          setAnimState('visible');
        }, 400);
      }, 400);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js';
    script.async = true;
    script.dataset.beehiivForm = 'e3804571-d532-4249-b65f-fa4ecdf5b6b9';
    const container = document.getElementById('beehiiv-form');
    if (container) container.appendChild(script);
    return () => { if (container) container.innerHTML = ''; };
  }, []);

  return (
    <div className="page">
      <div className="brand">
        <span className="brand-name">LoveOverFear</span>
        <span className="brand-sub">coalition</span>
      </div>
      <main className="hero">
        <h1 className="headline">
          &ldquo;Love your
          <span className="word-container">
            <span className={`cycling-word ${animState}`}>
              {words[currentIndex]}
            </span>
          </span>
          neighbor.&rdquo;
        </h1>
        <p className="attribution">&mdash;Jesus (Luke 10:25-37)</p>
      </main>

      <footer className="newsletter">
        <div id="beehiiv-form" className="beehiiv-embed"></div>
      </footer>
    </div>
  );
}

export default App;
