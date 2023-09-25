import NavBar from "../components/navbar";
import SubNavbar from "../components/subNavbar";

function Header(){
    return(
        <section className="header-container">
            <NavBar/>
            <SubNavbar/>
        </section>
    );
}

export default Header;