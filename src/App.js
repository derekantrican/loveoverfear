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

  return (
    <div className="page">
      <div className="brand">
        <span className="brand-name">LoveOverFear</span>
        <span className="brand-sub">coalition</span>
      </div>
      <main className="hero">
        <h1 className="headline">
          Love your
          <span className="word-container">
            <span className={`cycling-word ${animState}`}>
              {words[currentIndex]}
            </span>
          </span>
          neighbor.
        </h1>
      </main>

      <footer className="newsletter">
        <p className="newsletter-prompt">Stay connected.</p>
        <form
          className="newsletter-form"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: wire up to your newsletter provider (Beehiiv, Mailerlite, etc.)
            const email = e.target.elements.email.value;
            console.log('Signup:', email);
            alert('Thanks for signing up! (Provider not yet connected)');
            e.target.reset();
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            className="newsletter-input"
            aria-label="Email address"
          />
          <button type="submit" className="newsletter-button">
            Sign Up
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;
