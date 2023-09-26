/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import '../styles/search.css';
import axios from 'axios';

function Search({onSearch}) {
  const [searchField, setSearchField] = useState('');
  const [searchType, setSearchType] = useState('Title');
  const [searchFromDate, setSearchFromDate] = useState('');
  const [searchToDate, setSearchToDate] = useState('');

  const handleSearch = () => {
    const api = `http://localhost:8080/publication/search?searchBox=` + searchField + `&searchType=` + searchType +
        `&searchByDateFrom=` + searchFromDate + `&searchByDateTo=` + searchToDate;

    axios.get(api)
        .then((response) => {
          const result = response.data;
          onSearch(result.data);
        })
        .catch((error) => {
          console.log('Error fetching data:', error);
        });
  };

  return (
    <div>
      <section className="pub-search-container">
        <select
          id="search-type"
          className="pub-search-type"
          onChange={(e) => setSearchType(e.target.value)}>
          <option value={'author'}>Author</option>
          <option value={'title'} selected>Title</option>
          <option value={'keyword'}>Keyword</option>
        </select>
        <input
          id="search-box"
          className="pub-search-box"
          placeholder="Search Publication"
          onChange={(e) => setSearchField(e.target.value)}/>
        <button className="pub-search-btn" onClick={handleSearch}>Search</button>
      </section>
      <section className="pub-date-container">
        <section className="pub-from-date">
          <label className="pub-date-label">From:</label>
          <input
            id="search-from-date"
            className="pub-search-box-date"
            type="date"
            onChange={(e) => setSearchFromDate(e.target.value)}/>
        </section>
        <section className="pub-to-date">
          <label className="pub-date-label">To:</label>
          <input
            id="search-to-date"
            className="pub-search-box-date"
            type="date"
            onChange={(e) => setSearchToDate(e.target.value)}/>
        </section>
      </section>
    </div>
  );
}

export default Search;
