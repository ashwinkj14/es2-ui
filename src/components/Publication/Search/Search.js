/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import './Search.css';
import {useEffect} from 'react';
import {usePublicationStore} from '../../../store/es2Store';

function Search() {
  const {
    setSearchField, setSearchFromDate,
    setSearchToDate, searchType,
    setSearchType, handleSearch, resetPublicationStore,
  } = usePublicationStore((state) => ({
    setSearchField: state.setSearchField,
    setSearchFromDate: state.setSearchFromDate,
    setSearchToDate: state.setSearchToDate,
    searchType: state.searchType,
    setSearchType: state.setSearchType,
    handleSearch: state.handleSearch,
    resetPublicationStore: state.resetPublicationStore,
  }));

  useEffect(() => {
    return () => {
      resetPublicationStore();
    };
  }, [resetPublicationStore]);


  return (
    <div>
      <section className="pub-search-container">
        <select
          id="search-type"
          className="pub-search-type"
          defaultValue={searchType}
          onChange={(e) => setSearchType(e.target.value)}>
          <option value={'author'}>Author</option>
          <option value={'title'} >Title</option>
          <option value={'keyword'}>Keyword</option>
        </select>
        <input
          id="search-box"
          className="pub-search-box"
          placeholder="Search Publication"
          onChange={(e) => setSearchField(e.target.value)}/>
        <button className="pub-search-btn" onClick={handleSearch}>
          <div className="pub-search-btn-content">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z" fill="#FFFFFF"></path> </g></svg>
            <section>Search</section>
          </div>
        </button>
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
