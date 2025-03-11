import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CharacterDetails.css';

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!response.ok) {
          throw new Error('Error al cargar los datos del personaje');
        }
        const data = await response.json();
        setCharacter(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return <div className="loading">Cargando detalles del personaje...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!character) {
    return <div className="error-message">No se encontró el personaje</div>;
  }

  return (
    <div className="character-details-container">
      <Link to="/" className="back-button">← Volver a la lista</Link>
      
      <div className="character-details">
        <div className="character-image">
          <img src={character.image} alt={character.name} />
        </div>
        
        <div className="character-info-details">
          <h1>{character.name}</h1>
          
          <div className="info-grid">
            <div className="info-item">
              <h3>Estado</h3>
              <p className={`status ${character.status.toLowerCase()}`}>{character.status}</p>
            </div>
            
            <div className="info-item">
              <h3>Especie</h3>
              <p>{character.species}</p>
            </div>
            
            <div className="info-item">
              <h3>Tipo</h3>
              <p>{character.type || 'No especificado'}</p>
            </div>
            
            <div className="info-item">
              <h3>Género</h3>
              <p>{character.gender}</p>
            </div>
            
            <div className="info-item">
              <h3>Origen</h3>
              <p>{character.origin.name}</p>
            </div>
            
            <div className="info-item">
              <h3>Ubicación actual</h3>
              <p>{character.location.name}</p>
            </div>
          </div>
          
          <div className="episodes-info">
            <h3>Aparece en {character.episode.length} episodios</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;