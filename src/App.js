import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');

  // Function to generate random color
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to handle color change
  const handleColorChange = (color) => {
    setBackgroundColor(color);
    // Calculate text color based on background brightness
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    setTextColor(brightness > 128 ? '#000000' : '#ffffff');
  };

  // Function to generate random color
  const handleRandomColor = () => {
    const randomColor = generateRandomColor();
    handleColorChange(randomColor);
  };

  // Preset colors
  const presetColors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
    '#10ac84', '#ee5a24', '#0abde3', '#ff3838', '#ff6348'
  ];

  // Apply background color to body
  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  return (
    <div className="App" style={{ backgroundColor }}>
      <div className="container">
        <h1 style={{ color: textColor }}>Background Color Changer</h1>
        
        <div className="color-controls">
          <div className="color-picker-section">
            <label htmlFor="colorPicker" style={{ color: textColor }}>
              Choose a color:
            </label>
            <input
              id="colorPicker"
              type="color"
              value={backgroundColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="color-picker"
            />
          </div>

          <button 
            onClick={handleRandomColor}
            className="random-btn"
            style={{ 
              backgroundColor: textColor === '#000000' ? '#333' : '#fff',
              color: textColor === '#000000' ? '#fff' : '#333'
            }}
          >
            🎲 Random Color
          </button>
        </div>

        <div className="preset-colors">
          <h3 style={{ color: textColor }}>Preset Colors</h3>
          <div className="color-grid">
            {presetColors.map((color, index) => (
              <button
                key={index}
                className="preset-color-btn"
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="current-color">
          <p style={{ color: textColor }}>
            Current Color: <span className="color-code">{backgroundColor}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App; 