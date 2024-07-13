import React, { useState } from 'react';
import './Stylematch.css';
import image from './logo1.png'

function Stylematch() {
  const [cards, setCards] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [counter, setCounter] = useState(0);

  const importAll = (r) => {
    return r.keys().map(r);
  };

  const images = importAll(require.context('../stylematch/dataset_category/stripes', false, /\.(png|jpe?g|svg)$/));
  
  const imageSets = [
    images.map((img, index) => ({
      image: img,
      name: `Dress ${index + 1}`,
      description: 'Sample description.',
      price: `$${(index + 1) * 10}.99`
    })),
    // Add more sets if needed
  ];

  const handleSearch = () => {
    const currentSet = imageSets[counter % imageSets.length];
    setCards(currentSet);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setCounter((prevCounter) => prevCounter + 1);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">StyleMatch</h1>
        <img src= {image} alt="Logo" className="app-logo" />
      </header>
      <div className="upload-section">
        <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} />
        {uploadedImage && <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />}
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      <div className="cards-container">
        {cards.map((item, index) => (
          <div key={index} className="card">
            <img src={item.image} alt={item.name} />
            <div className="card-content">
              <div className="card-title">{item.name}</div>
              <div className="card-description">{item.description}</div>
              <div className="card-price">{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stylematch;
