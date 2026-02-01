import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import BookExperience from './components/BookExperience';
import ChoicePage from './components/ChoicePage';
import MessageBox from './components/MessageBox';
import AudioController from './components/AudioController';
import CursorTrail from './components/CursorTrail';
import { mockApi } from './utils/mockApi';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // landing, book, choice, message, confirmation
  const [userChoice, setUserChoice] = useState(null);

  const handleStartJourney = () => {
    setCurrentView('book');
  };

  const handleBookComplete = () => {
    setCurrentView('choice');
  };

  const handleChoiceMade = (choice) => {
    setUserChoice(choice);
    mockApi.sendNotification('CHOICE', { choice });
    setTimeout(() => setCurrentView('message'), 800);
  };

  const handleMessageSent = () => {
    setCurrentView('confirmation');
    mockApi.sendNotification('MESSAGE_SENT', { status: 'complete' });
  };

  return (
    <div className="min-h-screen bg-ivory overflow-hidden relative selection:bg-gold selection:text-ivory">
      <AudioController />
      <CursorTrail />
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-10 bg-burgundy mix-blend-multiply"></div>

      {/* View Rendering */}
      <main className="relative w-full h-full z-20">
        {currentView === 'landing' && (
          <LandingPage onStart={handleStartJourney} />
        )}

        {currentView === 'book' && (
          <BookExperience onComplete={handleBookComplete} />
        )}

        {currentView === 'choice' && (
          <ChoicePage onChoice={handleChoiceMade} />
        )}

        {currentView === 'message' && (
          <MessageBox onSend={handleMessageSent} />
        )}

        {currentView === 'confirmation' && (
          <div className="h-screen flex flex-col items-center justify-center animate-fade-in text-center px-6">
            <div className="text-4xl md:text-6xl mb-6">🎩</div>
            <h1 className="text-3xl md:text-4xl text-burgundy mb-4">Message delivered.</h1>
            <p className="text-xl text-brown-muted italic font-cormorant">Until we meet again...</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
