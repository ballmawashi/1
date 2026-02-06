import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchSection from './components/SearchSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GenreDetail from './pages/GenreDetail';
import PerformerDetail from './pages/PerformerDetail';
import ScrollToAnchor from './components/ScrollToAnchor';
import './App.css';

const Home = () => (
  <>
    <Hero />
    <div id="genres"></div>
    <SearchSection />
    <Contact />
  </>
);

function App() {
  return (
    <Router>
      <ScrollToAnchor />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genre/:genreId" element={<GenreDetail />} />
          <Route path="/performer/:id" element={<PerformerDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
