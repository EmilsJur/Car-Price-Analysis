// src/components/SearchForm.js
import React, { useState, useEffect } from 'react';

function SearchForm({ onSearch }) {
  // State for form fields
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  
  // State for model dropdown (enabled/disabled)
  const [modelsEnabled, setModelsEnabled] = useState(false);
  const [availableModels, setAvailableModels] = useState([]);
  
  // Sample model data for demonstration
  const modelData = {
    'audi': ['A3', 'A4', 'A6', 'Q5', 'Q7'],
    'bmw': ['3 series', '5 series', 'X3', 'X5', 'i4'],
    'mercedes': ['C-Class', 'E-Class', 'GLC', 'GLE'],
    'volkswagen': ['Golf', 'Passat', 'Tiguan', 'Polo'],
    'toyota': ['Corolla', 'RAV4', 'Camry', 'Yaris'],
    'honda': ['Civic', 'CR-V', 'Accord', 'Jazz'],
    'ford': ['Focus', 'Mondeo', 'Kuga', 'Fiesta'],
    'opel': ['Astra', 'Corsa', 'Insignia', 'Grandland X']
  };
  
  // Update available models when brand changes
  useEffect(() => {
    if (brand) {
      setModelsEnabled(true);
      setAvailableModels(modelData[brand] || []);
    } else {
      setModelsEnabled(false);
      setAvailableModels([]);
      setModel('');
    }
  }, [brand]);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Collect all search parameters
    const searchParams = {
      brand,
      model,
      yearFrom,
      yearTo,
      fuelType,
      transmission,
      priceFrom: priceFrom ? parseInt(priceFrom) : null,
      priceTo: priceTo ? parseInt(priceTo) : null
    };
    
    // Call the onSearch callback with parameters
    onSearch(searchParams);
  };
  
  // Reset form fields
  const handleReset = () => {
    setBrand('');
    setModel('');
    setYearFrom('');
    setYearTo('');
    setFuelType('');
    setTransmission('');
    setPriceFrom('');
    setPriceTo('');
  };
  
  return (
    <section className="search-section">
      <h2>Meklēšanas parametri</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label htmlFor="brand">Automašīnas marka:</label>
          <select 
            id="brand" 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="">-- Izvēlieties marku --</option>
            <option value="audi">Audi</option>
            <option value="bmw">BMW</option>
            <option value="mercedes">Mercedes-Benz</option>
            <option value="volkswagen">Volkswagen</option>
            <option value="toyota">Toyota</option>
            <option value="honda">Honda</option>
            <option value="ford">Ford</option>
            <option value="opel">Opel</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="model">Modelis:</label>
          <select 
            id="model" 
            disabled={!modelsEnabled} 
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="">
              {modelsEnabled ? '-- Izvēlieties modeli --' : '-- Vispirms izvēlieties marku --'}
            </option>
            {availableModels.map((modelName) => (
              <option key={modelName} value={modelName.toLowerCase().replace(' ', '-')}>
                {modelName}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="year-from">Gads no:</label>
          <select 
            id="year-from" 
            value={yearFrom}
            onChange={(e) => setYearFrom(e.target.value)}
          >
            <option value="">-- Izvēlieties gadu --</option>
            <option value="2020">2020</option>
            <option value="2015">2015</option>
            <option value="2010">2010</option>
            <option value="2005">2005</option>
            <option value="2000">2000</option>
            <option value="1995">1995</option>
            <option value="1990">1990</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="year-to">Gads līdz:</label>
          <select 
            id="year-to" 
            value={yearTo}
            onChange={(e) => setYearTo(e.target.value)}
          >
            <option value="">-- Izvēlieties gadu --</option>
            <option value="2023">2023</option>
            <option value="2020">2020</option>
            <option value="2015">2015</option>
            <option value="2010">2010</option>
            <option value="2005">2005</option>
            <option value="2000">2000</option>
            <option value="1995">1995</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="fuel-type">Degvielas tips:</label>
          <select 
            id="fuel-type" 
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          >
            <option value="">-- Izvēlieties degvielas tipu --</option>
            <option value="diesel">Dīzelis</option>
            <option value="petrol">Benzīns</option>
            <option value="hybrid">Hibrīds</option>
            <option value="electric">Elektriskais</option>
            <option value="gas">Gāze</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="transmission">Ātrumkārba:</label>
          <select 
            id="transmission" 
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
          >
            <option value="">-- Izvēlieties ātrumkārbas tipu --</option>
            <option value="manual">Manuālā</option>
            <option value="automatic">Automātiskā</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="price-from">Cena no (€):</label>
          <input 
            type="number" 
            id="price-from" 
            min="0" 
            placeholder="Min. cena" 
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price-to">Cena līdz (€):</label>
          <input 
            type="number" 
            id="price-to" 
            min="0" 
            placeholder="Max. cena" 
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="button primary">Meklēt</button>
          <button type="button" className="button secondary" onClick={handleReset}>Notīrīt</button>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;