import logo from "../../images/LogoBN.png";
import "./navbar.css"
export function NavBar() {
    return (
        <>
            <nav>
                <div className="input-search-space">
                    <i className="bi bi-search"></i>
                    <input type="text" placeholder="busca pela sua noticia..." />

                </div>
                <img src={logo} alt="logo do site"></img>
                <button>entrar</button>
            </nav>

        </>
    );
}