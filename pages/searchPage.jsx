import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'; // Importa useSearchParams
import Card_Prod from '../src/components/Card_Prod';
import { useNavigate } from 'react-router-dom';

import { faHeart as solidHeart, faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
const SearchPage = () => {
  // Ottieni i parametri dalla query string dell'URL
  const [searchParams] = useSearchParams();

  const [filterProduct, setFilterProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();



  const handleSortChange = (event) => {
    setStagedSortOrder(event.target.value);
  };



  const [stagedSortOrder, setStagedSortOrder] = useState('default');
  const [uniqueSizes, setUniqueSizes] = useState([]);
  const [uniqueTeams, setUniqueTeams] = useState([]);
  const [stagedFilters, setStagedFilters] = useState({
    name: '',
    size: '',
    team_name: '',
  });

  const applyFiltersToUrl = () => {
    // 1. Costruisci i nuovi parametri dell'URL usando gli stati STAGED
    const newParams = {};
    if (stagedFilters.name) newParams.name = stagedFilters.name;
    if (stagedFilters.size) newParams.size = stagedFilters.size;
    if (stagedFilters.team_name) newParams.team_name = stagedFilters.team_name;
    if (stagedSortOrder && stagedSortOrder !== 'default') newParams.sort = stagedSortOrder;

    // 2. Naviga al nuovo URL. Questo innesca l'useEffect (dovuto a searchParams)
    //    che aggiornerà gli stati ATTIVI e ricalcolerà la lista.
    navigate({
      pathname: "/search",
      search: new URLSearchParams(newParams).toString(),
    });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setStagedFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };


  // La funzione per costruire e lanciare la chiamata API
  const fetchSearchResults = async () => {
    setLoading(true);
    setError(null);

    // 1. Costruisci i parametri della query dinamicamente
    const params = new URLSearchParams();
    // Per json-server, per la ricerca full-text sul campo 'name' 
    // e 'team_name', si usa spesso il parametro 'q'.
    // Alternativamente, se vuoi un match esatto sui campi:

    const name = searchParams.get('name'); // es. /search?name=maglia
    const team_name = searchParams.get('team_name'); // es. /search?team_name=Juventus
    const size = searchParams.get('size'); // es. /search?size=L

    if (name) params.append('name', name); // Cerca prodotti il cui nome contiene il testo
    if (team_name) params.append('team_name', team_name);
    if (size) params.append('size', size);

    // NOTA: Se vuoi cercare "maglia" in tutti i campi (name E team_name) usa 'q':
    // if (name) params.append('q', name); 
    // Consiglio di usare 'name_like' e i filtri esatti come fatto sopra per maggiore controllo.

    const url = `http://localhost:3000/search?${params.toString()}`; // Ricerca su /products
    try {
      // 2. Esegui la chiamata Axios
      const res = await axios.get(url);
      setFilterProduct(res.data);
    } catch (err) {
      console.error("Errore nella ricerca:", err);
      setError("Si è verificato un errore durante il recupero dei dati.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Rilancia la ricerca ogni volta che i parametri dell'URL cambiano
    fetchSearchResults();
  }, [searchParams]); // Dipendenza chiave: useSearchParams si aggiorna con l'URL


  // --- Render ---

  if (loading) {
    return <div className="container mt-5"><p>Caricamento risultati...</p></div>;
  }

  if (error) {
    return <div className="container mt-5"><p className='text-danger'>{error}</p></div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {/* Controlli Filtri e Ordinamento */}
          <div className='d-flex flex-wrap align-items-end gap-3 mb-4 filterbar'>
            {/* Filtro Nome: USA stagedFilters e handleFilterChange */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mx-2">Nome</label>
              <input
                type="text"
                name="name"
                id="name"
                value={stagedFilters.name}
                onChange={handleFilterChange}
                placeholder="Cerca per nome..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>

            {/* Filtro Team: USA stagedFilters e handleFilterChange */}
            <div>
              <label htmlFor="team_name" className="block text-sm font-medium text-gray-700 mx-2">Team</label>
              <select
                name="team_name"
                id="team_name"
                value={stagedFilters.team_name}
                onChange={handleFilterChange}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer transition duration-150"
              >-
                <option value="">Tutti i Team</option>
                {uniqueTeams.map(team_name => (
                  <option key={team_name} value={team_name}>{team_name}</option>
                ))}
              </select>
            </div>

            {/* Filtro Taglia: USA stagedFilters e handleFilterChange */}
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1 mx-2">Taglia</label>
              <select
                name="size"
                id="size"
                value={stagedFilters.size}
                onChange={handleFilterChange}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer transition duration-150"
              >
                <option value="">Tutte le Taglie</option>
                {uniqueSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Controllo Ordinamento: USA stagedSortOrder e handleSortChange */}
            <div>
              <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mx-2">Ordina per</label>
              <select
                name="sortOrder"
                id="sortOrder"
                value={stagedSortOrder}
                onChange={handleSortChange}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 bg-white mx-2 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer transition duration-150"
              >
                <option value="default">Seleziona</option>
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="price-asc">Prezzo (Crescente)</option>
                <option value="price-desc">Prezzo (Decrescente)</option>
              </select>
            </div>
            {/* Pulsante Cerca (invariato ma ora usa applyFiltersToUrl) */}
            <div>
              <button className="btn btn-success" onClick={applyFiltersToUrl}>Cerca</button>
            </div>
          </div>
          <div className="row my-4">
            <div className="col-12">
              <h2>Risultati Ricerca 🔎</h2>
              <p className='text-muted'>
                Trovati **{filterProduct.length}** articoli.
              </p>
            </div>
          </div>
          <div className="row">
            {filterProduct.length > 0 ? (
              filterProduct.map(product => (
                // Sostituisci questo con il tuo componente Card_Prod o una card di Bootstrap
                <Card_Prod
                  key={product.id}
                  {...product}
                  solidHeart={solidHeart}
                />
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-warning">Nessun prodotto trovato con i filtri specificati.</div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default SearchPage