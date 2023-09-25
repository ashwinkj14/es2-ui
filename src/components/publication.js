import { useState, React } from 'react';
import Search from './search';
import DataGrid from './dataGrid';
import Footer from './footer';
import Header from '../containers/Header';
import "../styles/publication.css";

function Publication(){

    const [searchResult, setSearchResult] = useState('');

    const handleSearch = (data) => {
        setSearchResult(data);
    }

    return(
        <div>
            <Header/>
            <section className="publication-container">
                <section className="publication-title-container">
                    <div className="publication-title">Research Paper Repository</div>
                </section>
                <section className="publication-search-container">
                    <Search onSearch={handleSearch}/>
                </section>
                <section className="publication-data">
                    <DataGrid data={searchResult}/>
                </section>
            </section>
            <Footer/>
        </div>
    );
}

export default Publication;