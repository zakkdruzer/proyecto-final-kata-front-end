import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CharacterList.css';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  useEffect(() => {
    if (characters.length > 0) {
      applyFilters();
    }
  }, [searchTerm, statusFilter, speciesFilter, genderFilter, characters]);

  const fetchCharacters = async (pageNum) => {
    setLoading(true);
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageNum}`);
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...characters];

    if (searchTerm) {
      filtered = filtered.filter(character => 
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(character => character.status === statusFilter);
    }

    if (speciesFilter) {
      filtered = filtered.filter(character => character.species === speciesFilter);
    }

    if (genderFilter) {
      filtered = filtered.filter(character => character.gender === genderFilter);
    }

    setFilteredCharacters(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSpeciesChange = (e) => {
    setSpeciesFilter(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGenderFilter(e.target.value);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  if (loading && characters.length === 0) {
    return <div className="loading">Cargando personajes...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="character-list-container">
      <h1>Personajes de Rick and Morty</h1>

      <div className="filters-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filter-options">
          <select value={statusFilter} onChange={handleStatusChange}>
            <option value="">Filtrar por Estado</option>
            <option value="Alive">Vivo</option>
            <option value="Dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>

          <select value={speciesFilter} onChange={handleSpeciesChange}>
            <option value="">Filtrar por Especie</option>
            <option value="Human">Humano</option>
            <option value="Alien">Alien</option>
            <option value="Humanoid">Humanoide</option>
            <option value="Robot">Robot</option>
            <option value="Animal">Animal</option>
            <option value="Mythological Creature">Criatura Mitológica</option>
          </select>

          <select value={genderFilter} onChange={handleGenderChange}>
            <option value="">Filtrar por Género</option>
            <option value="Male">Masculino</option>
            <option value="Female">Femenino</option>
            <option value="Genderless">Sin género</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>
      </div>

      {filteredCharacters.length === 0 && !loading ? (
        <div className="no-results">No se encontraron personajes con los filtros aplicados</div>
      ) : (
        <div className="character-grid">
          {filteredCharacters.map((character) => (
            <Link to={`/character/${character.id}`} key={character.id} className="character-card">
              <img src={character.image} alt={character.name} />
              <div className="character-info">
                <h3>{character.name}</h3>
                <p><span className="label">Estado:</span> {character.status}</p>
                <p><span className="label">Especie:</span> {character.species}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>Anterior</button>
        <span>Página {page} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>Siguiente</button>
      </div>
    </div>
  );
}

export default CharacterList;