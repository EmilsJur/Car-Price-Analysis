// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';
import ResultsSection from './components/ResultsSection';

function App() {
  // State to manage search results (empty for now as this is just the UI)
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle search submission
  const handleSearch = (searchParams) => {
    setIsLoading(true);
    
    // In the 20% milestone, we'll just simulate a search
    console.log("Search parameters:", searchParams);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock results for demonstration
      setResults({
        statistics: {
          averagePrice: 12500,
          medianPrice: 11800,
          minPrice: 5200,
          maxPrice: 28000,
          standardDeviation: 4300,
          count: 157
        },
        // Empty listings for now
        listings: []
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="app">
      <Header />
      <main className="container">
        <SearchForm onSearch={handleSearch} />
        <ResultsSection results={results} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  );
}

export default App;