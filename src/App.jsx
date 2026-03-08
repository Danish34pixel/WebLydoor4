import React from 'react'
import Background from './Component/Background'
import Nav from './Component/Nav'
import UpperText from './Component/UpperText'
import Service from './Component/Service';

const App = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Nav />
      {/* 
        Hero fold. Takes up minimum the rest of the screen below navbar.
       */}
      <main className="flex flex-col justify-center px-4 sm:px-8 xl:px-12 py-6 sm:py-8 w-full min-h-[calc(100vh-80px)] relative z-10">
        <UpperText />
      </main>
      
      {/* Services Section */}
      <Service />

      <Background />
    </div>
  );
};

export default App