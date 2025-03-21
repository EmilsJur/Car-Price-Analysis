// src/components/PriceChart.js
import React from 'react';

function PriceChart() {
  return (
    <div className="chart-placeholder">
      <p>Šeit būs cenu tendences grafiks (demo versija)</p>
      <div className="mock-chart">
        <div className="bar" style={{ height: '60%' }}></div>
        <div className="bar" style={{ height: '75%' }}></div>
        <div className="bar" style={{ height: '45%' }}></div>
        <div className="bar" style={{ height: '90%' }}></div>
        <div className="bar" style={{ height: '65%' }}></div>
        <div className="bar" style={{ height: '80%' }}></div>
        <div className="bar" style={{ height: '70%' }}></div>
      </div>
    </div>
  );
}

export default PriceChart;