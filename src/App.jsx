import React from 'react'
import Background from './Component/Background'
import Nav from './Component/Nav'
import UpperText from './Component/UpperText'
import Service from './Component/Service';
import About from './Component/About';
import Blog from './Component/Blog';
import Contact from './Component/Contact';

import Loader from './Component/Loader'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Website from './Component/Website'
import SEO from './Component/SEO'
import DigitalMarketing from './Component/DigitalMarketing'
import GraphicLogo from './Component/GraphicLogo'
import Maintenance from './Component/Maintenance'
import AppDevelopment from './Component/AppDevelopment'
import Vision from './Component/Vision'
import Mission from './Component/Mission'
import Approach from './Component/Approach'
import Commitment from './Component/Commitment'
import BlogLearn from './Component/BlogLearn'
import BlogUpdates from './Component/BlogUpdates'
import BlogGrowth from './Component/BlogGrowth'

const Home = () => {
  return (
    <div id="home" className="w-full min-h-screen flex flex-col relative">
      <div className="opacity-100">
        {/* 
          Hero fold. Takes up minimum the rest of the screen below navbar.
         */}
        <main className="flex flex-col justify-center px-4 sm:px-8 xl:px-12 py-6 sm:py-8 w-full min-h-[calc(100vh-100px)] relative z-10">
          <UpperText />
        </main>

        {/* Services Section */}
        <Service />

        {/* About Section */}
        <About />

        {/* Blog Section */}
        <Blog />
        <Contact />
      </div>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <Router>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <Nav />
      <Background />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/website-development" element={<Website />} />
        <Route path="/seo" element={<SEO />} />
        <Route path="/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/graphic-logo" element={<GraphicLogo />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/app-development" element={<AppDevelopment />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/approach" element={<Approach />} />
        <Route path="/commitment" element={<Commitment />} />
        <Route path="/blog/learn" element={<BlogLearn />} />
        <Route path="/blog/updates" element={<BlogUpdates />} />
        <Route path="/blog/growth" element={<BlogGrowth />} />
      </Routes>
    </Router>
  );
};

export default App