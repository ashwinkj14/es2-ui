/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Search.css';
import {BASE_URL} from '../../../server-constants';

function Search({onSearch}) {
  const navigate = useNavigate();

  const [searchField, setSearchField] = useState('');
  const [searchType, setSearchType] = useState('title');

  const handleSearch = () => {
    const api = BASE_URL+`/patent/search`;
    const token = localStorage.getItem('token');

    const requestData = {
      search: searchField,
      type: searchType,
    };

    axios.get(api, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      params: requestData,
    })
        .then((response) => {
          const result = response.data;
          onSearch(result.data);
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.removeItem('token');
            navigate('/');
          }
          console.log('Error fetching data:', error);
        });
  };

  return (
    <div>
      <section className="pub-search-container">
        <select
          id="search-type"
          className="pub-search-type"
          defaultValue={searchType}
          onChange={(e) => setSearchType(e.target.value)}>
          <option value={'inventor'}>Inventor</option>
          <option value={'title'} >Title</option>
          <option value={'number'}>Number</option>
        </select>
        <input
          id="search-box"
          className="pub-search-box"
          placeholder="Search Patent"
          onChange={(e) => setSearchField(e.target.value)}/>
        <button className="pub-search-btn" onClick={handleSearch}>
          <div className="pub-search-btn-content">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z" fill="#FFFFFF"></path> </g></svg>
            <section>Search</section>
          </div>
        </button>
      </section>
    </div>
  );
}

export default Search;
