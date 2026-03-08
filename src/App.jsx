import React from 'react'
import Background from './Component/Background'
import Nav from './Component/Nav'
import UpperText from './Component/UpperText'

const App = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Nav />
      {/* 
        Fully responsive container. Removed the harsh right padding so the text
        animates across the full screen properly.
       */}
      <main className="flex-1 flex px-4 sm:px-8 xl:px-12 py-6 sm:py-8 w-full h-full relative z-10 w-full">
        <UpperText />
      </main>
      <Background />
    </div>
  );
};

export default App