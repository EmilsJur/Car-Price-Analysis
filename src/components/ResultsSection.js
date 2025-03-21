// src/components/ResultsSection.js
import React from 'react';
import PriceChart from './PriceChart';

function ResultsSection({ results, isLoading }) {
  if (isLoading) {
    return (
      <section className="results-section">
        <div className="loading">
          <p>Notiek datu ielāde...</p>
        </div>
      </section>
    );
  }
  
  if (!results) {
    return (
      <section className="results-section">
        <h2>Analīzes rezultāti</h2>
        <p className="no-results">Izmantojiet meklēšanas formu, lai iegūtu analīzes rezultātus.</p>
      </section>
    );
  }
  
  return (
    <section className="results-section">
      <h2>Analīzes rezultāti</h2>
      
      <div className="chart-container">
        <PriceChart />
      </div>
      
      <h3>Cenu statistika</h3>
      <table className="statistics-table">
        <thead>
          <tr>
            <th>Rādītājs</th>
            <th>Vērtība</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vidējā cena</td>
            <td>{results.statistics.averagePrice ? `€${results.statistics.averagePrice}` : '-'}</td>
          </tr>
          <tr>
            <td>Mediānas cena</td>
            <td>{results.statistics.medianPrice ? `€${results.statistics.medianPrice}` : '-'}</td>
          </tr>
          <tr>
            <td>Minimālā cena</td>
            <td>{results.statistics.minPrice ? `€${results.statistics.minPrice}` : '-'}</td>
          </tr>
          <tr>
            <td>Maksimālā cena</td>
            <td>{results.statistics.maxPrice ? `€${results.statistics.maxPrice}` : '-'}</td>
          </tr>
          <tr>
            <td>Standarta novirze</td>
            <td>{results.statistics.standardDeviation ? `€${results.statistics.standardDeviation}` : '-'}</td>
          </tr>
          <tr>
            <td>Sludinājumu skaits</td>
            <td>{results.statistics.count || '-'}</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Līdzīgie sludinājumi</h3>
      <table className="listings-table">
        <thead>
          <tr>
            <th>Marka, modelis</th>
            <th>Gads</th>
            <th>Motors</th>
            <th>Ātrumkārba</th>
            <th>Nobraukums</th>
            <th>Cena (€)</th>
          </tr>
        </thead>
        <tbody>
          {results.listings && results.listings.length > 0 ? (
            results.listings.map((listing) => (
              <tr key={listing.id}>
                <td>{listing.brand} {listing.model}</td>
                <td>{listing.year}</td>
                <td>{listing.engineSize} {listing.fuelType}</td>
                <td>{listing.transmission}</td>
                <td>{listing.mileage} km</td>
                <td>€{listing.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">Nav atrasti līdzīgi sludinājumi</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default ResultsSection;