import React, { useEffect, useState, useRef } from 'react';

import './App.css'
const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentPageRef = useRef(1); 
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        setCharacters(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(characters.length / itemsPerPage);

  const handlePageChange = (page) => {
    currentPageRef.current = page;
    setCharacters([...characters]); 
  };

  const getPaginatedCharacters = () => {
    const start = (currentPageRef.current - 1) * itemsPerPage;
    return characters.slice(start, start + itemsPerPage);
  };

  if (loading) return <p>Loading characters...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Rick and Morty Characters</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
        {getPaginatedCharacters().map((char) => (
          <div
            key={char.id}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
            }}
          >
            <img src={char.image} alt={char.name} width="100" />
            <p>{char.name}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          const isActive = currentPageRef.current === pageNum;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              style={{
                margin: '0 5px',
                padding: '8px 12px',
                backgroundColor: isActive ? '#007BFF' : '#eee',
                color: isActive ? '#fff' : '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
    </div>
  );
};