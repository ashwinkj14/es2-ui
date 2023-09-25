import es2_logo from '../es2-logo-final.jpg';
import '../styles/navbar.css'

function NavBar(){
    return(
        <div className="navbar-container">
            <section className="navbar-logo-container">
                <img className="navbar-logo" src={es2_logo} alt='ES2'></img>
            </section>
            <section className="navbar-items">
                <section className='navbar-item'>
                    Publication
                </section>
                <section className='navbar-item'>
                    Settings
                </section>
                <section className="navbar-item">
                    Account
                </section>
            </section>
        </div>
    );
}

export default NavBar;